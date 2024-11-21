import { useQuery, useMutation } from "@apollo/client"
import { useRouter } from "next/router";
import type { Mutation,Query, QueryGetWorkspaceArgs, QueryGetBasesByWorkspaceIdArgs } from "../../src/commons/types/generated/types"
import { GET_All_WORKSPACES, GET_WORKSPACE_BASES,CREATE_WORKSPACE } from "../../src/graphql/queries"
import * as styles from "./workspaces2.style";
import { useState } from "react"
import Modal from "../../src/components/Modal/CreateModal";

export default function WorkspacePage() {
    const router = useRouter();
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 받아온 워크스페이스를 저장할 useQuery
    const { loading, error, data } = useQuery<Pick<Query, "getAllWorkspaces">, QueryGetWorkspaceArgs>(GET_All_WORKSPACES)

    // Workspace를 만들때 이름을 저장할 곳
    const [newWorkspaceName, setNewWorkspaceName] = useState("");

    // 워크스페이스 ID를 통해서 베이스를 받아올 useQuery
    const { data: baseData, loading: baseLoading } = useQuery<Pick<Query, "getBasesByWorkspaceId">, QueryGetBasesByWorkspaceIdArgs>(
        // 조건부 쿼리실행하기
        GET_WORKSPACE_BASES, {

        // selectedWorkspaceId 의 값이 존재하면 workspaceId 에 selectedWorkspaceId 값을 담아서 쿼리의 variables 로 전달
        // 값이 없으면 undefined 전달 < 이부분은 사실상 의미 없음 어차피 없으면 skip 되니
        // variables: { workspaceId: selectedWorkspaceId }, 이렇게 줄일 수 있음.
        variables: selectedWorkspaceId ? { workspaceId: selectedWorkspaceId } : undefined,
        // 만약 selectedWorkspaceId 값이 null이나 undefined 인경우는 skip 즉 쿼리를 실행하지 않음
        skip: !selectedWorkspaceId,
    });

    // 워크스페이스를 생성할 뮤테이션
    const [createWorkspace, { loading: createLoading, error: createError }] = useMutation<Pick<Mutation, "createWorkspace">>(
        CREATE_WORKSPACE,
        {
            refetchQueries: [{ query: GET_All_WORKSPACES }], // 워크스페이스 생성 후 목록 갱신
        }
    );



    // 카드를 누르면 동작할 기능 
    const handleOpenModal = (workspaceId: string) => {
        // 받아온 workspaceId 값을 따로 저장시킴
        setSelectedWorkspaceId(workspaceId);
        setIsModalOpen(true);
    }

    // 모달 닫기버튼 누를때 동작할 내용
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedWorkspaceId(null);
    };


    const handleCreateWorkspace = async () => {
        // trim() = 문자열 양 끝의 공백제거
        // 값이 비어있으면 그냥 종료
        if (!newWorkspaceName.trim()) return;

        
        try {
            // 뮤테이션 실행
            await createWorkspace({
                variables: {
                    workspaceName: newWorkspaceName,
                },
            });
            // newWorkspaceName 값을 초기화
            // 안하면 다음에 create new workspace 버튼 눌렀을때 기존값이 다시보일듯
            setNewWorkspaceName("");
            // 모달창 닫기
            handleCloseModal();
        } catch (e) {
            console.error("Error creating workspace:", e);
        }
    };
    // 만약 workspace 목록을 불러올때 로딩이나 에러라면 해당 내용 출력
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;


    return (

        <styles.Container>
            <styles.Title>Your Workspaces</styles.Title>
            {/* 워크스페이스 목록 */}
            <styles.WorkspaceGrid>
                {/* data.getAllWorkspaces 의 값들을 하나씩 돌려서 workspace에 저장하며 
                 각각 =>(내부) 내부의 코드를 돌림*/}
                {data?.getAllWorkspaces.map((workspace) => (
                    /* key 를 사용하지 않으면 어떤 항목이 추가, 제거, 수정되었는지 추적이 되지 않아 에러를 발생함*/
                    /* onClick 으로 해당 카드를 클릭하면 handleOpenModal함수에 해당 카드의 id값을 보내며 실행시킴 */
                    <styles.WorkspaceCard key={workspace.id} onClick={() => handleOpenModal(workspace.id)}>
                        {/* 워크스페이스의 이름을 출력 */}
                        <styles.WorkspaceTitle>{workspace.workspaceName}</styles.WorkspaceTitle>
                        <styles.WorkspaceUpdatedAt>
                            {/* {workspace.createdAt} 으로 출력하면  Created: 2024-11-18T16:43:53.031712  이런식으로 양식이 이상함
                           new Date(입력값).toLocaleDateString() 은 입력값을 날짜 형식으로 변환하는 자바스크립트 코드*/}
                            Created: {workspace.createdAt ? new Date(workspace.createdAt).toLocaleDateString() : "n/a"}
                        </styles.WorkspaceUpdatedAt>
                        <styles.WorkspaceUpdatedAt>
                            Updated: {workspace.updatedAt ? new Date(workspace.updatedAt).toLocaleDateString() : "n/a"}
                        </styles.WorkspaceUpdatedAt>
                    </styles.WorkspaceCard>
                ))}
            </styles.WorkspaceGrid>



            {/* 워크스페이스 생성 버튼 */}
            {/* 버튼 클릭시 IsModalOpen 을 true로 바꿈 */}
            <styles.CreateButton onClick={() => setIsModalOpen(true)}>Create New Workspace</styles.CreateButton>


            {/* 모달 */}
            {/* Modal의 isOpen 값은 isModalOpen의 값으로 만듬 (위의 생성 버튼 눌렀으면 true 아니면 false) */}
            {/* 모달 창을 닫으려 하면 (onClose) handleCloseModal 을 동작함  */}
            <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                {/* selectedWorkspaceId의 값이 있으면 */}
                {selectedWorkspaceId ? (
                    <>
                        <h2>Workspace Bases</h2>
                        {/* baseLoading 에 값이있음 = 로딩중 */}
                        {baseLoading ? (
                            <p>Loading...</p>
                        ) : (
                            // 로딩중이 아니면 
                            <styles.BaseList>
                                {/* 데이터 값들을 반복문 */}
                                {baseData?.getBasesByWorkspaceId.map((base) => (
                                    <styles.BaseItem
                                        key={base.id}
                                        // 해당 화면을 클릭하면 workspaces/base.id 로 이동시킴
                                        onClick={() => router.push(`/workspaces/${base.id}`)}
                                    >
                                        <styles.BaseTitle>{base.baseName}</styles.BaseTitle>
                                        <styles.BaseUpdatedAt>
                                            Created: {base.createdAt ? new Date(base.createdAt).toLocaleDateString() : "N/A"}
                                        </styles.BaseUpdatedAt>
                                        <styles.BaseUpdatedAt>
                                            Updated: {base.updatedAt ? new Date(base.updatedAt).toLocaleDateString() : "N/A"}
                                        </styles.BaseUpdatedAt>
                                    </styles.BaseItem>
                                ))}
                            </styles.BaseList>
                        )}
                    </>
                ) : (
                    // selectedWorkspaceId의 값이 없을 경우
                    // 사실상 위의 base를 선택하는 버튼과 같지만
                    // workspace를 선택해서 들어갔을경우 id값이 있어서 base 선택기능
                    // 그냥 하단의 버튼을 눌러서 들어가면 CreateWorkspace 기능을 하도록 한것
                    <>
                        <h2>Create Workspace</h2>
                        <styles.Input
                            type="text"
                            placeholder="Workspace Name"
                            value={newWorkspaceName}
                            onChange={(e) => setNewWorkspaceName(e.target.value)}
                        />
                        <styles.CreateButton onClick={handleCreateWorkspace}>
                            {createLoading ? "Creating..." : "Create"}
                        </styles.CreateButton>
                        {createError && <p>Error: {createError.message}</p>}
                    </>
                )}
            </Modal>

        </styles.Container>

    )

}
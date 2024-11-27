import { useQuery, useMutation } from "@apollo/client"
import { useRouter } from "next/router";
import type { Mutation, Query, QueryGetWorkspaceArgs, QueryGetBasesByWorkspaceIdArgs } from "../../src/commons/types/generated/types"
import { GET_All_WORKSPACES, GET_WORKSPACE_BASES, CREATE_WORKSPACE, UPDATE_WORKSPACE, DELETE_WORKSPACE, UPDATE_BASE, DELETE_BASE,CREATE_BASE } from "../../src/graphql/queries"
import * as styles from "./workspaces.style";
import { useState, useEffect } from "react"
import Modal from "../../src/components/Modal/CreateModal";
// 모달 타입 정의
type ModalType = "create" | "edit" | "viewBase" | "delete" | "create_base" | "edit_base" | "delete_base" | "move_base";
export default function WorkspacePage() {
    const router = useRouter();
    const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);
    // 모달 열림 상태 여부
    const [isModalOpen, setIsModalOpen] = useState(false);
    // 모달의 타입 
    const [modalType, setModalType] = useState<ModalType>("create");
    // 수정할 워크스페이스 이름
    const [editWorkspaceName, setEditWorkspaceName] = useState("");

    // 수정할 베이스 ID 저장
    const [editBaseId, setEditBaseId] = useState<string | null>(null);
    // 수정할 베이스 이름
    const [editBaseName, setEditBaseName] = useState("");
    // 받아온 워크스페이스를 저장할 useQuery
    const { loading, error, data } = useQuery<Pick<Query, "getAllWorkspaces">, QueryGetWorkspaceArgs>(GET_All_WORKSPACES)

    // Workspace를 만들때 이름을 저장할 곳
    const [newWorkspaceName, setNewWorkspaceName] = useState("");

    // 새로만들 베이스 ID 저장
    const [newBaseName, setNewBaseName] = useState("");

    // 베이스 워크스페이스 동시 사용할 워크스페이스 id값 저장할곳
    const [targetWorkspaceId, setTargetWorkspaceId] = useState<string | null>(null);
    // 워크스페이스 ID를 통해서 베이스를 받아올 useQuery
    const { data: baseData, refetch: refetchBaseData } = useQuery<Pick<Query, "getBasesByWorkspaceId">, QueryGetBasesByWorkspaceIdArgs>(
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
    const [createWorkspace] = useMutation<Pick<Mutation, "createWorkspace">>(
        CREATE_WORKSPACE,
        {
            refetchQueries: [{ query: GET_All_WORKSPACES }], // 워크스페이스 생성 후 목록 갱신
        }
    );

    // 워크스페이스를 수정할 뮤테이션
    const [updateWorkspace] = useMutation<Pick<Mutation, "updateWorkspace">>(
        UPDATE_WORKSPACE,
        {
            refetchQueries: [{ query: GET_All_WORKSPACES }],
        }
    )

    // 베이스 생성 뮤테이션

    const [createBase] = useMutation<Pick<Mutation,"createBase">>(
        CREATE_BASE,
        {
            refetchQueries: [{ query: GET_All_WORKSPACES }],
        }
    )
    // 베이스 수정 뮤테이션
    const [updateBase] = useMutation<Pick<Mutation, "updateBase">>(
        UPDATE_BASE,
        {
            refetchQueries: [{ query: GET_All_WORKSPACES }],
            awaitRefetchQueries: true, // 리패치가 완료된 후 실행
        }
    )

    // 워크스페이스를 삭제할 뮤테이션
    const [deleteWorkspace] = useMutation<Pick<Mutation, "deleteWorkspace">>(
        DELETE_WORKSPACE,
        {
            refetchQueries: [{ query: GET_All_WORKSPACES }],
        }
    )

    // 베이스 삭제 뮤테이션
    const [deleteBase] = useMutation<Pick<Mutation, "deleteBase">>(
        DELETE_BASE,
        {
            refetchQueries: [
                { query: GET_WORKSPACE_BASES, variables: { workspaceId: selectedWorkspaceId } },
            ],
            awaitRefetchQueries: true, // 리패치가 완료된 후 동작하도록 설정
        }
    )

    // 모달 열기 핸들러
    const openModal = ({
        type,
        workspaceId = null,
        baseId = null,
        baseName = "",
        workspaceName = "",
    }: {
        type: ModalType;
        workspaceId?: string | null;
        baseId?: string | null;
        baseName?: string;
        workspaceName?: string;
    }) => {
        setModalType(type);
        setSelectedWorkspaceId(workspaceId);
        setEditBaseId(baseId);
        setEditBaseName(baseName);
        setEditWorkspaceName(workspaceName);
        setIsModalOpen(true);
    }

    // 모달 닫기 핸들러
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedWorkspaceId(null);
        setNewWorkspaceName("");
        setEditWorkspaceName("");
        setEditBaseId(null);
        setEditBaseName("");
    };


    // 모달 닫기버튼 누를때 동작할 내용
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedWorkspaceId(null);
    };

    // 워크스페이스 만들기 
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


    // 베이스 만들기
    const handleCreateBase = async () => {
          // trim() = 문자열 양 끝의 공백제거
        // 값이 비어있으면 그냥 종료

        if (!newBaseName.trim()) return;

        try{
            await createBase ( {
                variables: {
                    workspaceId : selectedWorkspaceId,
                    baseName: newBaseName,
                },
            });
            setNewBaseName("");
            // 모달창 닫기
            handleCloseModal();
        }catch (e) {
            console.error("Error creating base:", e);
        }
    }


    // 드롭다운 열기/닫기 상태를 단일 값으로 관리
    const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

    // 드롭다운 열기/닫기 토글
    const toggleDropdown = (workspaceId: string) => {
        // 해당 동작이 실행될때 기존에 있던값과 방금 입력한값이 같으면 null, 다르면 방금 입력받은 값을 보냄
        setOpenDropdownId((prevId) => (prevId === workspaceId ? null : workspaceId));
    };

    // 베이스 드롭다운
    const [openBaseDropdownId, setOpenBaseDropdownId] = useState<string | null>(null);
    const toggleBaseDropdown = (baseId: string) => {
        setOpenBaseDropdownId((prevId) => (prevId === baseId ? null : baseId));
    };

    // 외부 클릭 이벤트 등록
    // 드롭다운 외부 클릭 시 닫기
    // useEffect = 컴포넌트가 랜더링 된 후 특정 작업을 수행하도록 설정
    useEffect(() => {
        // 문서 전체에서 발생하는 클릭 이벤트 처리
        const handleDocumentClick = (event: MouseEvent) => {
            //  클릭된 HTML 요소를 가져옴
            const target = event.target as HTMLElement;
            //  클릭한 요소가 workspace-card 라는 요소 내부에 있는지 확인
            if (!target.closest(".workspace-card")) {
                // 요소 외부를 클릭했으면 열려있는 드롭다운 ID값을 null을 보내서 모든 드롭다운을 닫아버림
                setOpenDropdownId(null);
            }
            if (!target.closest(".base-card")) {
                setOpenBaseDropdownId(null);
            }
        };
        //  문서의 클릭 이벤트를 전역으로 감지하도록 이벤트 리스너를 추가
        document.addEventListener("click", handleDocumentClick);

        // 여기서의 return은 useEffect의 정리 함수 
        return () => {
            // 이전에 등록된 이벤트 리스너를 제거 = 메모리 누수방지, 불필요 이벤트 제거
            document.removeEventListener("click", handleDocumentClick);
        };
    }, []);


    // 워크스페이스 이름 수정하기 
    const handleUpdateWorkspace = async () => {

        // trim() = 문자열 양 끝의 공백제거
        // 값이 비어있으면 그냥 종료
        if (!editWorkspaceName.trim()) return;

        try {
            await updateWorkspace({
                variables: {
                    id: selectedWorkspaceId,
                    workspaceName: editWorkspaceName,
                },
            });
            handleCloseModal();
        } catch (e) {
            console.error("Error updating workspace:", e);
        }
    }
    // 베이스 이름, 소속 워크스페이스 수정하기
    const handleUpdateBase = async () => {
        // trim() = 문자열 양 끝의 공백제거
        // 값이 비어있으면 그냥 종료
        if (!editBaseName.trim()) return;
        try {
            await updateBase({
                variables: {
                    id: editBaseId,
                    workspaceId: selectedWorkspaceId,
                    baseName: editBaseName,
                },
            });
            handleCloseModal();
        } catch (e) {
            console.error("Error updating base:", e);
        }
    }



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
                    <styles.WorkspaceCard key={workspace.id} onClick={async () => {
                        await refetchBaseData({ workspaceId: workspace.id });
                        openModal({ type: "viewBase", workspaceId: workspace.id })
                    }}>
                        {/* 워크스페이스의 이름을 출력 */}
                        <styles.WorkspaceTitle>{workspace.workspaceName}</styles.WorkspaceTitle>
                        <styles.WorkspaceUpdatedAt>
                            {/* {workspace.createdAt} 으로 출력하면  Created: 2024-11-18T16:43:53.031712  이런식으로 양식이 이상함
                           new Date(입력값).toLocaleDateString() 은 입력값을 날짜 형식으로 변환하는 자바스크립트 코드*/}
                            Created: {workspace.createdAt ? new Date(workspace.createdAt).toLocaleDateString() : "n/a"}
                        </styles.WorkspaceUpdatedAt>
                        <styles.MoreOptionsButton onClick={(e) => {
                            e.stopPropagation(); // 모달 열림 방지
                            toggleDropdown(workspace.id);
                        }}>⋮</styles.MoreOptionsButton>
                        {/* 각 워크스페이스마다 수정,삭제버튼이 담긴 옵션버튼 */}
                        {/* 선택한 워크스페이스만 열리도록 어떤걸 선택했는지 확인 */}
                        {/* 선택한 워크스페이스만 && 뒤의 내용이 나옴 */}
                        {/* &&는 "왼쪽 조건이 true일 때만 오른쪽의 내용을 실행하거나 렌더링하라"는 의미 */}
                        {openDropdownId === workspace.id && (
                            <styles.DropdownMenu>
                                <styles.DropdownMenuUl>
                                    <styles.DropdownMenuLi onClick={(e) => {
                                        e.stopPropagation(); // 이벤트 전파 중지
                                        openModal({ type: "edit", workspaceId: workspace.id })
                                    }}>수정</styles.DropdownMenuLi>
                                    <styles.DropdownMenuLi onClick={(e) => {
                                        e.stopPropagation();
                                        openModal({ type: "delete", workspaceId: workspace.id })
                                    }}>삭제</styles.DropdownMenuLi>
                                </styles.DropdownMenuUl>
                            </styles.DropdownMenu>
                        )}
                    </styles.WorkspaceCard>
                ))}
            </styles.WorkspaceGrid>



            {/* 워크스페이스 생성 버튼 */}
            {/* 버튼 클릭시 IsModalOpen 을 true로 바꿈 */}
            <styles.CreateButton onClick={() => openModal({ type: "create" })}>
                Create New Workspace
            </styles.CreateButton>


            {/* 모달 */}
            {/* Modal의 isOpen 값은 isModalOpen의 값으로 만듬 (위의 생성 버튼 눌렀으면 true 아니면 false) */}
            {/* 모달 창을 닫으려 하면 (onClose) handleCloseModal 을 동작함  */}
            <Modal isOpen={isModalOpen} onClose={closeModal}>
                {modalType === "create" && (
                    <>
                        <h2>Create Workspace</h2>
                        <styles.Input
                            type="text"
                            placeholder="Workspace Name"
                            value={newWorkspaceName}
                            onChange={(e) => setNewWorkspaceName(e.target.value)}
                        />
                        <styles.CreateButton onClick={handleCreateWorkspace}>
                            Create
                        </styles.CreateButton>
                    </>
                )}
                {modalType === "edit" && (
                    <>
                        <h2>Edit Workspace</h2>
                        <styles.Input
                            type="text"
                            placeholder="Workspace Name"
                            value={editWorkspaceName}
                            onChange={(e) => setEditWorkspaceName(e.target.value)}
                        />
                        <styles.CreateButton onClick={handleUpdateWorkspace}>
                            Update
                        </styles.CreateButton>
                    </>
                )}
                {modalType === "viewBase" && (
                    <>
                        <styles.Header>
                            <h2>Workspace Bases</h2>
                            <styles.NewBaseButton
                                onClick={() => openModal({ type: "create_base", workspaceId: selectedWorkspaceId })}
                            >
                                New Base
                            </styles.NewBaseButton>
                        </styles.Header>

                        <styles.BaseList>
                            {/* 데이터 값들을 반복문 */}
                            {baseData?.getBasesByWorkspaceId.map((base) => (
                                <styles.BaseItem
                                    key={base.id}
                                    // 해당 화면을 클릭하면 workspaces/base.id 로 이동시킴
                                    onClick={() => router.push(`/workspaces/${base.id}`)}
                                >
                                    <styles.BaseTitle>{base.baseName}</styles.BaseTitle>

                                    {/* 드롭다운 열기/닫기 버튼 */}
                                    <styles.MoreOptionsButton onClick={(e) => {
                                        e.stopPropagation(); // 클릭 이벤트 전파 방지
                                        toggleBaseDropdown(base.id); // 해당 베이스의 드롭다운 열기/닫기
                                    }}>⋮</styles.MoreOptionsButton>

                                    {/* 드롭다운 메뉴 */}
                                    {openBaseDropdownId === base.id && (
                                        <styles.DropdownMenu>
                                            <styles.DropdownMenuUl>
                                                <styles.DropdownMenuLi onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal({ type: "move_base", baseId: base.id, baseName: base.baseName });
                                                }}>이동</styles.DropdownMenuLi>
                                                <styles.DropdownMenuLi onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal({ type: "edit_base", baseId: base.id });
                                                }}>수정</styles.DropdownMenuLi>
                                                <styles.DropdownMenuLi onClick={(e) => {
                                                    e.stopPropagation();
                                                    openModal({ type: "delete_base", baseId: base.id, baseName: base.baseName, workspaceId: selectedWorkspaceId });
                                                }}>삭제</styles.DropdownMenuLi>
                                            </styles.DropdownMenuUl>
                                        </styles.DropdownMenu>
                                    )}
                                </styles.BaseItem>
                            ))}
                        </styles.BaseList>
                    </>
                )}
                {modalType === "delete" && (
                    <>
                        <h2>해당 스테이션을 삭제하시겠 습니까? [{data?.getAllWorkspaces.find(workspace => workspace.id === selectedWorkspaceId)?.workspaceName}] </h2>

                        <styles.CreateButton onClick={async () => {
                            if (selectedWorkspaceId) {
                                try {
                                    await deleteWorkspace({ variables: { workspaceId: selectedWorkspaceId } });
                                    closeModal();
                                } catch (e) {
                                    console.error("Error deleting workspace:", e);
                                }
                            }
                        }}>
                            Delete
                        </styles.CreateButton>
                        <styles.CancelButton onClick={closeModal}>Cancel</styles.CancelButton>
                    </>
                )}
                {modalType === "edit_base" && (
                    <>
                        <h2>Edit Base</h2>
                        <styles.Input
                            type="text"
                            placeholder="Base Name"
                            value={editBaseName}
                            onChange={(e) => setEditBaseName(e.target.value)}
                        />
                        <styles.CreateButton onClick={handleUpdateBase}>
                            Update
                        </styles.CreateButton>
                    </>
                )}
                {modalType === "delete_base" && (
                    <>
                        {console.log(baseData)}
                        {console.log("selectedWorkspaceId:", selectedWorkspaceId)}
                        <h2>해당 베이스을 삭제하시겠 습니까? [{
                            baseData?.getBasesByWorkspaceId.find((base) => base.id === editBaseId)?.baseName
                        }] </h2>
                        <styles.CreateButton onClick={async () => {
                            if (editBaseId) {
                                try {
                                    await deleteBase({ variables: { baseId: editBaseId } });
                                    closeModal();
                                } catch (e) {
                                    console.error("Error deleting base:", e);
                                }
                            }
                        }}>
                            Delete
                        </styles.CreateButton>
                        <styles.CancelButton onClick={closeModal}>Cancel</styles.CancelButton>
                    </>
                )}
                {modalType === "create_base" && (
                    <>
                    <h2>Create Base</h2>
                    <styles.Input
                        type="text"
                        placeholder="Base Name"
                        value={newBaseName}
                        onChange={(e) => setNewBaseName(e.target.value)}
                    />
                    <styles.CreateButton onClick={handleCreateBase}>
                        Create
                    </styles.CreateButton>
                </>
                )}
                {modalType === "move_base" && (
                    <>
                        <h2>Move Base to Another Workspace</h2>
                        <p>Select a workspace to move the base:</p>
                        <styles.WorkspaceList>
                            {data?.getAllWorkspaces.map((workspace) => (
                                <styles.WorkspaceItem
                                    key={workspace.id}
                                    onClick={() => setTargetWorkspaceId(workspace.id)}
                                    selected={targetWorkspaceId === workspace.id} // props 전달
                                >
                                    {workspace.workspaceName}
                                </styles.WorkspaceItem>
                            ))}
                        </styles.WorkspaceList>

                        <styles.CreateButton
                            onClick={async () => {
                                if (targetWorkspaceId && editBaseId) {
                                    try {
                                        await updateBase({
                                            variables: {
                                                id: editBaseId,
                                                workspaceId: targetWorkspaceId, // 새 워크스페이스 ID 전달
                                            },
                                        });
                                        closeModal(); // 모달 닫기
                                    } catch (e) {
                                        console.error("Error moving base:", e);
                                    }
                                }
                            }}
                            disabled={!targetWorkspaceId} // 워크스페이스가 선택되지 않으면 버튼 비활성화
                        >
                            Move Base
                        </styles.CreateButton>
                        <styles.CancelButton onClick={closeModal}>Cancel</styles.CancelButton>
                    </>

                )}
            </Modal>

        </styles.Container >

    )

}
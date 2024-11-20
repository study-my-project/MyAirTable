import { useQuery } from "@apollo/client"
import type { Query, QueryGetWorkspaceArgs } from "../../src/commons/types/generated/types"
import { GET_All_WORKSPACES } from "../../src/graphql/queries"
import * as styles from "./workspaces2.style";
import {useState} from "react"

export default function WorkspacePage() {
    const [selectedWorkspaceId , setSelectedWorkspaceId] = useState<string | null> (null);

    // 받아온 워크스페이스를 저장할 useQuery
    const { data } = useQuery<Pick<Query, "getAllWorkspaces">, QueryGetWorkspaceArgs>(GET_All_WORKSPACES)
    console.log(data)


    // 카드를 누르면 나오는 모달 
    const handleOpenModal = (workspaceId: string) => {
        // 받아온 workspaceId 값을 따로 저장시킴
        setSelectedWorkspaceId (workspaceId) ;
    }
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



        </styles.Container>

    )

}
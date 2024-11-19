/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import Modal from "../../src/components/Modal/CreateModal";
import * as styles from "./workspaces.style";
import type { Mutation, Query, QueryGetWorkspaceArgs, QueryGetBasesByWorkspaceIdArgs } from "../../src/commons/types/generated/types"
import { GET_WORKSPACE_BASES, GET_All_WORKSPACES, CREATE_WORKSPACE } from "../../src/graphql/queries"


export default function WorkspacePage() {

  // `useQuery`에 타입을 명시적으로 추가
  const { loading, error, data } = useQuery<Pick<Query, "getAllWorkspaces">, QueryGetWorkspaceArgs>(GET_All_WORKSPACES);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedWorkspaceId, setSelectedWorkspaceId] = useState<string | null>(null);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const { data: baseData, loading: baseLoading } = useQuery<Pick<Query, "getBasesByWorkspaceId">, QueryGetBasesByWorkspaceIdArgs>(
    GET_WORKSPACE_BASES, {
    variables: selectedWorkspaceId ? { workspaceId: selectedWorkspaceId } : undefined,
    skip: !selectedWorkspaceId, // `skip`은 selectedWorkspaceId가 null일 때 쿼리를 실행하지 않음
  });


  const [createWorkspace, { loading: createLoading, error: createError }] = useMutation<Pick<Mutation, "createWorkspace">>(
    CREATE_WORKSPACE,
    {
      refetchQueries: [{ query: GET_All_WORKSPACES }], // 워크스페이스 생성 후 목록 갱신
    }
  );

  const router = useRouter();

  const handleOpenModal = (workspaceId: string) => {
    setSelectedWorkspaceId(workspaceId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedWorkspaceId(null);
  };

  const handleCreateWorkspace = async () => {
    if (!newWorkspaceName.trim()) return; // Prevent empty input

    try {
      await createWorkspace({
        variables: {
          workspaceName: newWorkspaceName,
        },
      });
      setNewWorkspaceName("");
      handleCloseModal();
    } catch (e) {
      console.error("Error creating workspace:", e);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <styles.Container>
      <styles.Title>Your Workspaces</styles.Title>

      {/* 워크스페이스 목록 */}
      <styles.WorkspaceGrid>
        {data?.getAllWorkspaces.map((workspace) => (
          <styles.WorkspaceCard key={workspace.id} onClick={() => handleOpenModal(workspace.id)}>
            <styles.WorkspaceTitle>{workspace.workspaceName}</styles.WorkspaceTitle>
            <styles.WorkspaceUpdatedAt>
              Created: {workspace.createdAt ? new Date(workspace.createdAt).toLocaleDateString() : "N/A"}
            </styles.WorkspaceUpdatedAt>
            <styles.WorkspaceUpdatedAt>
              Updated: {workspace.updatedAt ? new Date(workspace.updatedAt).toLocaleDateString() : "N/A"}
            </styles.WorkspaceUpdatedAt>
          </styles.WorkspaceCard>
        ))}
      </styles.WorkspaceGrid>

      {/* 워크스페이스 생성 버튼 */}
      <styles.CreateButton onClick={() => setIsModalOpen(true)}>Create New Workspace</styles.CreateButton>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        {selectedWorkspaceId ? (
          <>
            <h2>Workspace Bases</h2>
            {baseLoading ? (
              <p>Loading...</p>
            ) : (
              <styles.BaseList>
                {baseData?.getBasesByWorkspaceId.map((base) => (
                  <styles.BaseItem
                    key={base.id}
                    onClick={() => router.push(`/workspaces/${base.id}`)} // 클릭 시 동적 라우팅
                    style={{ cursor: "pointer" }} // 클릭 가능하도록 스타일 추가
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
  );
}
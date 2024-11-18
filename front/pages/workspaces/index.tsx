/** @jsxImportSource @emotion/react */
import React, { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import Modal from "../../src/components/Modal/CreateModal";
import * as styles from "./workspaces.style";
import type { Query, QueryGetWorkspaceArgs } from "../../src/commons/types/generated/types"

// GraphQL Query
// 모든 워크스페이스 조회하기
const GetAllWorkspaces = gql`
  query {
    getAllWorkspaces {
      id
      workspaceName
      createdAt
      updatedAt
    }
  }
`;

// 

export default function WorkspacePage() {

  // `useQuery`에 타입을 명시적으로 추가
  const { loading, error, data } = useQuery<Pick<Query, "getAllWorkspaces">, QueryGetWorkspaceArgs>(GetAllWorkspaces);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewWorkspaceName("");
  };

  const handleCreateWorkspace = () => {
    if (!newWorkspaceName.trim()) return; // 빈 입력 방지
    // TODO: Implement create workspace mutation
    console.log("New workspace name:", newWorkspaceName);
    handleCloseModal();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <styles.Container>
      <styles.Title>Your Workspaces</styles.Title>

      {/* 워크스페이스 목록 */}


      <styles.WorkspaceGrid>
        {data?.getAllWorkspaces.map((workspace) => (
          <styles.WorkspaceCard key={workspace.id}>
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
      <styles.CreateButton onClick={handleOpenModal}>Create New Workspace</styles.CreateButton>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Create Workspace</h2>
        <styles.Input
          type="text"
          placeholder="Workspace Name"
          value={newWorkspaceName}
          onChange={(e) => setNewWorkspaceName(e.target.value)}
        />
        <styles.CreateButton onClick={handleCreateWorkspace}>Create</styles.CreateButton>
      </Modal>
    </styles.Container>
  );
};


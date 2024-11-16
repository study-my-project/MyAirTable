"use client";
import React, { useState } from 'react';
import Modal from '../components/Modal';

// Mock 데이터
const initialWorkspaces = [
  { id: 1, name: "Untitled Base", type: "Base", updatedAt: "Today" },
  { id: 2, name: "메메틱 마스터리", type: "Base", updatedAt: "Past 30 days" },
];

const WorkspacePage = () => {
  const [workspaces, setWorkspaces] = useState(initialWorkspaces);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWorkspaceName, setNewWorkspaceName] = useState("");

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setNewWorkspaceName("");
  };

  const handleCreateWorkspace = () => {
    if (!newWorkspaceName.trim()) return; // 빈 입력 방지
    const newWorkspace = {
      id: workspaces.length + 1,
      name: newWorkspaceName,
      type: "Base",
      updatedAt: "Just now",
    };
    setWorkspaces([...workspaces, newWorkspace]);
    handleCloseModal();
  };

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Your Workspaces</h1>

      {/* 워크스페이스 목록 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {workspaces.map((workspace) => (
          <div
            key={workspace.id}
            className="border p-4 rounded shadow hover:shadow-lg transition"
          >
            <h2 className="text-xl font-semibold">{workspace.name}</h2>
            <p className="text-gray-600">{workspace.type}</p>
            <p className="text-sm text-gray-500">Updated: {workspace.updatedAt}</p>
          </div>
        ))}
      </div>

      {/* 워크스페이스 생성 버튼 */}
      <button
        className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        onClick={handleOpenModal}
      >
        Create New Workspace
      </button>

      {/* 모달 */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-bold mb-4">Create Workspace</h2>
        <input
          type="text"
          placeholder="Workspace Name"
          className="w-full p-2 border rounded mb-4"
          value={newWorkspaceName}
          onChange={(e) => setNewWorkspaceName(e.target.value)}
        />
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          onClick={handleCreateWorkspace}
        >
          Create
        </button>
      </Modal>
    </div>
  );
};

export default WorkspacePage;
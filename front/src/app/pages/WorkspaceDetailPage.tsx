"use client";

import React, { useState } from "react";

const WorkspaceDetailPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  
  // Mock 데이터를 상태로 관리
  const [workspace, setWorkspace] = useState({
    id: 1,
    name: "메메틱 마스터리",
    bases: [
      { id: 1, name: "메메틱 마스터리", content: "메메틱 마스터리의 상세 내용입니다." },
      { id: 2, name: "메메틱 마스터리 - 혹독한 겨울", content: "혹독한 겨울의 상세 내용입니다." },
      { id: 3, name: "메메틱 마스터리 - 프리즘", content: "프리즘의 상세 내용입니다." },
      { id: 4, name: "제작자 및 다른 공략", content: "제작자 및 다른 공략의 상세 내용입니다." },
    ],
  });

  // 현재 선택된 베이스
  const activeBase = workspace.bases[activeTab];


  const handleAddBase = () => {
    const newBaseName = prompt("새로운 베이스 이름을 입력하세요:");
    if (!newBaseName) return;
  
    const newBase = {
      id: workspace.bases.length + 1,
      name: newBaseName,
      content: `${newBaseName}의 상세 내용입니다.`,
    };
  
    setWorkspace({
      ...workspace,
      bases: [...workspace.bases, newBase],
    });
  };


  return (
    <div className="container mx-auto py-6">
      {/* 워크스페이스 이름 */}
      <h1 className="text-2xl font-bold mb-4">{workspace.name}</h1>

      {/* Tabs */}
      <div className="flex items-center border-b mb-6">
        {workspace.bases.map((base, index) => (
          <button
            key={base.id}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === index
                ? "border-b-2 border-blue-500 text-blue-500"
                : "text-gray-600 hover:text-blue-500"
            }`}
            onClick={() => setActiveTab(index)}
          >
            {base.name}
          </button>
        ))}

        {/* + 버튼 */}
        <button
          className="ml-4 px-4 py-2 text-sm font-medium text-gray-600 hover:text-blue-500"
          onClick={handleAddBase}
        >
          +
        </button>
      </div>

      {/* Tab Content */}
      <div className="p-4 border rounded shadow">
        <h2 className="text-lg font-bold mb-2">{activeBase.name}</h2>
        <p className="text-gray-700">{activeBase.content}</p>
      </div>
    </div>
  );
};

export default WorkspaceDetailPage;
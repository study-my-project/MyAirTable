import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import * as styles from "./tablePage.style";
import { GET_BASE_TABLES } from "../../../src/graphql/queries";
import type { QueryGetTablesByBaseIdArgs, Query } from "../../../src/commons/types/generated/types";



export default function TablePage() {
  const router = useRouter(); // Next.js의 useRouter 사용
  const { number } = router.query; // Next.js의 query에서 가져옴
  const baseId = Array.isArray(number) ? number[0] : number; // string[] 타입을 string으로 변환

  // GraphQL 쿼리 실행
  const { loading, error, data } = useQuery<Pick<Query, "getTablesByBaseId">, QueryGetTablesByBaseIdArgs>(GET_BASE_TABLES, {
    variables: baseId ? { baseId } : undefined, // baseId가 존재할 경우에만 쿼리 실행
    skip: !baseId, // baseId가 없으면 쿼리 실행 안 함
  });
  // 탭 상태
  const [activeTab, setActiveTab] = useState<string | null>(null);

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  if (!baseId || typeof baseId !== "string") {
    return <p>Base ID가 제공되지 않았습니다.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tables = data?.getTablesByBaseId || [];

  return (
    <styles.Container>
      {/* 탭 목록 */}
      <styles.Tabs>
        {tables.map((table) => (
          <styles.Tab
            key={table.id}
            isActive={table.id === activeTab}
            onClick={() => handleTabClick(table.id)}
          >
            {table.tableName}
          </styles.Tab>
        ))}
      </styles.Tabs>

      {/* 탭 내용 */}
      {activeTab ? (
        <styles.Content>
          <p>현재 선택된 테이블 ID: {activeTab}</p>
          {/* TODO: 선택된 테이블 데이터를 표시하는 컴포넌트 추가 */}
        </styles.Content>
      ) : (
        <styles.Content>
          <p>테이블을 선택해주세요.</p>
        </styles.Content>
      )}
    </styles.Container>
  );
}
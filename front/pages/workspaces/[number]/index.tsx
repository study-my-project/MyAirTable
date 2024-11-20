import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import * as styles from "./tablePage.style";
import { GET_BASE_TABLES, GET_TABLE_DETAILS } from "../../../src/graphql/queries";
import type {
  QueryGetTablesByBaseIdArgs,
  QueryGetTableDetailsByIdArgs,
  Query
} from "../../../src/commons/types/generated/types";

export default function TablePage() {
  const router = useRouter();
  const { number } = router.query;
  const baseId = Array.isArray(number) ? number[0] : number;

  // 테이블 목록 조회
  const { loading, error, data } = useQuery<Pick<Query, "getTablesByBaseId">, QueryGetTablesByBaseIdArgs>(GET_BASE_TABLES, {
    variables: baseId ? { baseId } : undefined,
    skip: !baseId,
  });

  // 현재 선택된 테이블 ID 상태
  const [activeTab, setActiveTab] = useState<string | null>(null);

  // 선택된 테이블의 상세 정보 조회
  const { data: tableDetailsData, loading: tableDetailsLoading } = useQuery<
    Pick<Query, "getTableDetailsById">,
    QueryGetTableDetailsByIdArgs
  >(GET_TABLE_DETAILS, {
    variables: activeTab ? { tableId: activeTab } : undefined,
    skip: !activeTab,
  });

  // 필드 타입 정의
  type FieldType = {
    id: string;
    fieldName: string;
  };

  const [fields, setFields] = useState<FieldType[]>([]); // 필드 상태 관리

  // 탭 클릭 이벤트 핸들러
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    // 서버로부터 가져온 필드를 초기화
    const fetchedFields = tableDetailsData?.getTableDetailsById.fields || [];
    setFields([...fetchedFields]);
  };

  const handleAddField = () => {
    const newField: FieldType = {
      id: `field-${fields.length + 1}`,
      fieldName: `New Field ${fields.length + 1}`
    };
    setFields([...fields, newField]);
  };

  if (!baseId || typeof baseId !== "string") {
    return <p>Base ID가 제공되지 않았습니다.</p>;
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tables = data?.getTablesByBaseId || [];

  // 엑셀 형식 테이블 데이터 렌더링
  const renderTableData = () => {
    if (tableDetailsLoading) return <p>Loading table details...</p>;

    const records = tableDetailsData?.getTableDetailsById.records || [];
    const cellValues = tableDetailsData?.getTableDetailsById.cellValues || [];

    // 엑셀 형식의 데이터 생성
    const grid = records.map((record) =>
      fields.map((field) => {
        const cell = cellValues.find(
          (value) => value.fieldId === field.id && value.recordId === record.id
        );
        return cell ? cell.value : "";
      })
    );

    return (
      <div style={{ overflowX: "auto", overflowY: "auto", maxHeight: "500px" }}>
        <styles.Table>
          <thead>
            <tr>
              {fields.map((field, index) => (
                <styles.TableHeader key={field.id}>
                  {field.fieldName}
                  {index === fields.length - 1 && (
                    <styles.AddButton onClick={handleAddField}>
                      +
                    </styles.AddButton>
                  )}
                </styles.TableHeader>
              ))}
            </tr>
          </thead>
          <tbody>
            {grid.map((row, rowIndex) => (
              <styles.TableRow key={records[rowIndex].id}>
                {row.map((cell, cellIndex) => (
                  <styles.TableCell key={`${records[rowIndex].id}-${fields[cellIndex].id}`}>
                    {cell}
                  </styles.TableCell>
                ))}
              </styles.TableRow>
            ))}
          </tbody>
        </styles.Table>
      </div>
    );
  };

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
      <styles.Content>
        {activeTab ? (
          renderTableData()
        ) : (
          <p>테이블을 선택해주세요.</p>
        )}
      </styles.Content>
    </styles.Container>
  );
}
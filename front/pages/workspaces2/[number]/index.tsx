import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_BASE_TABLES } from "../../../src/graphql/queries";
import type {
    QueryGetTablesByBaseIdArgs,
    Query
} from "../../../src/commons/types/generated/types";
import * as styles from "./tablePage.style";
import React, { useState } from "react";
import Sheet from "../../../src/components/sheet2"



export default function TablePage() {
    // useRouter 현재 페이지의 경로 및 쿼리 파라미터에 접근할 수 있음
    const router = useRouter();
    // router 를 통해서 값을 가져옴
    // 주소값이 page?number=123인 경우 number는 123임
    const { number } = router.query;
    // 받아온 주소값을 baseId에다가 저장함.
    const baseId = Array.isArray(number) ? number[0] : number;

    //baseId 가지고 table들 리스트로 가져오기
    const { data } = useQuery<Pick<Query, "getTablesByBaseId">, QueryGetTablesByBaseIdArgs>(GET_BASE_TABLES, {
        variables: baseId ? { baseId } : undefined,
        skip: !baseId,
    });

    // 받아온 테이블 리스트를 tables 변수에 저장
    const tables = data?.getTablesByBaseId || [];

        ///

    // 현재 선택된 테이블 ID 상태
    const [activeTab, setActiveTab] = useState<string | null>(null);

    // 탭 클릭 이벤트 핸들러
    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        // 서버로부터 가져온 필드를 초기화
        // const fetchedFields = tableDetailsData?.getTableDetailsById.fields || [];
        // setFields([...fetchedFields]);
        console.log(tabId)
    };

    return (
        <styles.Container>
            {/* 탭 목록 */}
            <styles.Tabs>
                {/* tables의 데이터 수만큼 반복 */}
                {tables.map((table) => (
                    <styles.Tab
                        key={table.id}
                        // isActive = 활성화 여부 boolean 값
                        //  table.id 와 activeTab 값이 같으면 true 반환
                        isActive={table.id === activeTab}
                        // 탭을 클릭하면 발생할 이벤트
                        onClick={() => handleTabClick(table.id)}
                    >
                        {table.tableName}
                    </styles.Tab>
                ))}
            </styles.Tabs>

            {/* 탭 내용 */}
            <styles.Content>
                {activeTab ? (
                    // Sheet 컴포넌트를 불러오면서 현재 활성화 되어있는 테이블의 ID 값을 보냄
                    <Sheet tableId = {activeTab}></Sheet>
                ) : (
                    <p>테이블을 선택해주세요.</p>
                )}
            </styles.Content>
        </styles.Container>
    )
}
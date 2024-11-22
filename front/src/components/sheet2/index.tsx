import { useState,useEffect  } from "react";
import * as styles from "./sheet.style";
import { GET_TABLE_DETAILS } from "../../../src/graphql/queries";
import { useQuery } from "@apollo/client";
import type {
    QueryGetTableDetailsByIdArgs,
    Query
} from "../../../src/commons/types/generated/types";

export default function sheet({ tableId }) {


    // 현재 선택된 테이블 ID 상태
    const [activeTable, setActiveTable] = useState<string | null>(null);
    // tableId 변경 시 activeTable 업데이트
    useEffect(() => {
        if (tableId) {
            setActiveTable(tableId);
        }
    }, [tableId]);
    // 받아온 테이블 ID를 사용해서 Field의 리스트와 Records 리스트, CellValue 전부 가져오자
    const { data: tableDetailsData, loading: tableDetailsLoading } = useQuery<
        Pick<Query, "getTableDetailsById">,
        QueryGetTableDetailsByIdArgs
    >(GET_TABLE_DETAILS, {
        variables: activeTable ? { tableId: activeTable } : undefined,
        skip: !activeTable,
    });

    console.log(tableDetailsData?.getTableDetailsById)



    return (
        <>
            <styles.excel_container>
                {/* 표전체를 감싸는 테이블 */}
                <styles.excel_table>
                    {/* 맨 윗줄  */}
                    <thead>
                        {/* 최 좌상단은 빈칸 */}
                        <styles.excel_table_th></styles.excel_table_th>
                        s

                    </thead>

                </styles.excel_table>
            </styles.excel_container>
        </>

    )

}
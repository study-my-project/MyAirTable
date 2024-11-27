import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BASE_TABLES, CREATE_TABLE, UPDATE_TABLE, DELETE_TABLE } from "../../../src/graphql/queries";
import type {
    QueryGetTablesByBaseIdArgs,
    Query,
    Mutation
} from "../../../src/commons/types/generated/types";
import * as styles from "./tablePage.style";
import React, { useState } from "react";
import Sheet from "../../../src/components/sheet"

// 모달 타입 정의
type ModalType = "create_table" | "edit_table" | "delete_table";


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

    // 테이블을 만들때 이름을 저장할 곳
    const [newTableName, setNewTableName] = useState("");
    // 수정할 선택한 테이블
    const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
    // 테이블을 생성할 뮤테이션
    const [createTable] = useMutation<Pick<Mutation, "createTable">>(
        CREATE_TABLE,
        {
            refetchQueries: [{ query: GET_BASE_TABLES, variables: { baseId } }], // 워크스페이스 생성 후 목록 갱신
        }
    );

    // 테이블 수정 뮤테이션
    const [updateTable] = useMutation<Pick<Mutation, "updateTable">>(UPDATE_TABLE, {
        refetchQueries: [{ query: GET_BASE_TABLES, variables: { baseId } }],
    });

    // 테이블 삭제 뮤테이션 
    const [deleteTable] = useMutation<Pick<Mutation, "deleteTable">>(DELETE_TABLE, {
        refetchQueries: [{ query: GET_BASE_TABLES, variables: { baseId } }],
    });

    // 
    // 모달의 타입 
    const [modalType, setModalType] = useState<ModalType>("create_table");
    // 모달 열림 상태 여부
    const [isModalOpen, setIsModalOpen] = useState(false);

    // 모달 열기 핸들러
    const openModal = ({
        type,
        tableId
    }: {
        type: ModalType;
        tableId?: string
    }) => {
        setModalType(type);
        setSelectedTableId(tableId || null);
        setIsModalOpen(true);
    }

    // 모달 닫기 핸들러
    const closeModal = () => {
        setIsModalOpen(false);
        setNewTableName("");
        setSelectedTableId(null);
    };

    // 테이블 만들기 핸들러 
    const handleCreateTable = async () => {
        if (!newTableName || !baseId) {
            alert("테이블 이름을 입력해주세요.");
            return;
        }

        try {
            await createTable({
                variables: {
                    baseId,
                    tableName: newTableName,
                },
            });
            setNewTableName(""); // 입력값 초기화
            closeModal(); // 모달 닫기
            alert("새로운 테이블이 생성되었습니다.");
        } catch (error) {
            console.error(error);
            alert("테이블 생성 중 오류가 발생했습니다.");
        }
    };
    ///
    // 테이블 수정 기능 핸들러
    const handleEditTable = async () => {
        
        console.log(selectedTableId)
        console.log(newTableName)
        if (!newTableName || !selectedTableId) {
            alert("테이블 이름을 입력해주세요.");
            return;
        }

        try {
            await updateTable({
                variables: {
                    id: selectedTableId,
                    tableName: newTableName,
                },
            });
            closeModal();
            alert("테이블 이름이 수정되었습니다.");
        } catch (error) {
            console.error(error);
            alert("테이블 수정 중 오류가 발생했습니다.");
        }
    };
    // 테이블 삭제 기능 핸들러
    const handleDeleteTable = async () => {
        if (!selectedTableId) {
            alert("삭제할 테이블을 선택해주세요.");
            return;
        }

        try {
            await deleteTable({
                variables: { tableId: selectedTableId },
            });
            closeModal();
            alert("테이블이 삭제되었습니다.");
        } catch (error) {
            console.error(error);
            alert("테이블 삭제 중 오류가 발생했습니다.");
        }
    };

    const [contextMenu, setContextMenu] = useState<{ x: number; y: number; tableId: string } | null>(
        null
    );
    const handleCloseContextMenu = () => {
        setContextMenu(null);
    };

    const handleContextMenu = (e: React.MouseEvent, tableId: string) => {
        e.preventDefault();
        setContextMenu({
            x: e.clientX,
            y: e.clientY,
            tableId,
        });
    };

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
            <styles.TabHeader>
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
                            onContextMenu={(e) => handleContextMenu(e, table.id)} // 우클릭 이벤트
                        >
                            {table.tableName}
                        </styles.Tab>
                    ))}
                </styles.Tabs>

                <styles.AddTabButton onClick={() => openModal({ type: "create_table" })}>
                    +
                </styles.AddTabButton>
            </styles.TabHeader>
            {/* 탭 내용 */}
            <styles.Content>
                {activeTab ? (
                    // Sheet 컴포넌트를 불러오면서 현재 활성화 되어있는 테이블의 ID 값을 보냄
                    <Sheet tableId={activeTab}></Sheet>
                ) : (
                    <p>테이블을 선택해주세요.</p>
                )}
            </styles.Content>
            {/* 모달 내용 */}

            {isModalOpen && modalType === "create_table" && (
                <styles.Modal>
                    <styles.ModalContent>
                        <h2>새로운 테이블 생성</h2>
                        <styles.Input
                            type="text"
                            placeholder="테이블 이름을 입력하세요"
                            value={newTableName}
                            onChange={(e) => setNewTableName(e.target.value)}
                        />
                        <styles.ButtonContainer>
                            <styles.Button onClick={handleCreateTable}>생성</styles.Button>
                            <styles.Button onClick={closeModal}>취소</styles.Button>
                        </styles.ButtonContainer>
                    </styles.ModalContent>
                </styles.Modal>
            )}
            {isModalOpen && modalType === "edit_table" && (
                <styles.Modal>
                    <styles.ModalContent>
                        <h2>테이블 이름 수정</h2>
                        <styles.Input
                            type="text"
                            placeholder="새로운 테이블 이름을 입력하세요"
                            value={newTableName}
                            onChange={(e) => setNewTableName(e.target.value)}
                        />
                        <styles.ButtonContainer>
                            <styles.Button onClick={handleEditTable}>수정</styles.Button>
                            <styles.Button onClick={closeModal}>취소</styles.Button>
                        </styles.ButtonContainer>
                    </styles.ModalContent>
                </styles.Modal>
            )}

            {isModalOpen && modalType === "delete_table" && (
                <styles.Modal>
                    <styles.ModalContent>
                        <h2>정말로 삭제하시겠습니까?</h2>
                        <p>{`[${tables.find((t) => t.id === selectedTableId)?.tableName}] 테이블을 삭제합니다.`}</p>
                        <styles.ButtonContainer>
                            <styles.Button onClick={handleDeleteTable}>삭제</styles.Button>
                            <styles.Button onClick={closeModal}>취소</styles.Button>
                        </styles.ButtonContainer>
                    </styles.ModalContent>
                </styles.Modal>
            )}

            {/* 컨텍스트 메뉴 */}
            {contextMenu && (
                <styles.ContextMenu style={{ top: contextMenu.y, left: contextMenu.x }}>
                    {/* 수정 클릭 시 수정 모달 열기 */}
                    <styles.ContextMenuItem
                        onClick={() => {
                            openModal({ type: "edit_table", tableId: contextMenu.tableId });
                            handleCloseContextMenu();
                        }}
                    >
                        수정
                    </styles.ContextMenuItem>

                    {/* 삭제 클릭 시 삭제 모달 열기 */}
                    <styles.ContextMenuItem
                        onClick={() => {
                            openModal({ type: "delete_table", tableId: contextMenu.tableId });
                            handleCloseContextMenu();
                        }}
                    >
                        삭제
                    </styles.ContextMenuItem>
                </styles.ContextMenu>
            )}
        </styles.Container>

    )
}
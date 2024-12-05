import { useRouter } from "next/router";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BASE_TABLES, CREATE_TABLE, UPDATE_TABLE, DELETE_TABLE, CREATE_FIELD, CREATE_RECORD, UPDATE_INDEX_TABLE } from "../../../src/graphql/queries";
import type {
    QueryGetTablesByBaseIdArgs,
    Query,
    Mutation
} from "../../../src/commons/types/generated/types";
import * as styles from "./tablePage.style";
import React, { useState, useRef, useEffect, useMemo } from "react";
import Sheet from "../../../src/components/sheet2"
import { DndContext, closestCenter, DragEndEvent } from "@dnd-kit/core";
import { SortableContext, horizontalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
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
    const { data, refetch } = useQuery<Pick<Query, "getTablesByBaseId">, QueryGetTablesByBaseIdArgs>(GET_BASE_TABLES, {
        variables: baseId ? { baseId } : undefined,
        skip: !baseId,
    });

    // 테이블 데이터를 가져오기
    const tables = useMemo(() => {
        return data?.getTablesByBaseId || [];
    }, [data]);

    // 테이블 상태를 설정
    useEffect(() => {
        setOrderedTables(tables.map((table, index) => ({ ...table, index })));
    }, [tables]);


    const [orderedTables, setOrderedTables] = useState<{ id: string; tableName: string; index: number }[]>([]);

    useEffect(() => {
        setOrderedTables(tables.map((table, index) => ({ ...table, index })));
    }, [tables]);

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

    // 필드생성
    const [createField] = useMutation<Pick<Mutation, "createField">>(
        CREATE_FIELD,
        {
            refetchQueries: [{ query: GET_BASE_TABLES, variables: { baseId } }], // 워크스페이스 생성 후 목록 갱신
        }
    )
    // 레코드 생성
    const [createRecord] = useMutation<Pick<Mutation, "createRecord">>(
        CREATE_RECORD,
        {
            refetchQueries: [{ query: GET_BASE_TABLES, variables: { baseId } }], // 워크스페이스 생성 후 목록 갱신
        }
    )


    // 테이블 수정 뮤테이션
    const [updateTable] = useMutation<Pick<Mutation, "updateTable">>(UPDATE_TABLE, {
        refetchQueries: [{ query: GET_BASE_TABLES, variables: { baseId } }],
    });

    // 테이블 삭제 뮤테이션 
    const [deleteTable] = useMutation<Pick<Mutation, "deleteTable">>(DELETE_TABLE, {
        refetchQueries: [{ query: GET_BASE_TABLES, variables: { baseId } }],
    });

    // 테이블 인덱스 수정 뮤테이션
    const [updateTableIndex] = useMutation(UPDATE_INDEX_TABLE, {
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
            // Step 1: 테이블 생성
            const { data } = await createTable({
                variables: {
                    baseId,
                    tableName: newTableName,
                },
            });

            const newTableId = data?.createTable.id;

            if (!newTableId) {
                throw new Error("테이블 생성 실패: ID를 가져올 수 없습니다.");
            }

            // Step 2: 10개의 필드 생성
            for (let i = 0; i < 10; i++) {
                await createField({
                    variables: {
                        tableId: newTableId,
                        fieldName: `필드 ${i + 1}`,
                        type: "text",
                        options: JSON.stringify({ optionKey: `옵션값 ${i + 1}` }),
                    },
                });
            }

            // for루프, promise.all 차이점
            // 비동기 작업의 실행 방식과 효율성에서 차이를 보임
            // for루프는 await와 함께 사용하면 비동기 작업이 순차적으로 실행됨 
            // 하나의 작업이 끝나고 다음 작없을 시행해서 동기실행방식에 가까움
            //  병령이 불가능해서 속도가 느릴 수 있음

            // promise.all
            // 여러 비동기 작업이 병렬로 실행됨
            // 모든작업이 동시시작, 모든 작업이 완료까지 기다림,
            // 작업 순서가 보장되지 않음
            // 병렬이므로 속도는 빠름
            // 중복문제 발생 가능성이 있음. 

            // 여기서 Record, Field의 생성의 경우
            // 순차적으로 index의 값을 넣어줘야 하기에 for 루프문 방식을 채택함.


            // Step 3: 10개의 레코드 생성

            for (let i = 0; i < 10; i++) {
                await createRecord({
                    variables: {
                        tableId: newTableId,
                    },
                })
            }
            // const recordPromises = Array.from({ length: 10 }, () =>
            //     createRecord({
            //         variables: {
            //             tableId: newTableId,
            //         },
            //     })
            // );

            // await Promise.all(recordPromises);

            setNewTableName(""); // 입력값 초기화
            closeModal(); // 모달 닫기
            alert("새로운 테이블과 10개의 필드, 10개의 레코드가 생성되었습니다.");
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

    // 탭 좌우 스크롤
    const scrollContainerRef = useRef<HTMLDivElement>(null);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -100, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 100, behavior: "smooth" });
        }
    };


    const handleTableDragEnd = async (event: DragEndEvent) => {
        const { active, over } = event;

        if (!over || !over.id || active.id === over.id) return;

        const oldIndex = orderedTables.findIndex((table) => table.id === active.id);
        const newIndex = orderedTables.findIndex((table) => table.id === over.id);

        const reorderedTables = arrayMove(orderedTables, oldIndex, newIndex).map((table, index) => ({
            ...table,
            index,
        }));
        setOrderedTables(reorderedTables);

        try {
            await updateTableIndex({ variables: { tableId: active.id, newIndex } });
            refetch();
        } catch (error) {
            console.error("테이블 순서 업데이트 중 오류:", error);
            refetch();
        }
    };

    return (
        <styles.Container>
            {/* 탭 목록 */}
            <styles.TabHeader>

                <styles.AddTabButton onClick={() => openModal({ type: "create_table" })}>
                    +
                </styles.AddTabButton>

                <DndContext
                    collisionDetection={closestCenter}
                    onDragEnd={handleTableDragEnd} // 드래그 종료 시 호출
                >
                    <SortableContext
                        items={orderedTables.map((table) => table.id)}
                        strategy={horizontalListSortingStrategy} // 수평 정렬 전략
                    >
                        <styles.Tabs ref={scrollContainerRef}>
                            {orderedTables.map((table) => (
                                <SortableTab
                                    key={table.id}
                                    table={table}
                                    isActive={table.id === activeTab}
                                    onClick={() => handleTabClick(table.id)}
                                    onContextMenu={(e) => handleContextMenu(e, table.id)}
                                />
                            ))}
                        </styles.Tabs>
                    </SortableContext>
                </DndContext>
                <styles.ScrollLeftButton onClick={scrollLeft}>{"<"}</styles.ScrollLeftButton>

                <styles.ScrollRightButton onClick={scrollRight}>{">"}</styles.ScrollRightButton>
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

            {
                isModalOpen && modalType === "create_table" && (
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
                )
            }
            {
                isModalOpen && modalType === "edit_table" && (
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
                )
            }

            {
                isModalOpen && modalType === "delete_table" && (
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
                )
            }

            {/* 컨텍스트 메뉴 */}
            {
                contextMenu && (
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
                )
            }
        </styles.Container >

    )
}
function SortableTab({
    table,
    isActive,
    onClick,
    onContextMenu,
}: {
    table: { id: string; tableName: string; index: number };
    isActive: boolean;
    onClick: () => void;
    onContextMenu: (e: React.MouseEvent, tableId: string) => void;
}) {
    const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
        id: table.id,
    });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    // 드래그 중인지 감지하기 위한 로컬 상태
    const [isDragging, setIsDragging] = useState(false);

    return (
        <styles.Tab
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            isActive={isActive}
            onPointerDown={() => setIsDragging(false)} // 클릭 시작 시 드래그 상태 초기화
            onPointerMove={() => setIsDragging(true)} // 포인터 이동 시 드래그 상태로 설정
            onPointerUp={() => {
                if (!isDragging) onClick(); // 드래그 상태가 아니면 클릭 처리
            }}
            onContextMenu={(e) => onContextMenu(e, table.id)}
        >
            {table.tableName}
        </styles.Tab>
    );
}
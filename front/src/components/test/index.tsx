import React, { useState } from "react";
import * as styles from "./test.style";

const ResizableTable = () => {

    // 각 열의 기본 너비
    const [columnWidths, setColumnWidths] = useState([100, 100, 100]);


    const handleMouseDown = (index: number, e: React.MouseEvent) => {
        // 기본 동작 방지 ( 드래그 선택 )
        e.preventDefault();
        // 마우스를 누른시작 X좌표
        const startX = e.clientX;
        // 마우스를 누른 열의 초기 너비
        const startWidth = columnWidths[index];

        // 마우스 이동시 호출되는 이벤트 핸들러
        const handleMouseMove = (moveEvent: MouseEvent) => {
            //마우스가 이동한거리
            const deltaX = moveEvent.clientX - startX;

            // 선택된 열만 크기 변경
            setColumnWidths((prevWidths) => {
                // 적용시킬 열의 너비 newWidths 
                const newWidths = [...prevWidths];
                // 최소값을 50으로 시작값 + 이동값을 해서 둘중 큰 값으로 
                newWidths[index] = Math.max(50, startWidth + deltaX); // 최소 너비 50px
                console.log(newWidths)
                return newWidths;
            });
        };

        // 마우스 버튼을 떼면 호출
        const handleMouseUp = () => {
            // 이벤트 리스너를 제거해서 크기조절 작업 종료
            document.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseup", handleMouseUp);
        };

        document.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseup", handleMouseUp);
    };

    return (
        <styles.TableWrapper>
          <styles.Table>
            <thead>
              <styles.TableRow>
                {columnWidths.map((width, index) => (
                  <styles.TableHeader key={index} style={{ width: `${width}px` }}>
                    Header {index + 1}
                    <styles.ResizeHandle onMouseDown={(e) => handleMouseDown(index, e)} />
                  </styles.TableHeader>
                ))}
              </styles.TableRow>
            </thead>
            <tbody>
              {[...Array(5)].map((_, rowIndex) => (
                <styles.TableRow key={rowIndex}>
                  {columnWidths.map((_, colIndex) => (
                    <styles.TableCell key={colIndex}>
                      Row {rowIndex + 1}, Col {colIndex + 1}
                    </styles.TableCell>
                  ))}
                </styles.TableRow>
              ))}
            </tbody>
          </styles.Table>
        </styles.TableWrapper>
      );
    };
export default ResizableTable;
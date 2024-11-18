import React, { useEffect, useState } from "react";
import { Button, TextField, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useTable, Column } from "react-table";

interface TableData {
  name: string;
  description: string;
  level: string;
  type: string;
}

interface DynamicTableProps {
  initialData: TableData[];
  onUpdateTableData: (updatedData: TableData[]) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({ initialData, onUpdateTableData }) => {
  const [data, setData] = useState<TableData[]>(initialData);

  useEffect(() => {
    setData(initialData); // `initialData`가 변경될 때만 동기화
  }, [initialData]);

  const columns: Column<TableData>[] = [
    { Header: "이름", accessor: "name" },
    { Header: "설명", accessor: "description" },
    { Header: "등장 레벨 구간", accessor: "level" },
    { Header: "종류", accessor: "type" },
  ];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  const addRow = () => {
    const newRow = { name: "", description: "", level: "", type: "" };
    const updatedData = [...data, newRow];
    setData(updatedData);
    onUpdateTableData(updatedData);
  };

  const handleInputChange = (value: string, rowIndex: number, columnId: keyof TableData) => {
    const updatedData = data.map((row, index) =>
      index === rowIndex ? { ...row, [columnId]: value } : row
    );
    setData(updatedData);
    onUpdateTableData(updatedData);
  };

  return (
    <Box sx={{ padding: 2 }}>
      <table {...getTableProps()} style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          {headerGroups.map((headerGroup, groupIndex) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={groupIndex}>
              {headerGroup.headers.map((column, columnIndex) => (
                <th
                  {...column.getHeaderProps()}
                  key={columnIndex}
                  style={{ border: "1px solid #ccc", padding: "8px", textAlign: "left" }}
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, rowIndex) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()} key={rowIndex}>
                {row.cells.map((cell, cellIndex) => (
                  <td
                    {...cell.getCellProps()}
                    key={cellIndex}
                    style={{ border: "1px solid #ccc", padding: "8px" }}
                  >
                    <TextField
                      value={cell.value || ""}
                      onChange={(e) =>
                        handleInputChange(e.target.value, rowIndex, cell.column.id as keyof TableData)
                      }
                      size="small"
                    />
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <Button variant="contained" onClick={addRow} startIcon={<AddIcon />} sx={{ marginTop: 2 }}>
        행 추가
      </Button>
    </Box>
  );
};

export default DynamicTable;
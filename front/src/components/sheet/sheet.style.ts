import styled from '@emotion/styled'

export const excel_container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`
export const excel_table = styled.table`
    border-collapse: collapse;
    margin-bottom: 20px;
`
export const excel_table_th = styled.th`
    border: 1px solid #ccc;
    padding: 5px;
    text-align: center;
    min-width: 50px;
    max-width: 100px;
`
export const excel_table_td = styled.td`
    border: 1px solid #ccc;
    padding: 5px;
    text-align: center;
    min-width: 50px;
    max-width: 100px;
`

export const excel_table_input = styled.input`
    border: none;
    width: 100%;
    text-align: center;
`
export const controls_button = styled.button`
    margin: 5px;
    padding: 10px;
    cursor: pointer;
`
  
export const context_menu = styled.ul`
  position: absolute;
  background: white;
  border: 1px solid #ccc;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  list-style: none;
  padding: 5px 0;
  margin: 0;
  z-index: 1000;
  width: 150px;
  font-size: 14px;
`;

export const context_menu_item = styled.li`
  padding: 8px 12px;
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background: #f0f0f0;
  }
`;

export const create_button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 5px 10px;
  margin: 5px;
  cursor: pointer;
  border-radius: 3px;
  width:80px;

  &:hover {
    background-color: #0056b3;
  }
`;

export const ContextMenu = styled.div`
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    z-index: 1000;
    padding: 8px;
`;

export const ContextMenuItem = styled.div`
    padding: 8px 12px;
    cursor: pointer;

    &:hover {
        background-color: #f0f0f0;
    }
`;

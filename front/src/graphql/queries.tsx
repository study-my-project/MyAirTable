import { gql } from "@apollo/client";
export const GET_WORKSPACE_BASES = gql`
    query GetBasesByWorkspaceId($workspaceId: ID!) {
      getBasesByWorkspaceId(workspaceId: $workspaceId) {
      id
      baseName
      createdAt
      updatedAt
    }
  }
`
export const GET_All_WORKSPACES = gql`
  query {
    getAllWorkspaces {
      id
      workspaceName
      createdAt
      updatedAt
    }
  }
`;

// 워크스페이스 만들기
export const CREATE_WORKSPACE = gql`
mutation CreateWorkspace($workspaceName: String!) {
    createWorkspace(workspaceCreateRequestDto: { workspaceName: $workspaceName }) {
        id
        workspaceName
        createdAt
        updatedAt
    }
}
`

export const GET_BASE_TABLES = gql`
query GetTablesByBaseId($baseId:ID!) {
    getTablesByBaseId(baseId: $baseId) {
        id
        baseId
        tableName
        createdAt
        updatedAt
    }
}

`

export const GET_TABLE_DETAILS = gql`
query GetTableDetailsById($tableId:ID!) {
    getTableDetailsById(tableId: $tableId) {
        fields {
            id
            tableId
            fieldName
            type
            options
            createdAt
            updatedAt
        }
        records {
            id
            tableId
            createdAt
            updatedAt
        }
        cellValues {
            id
            fieldId
            recordId
            value
            createdAt
            updatedAt
        }
    }
}

`

// 값 입력하기 
export const CREATE_CELL_VALUE = gql`
mutation CreateCellValue ($fieldId:ID!, $recordId:ID!,$value:String! ){
    createCellValue(
        cellValueCreateRequestDto: { fieldId: $fieldId, recordId: $recordId, value: $value }
    ) {
        id
        fieldId
        recordId
        value
        createdAt
        updatedAt
    }
}

`

// 값 수정하기
export const UPDATE_CELL_VALUE = gql`
mutation UpdateCellValue  ($fieldId:ID!, $recordId:ID!,$value:String! ){
    updateCellValue(
        cellValueUpdateRequestDto: { recordId: $recordId, fieldId: $fieldId, value: $value }
    ) {
        id
        fieldId
        recordId
        value
        createdAt
        updatedAt
    }
}

`
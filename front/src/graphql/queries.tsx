import { gql } from "@apollo/client";
// 모든 워크스페이스 읽어오기 
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

// 워크스페이스의 base들 이름 가져오기
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

// 워크스페이스 수정하기
export const UPDATE_WORKSPACE = gql`
    mutation UpdateWorkspace ($id: ID! ,$workspaceName: String! ) {
    updateWorkspace(workspaceUpdateRequestDto: { id: $id, workspaceName: $workspaceName }) {
        id
        workspaceName
        createdAt
        updatedAt
    }
}
`

// 워크스페이스 삭제하기
export const DELETE_WORKSPACE = gql`
    mutation DeleteWorkspace($workspaceId: ID!)  {
    deleteWorkspace(workspaceId: $workspaceId )
}
`

// 베이스 생성하기
export const CREATE_BASE = gql`
mutation CreateBase ($workspaceId:ID!, $baseName:String!){
    createBase(baseCreateRequestDto: { workspaceId: $workspaceId, baseName: $baseName }) {
        id
        workspaceId
        baseName
        createdAt
        updatedAt
    }
}

`

// 베이스 수정하기 ( 이름, 다른 워크스페이스로 이동)
export const UPDATE_BASE = gql`
    mutation UpdateBase ($id: ID!,$workspaceId:ID,$baseName:String ) {
    updateBase(
        baseUpdateRequestDto: { id: $id, workspaceId: $workspaceId, baseName: $baseName }
    ) {
        id
        workspaceId
        baseName
        createdAt
        updatedAt
    }
}
`

// 베이스 삭제하기
export const DELETE_BASE = gql`
    mutation DeleteBase($baseId: ID!) {
    deleteBase(baseId: $baseId)
}

`

// 베이스의 테이블들을 가져옴
export const GET_BASE_TABLES = gql`
query GetTablesByBaseId($baseId: ID!) {
    getTablesByBaseId(baseId: $baseId) {
        id
        baseId
        tableName
        createdAt
        updatedAt
    }
}

`
// 테이블 생성
export const CREATE_TABLE = gql`
    mutation CreateTable($baseId: ID!,$tableName: String! ) {
    createTable(tableCreateRequestDto: { baseId: $baseId, tableName: $tableName }) {
        id
        baseId
        tableName
        createdAt
        updatedAt
    }
}

`

// // 테이블 수정
export const UPDATE_TABLE = gql`
    mutation UpdateTable ($id: ID! , $tableName: String!) {
    updateTable(tableUpdateRequestDto: { id: $id, tableName: $tableName }) {
        id
        baseId
        tableName
        createdAt
        updatedAt
    }
}

`
// // 테이블 삭제
export const DELETE_TABLE = gql`
    mutation DeleteTable($tableId:ID!) {
    deleteTable(tableId: $tableId)
}

`
// 필드 생성
export const CREATE_FIELD = gql`
    mutation CreateField ($tableId:ID!, $fieldName:String!, $type:String!, $options:String! ) {
    createField(
        fieldCreateRequestDto: { tableId: $tableId, fieldName: $fieldName, type: $type, options: $options }
    ) {
        id
        tableId
        fieldName
        type
        options
        createdAt
        updatedAt
    }
}

`

// 레코드 생성
export const CREATE_RECORD = gql`
    mutation CreateRecord ($tableId:ID!){
    createRecord(recordCreateRequestDto: { tableId: $tableId }) {
        id
        tableId
        createdAt
        updatedAt
    }
}

`




// 테이블의 상세 내용을 가져옴
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
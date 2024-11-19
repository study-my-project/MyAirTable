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
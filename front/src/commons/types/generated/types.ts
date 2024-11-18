export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Mutation = {
  __typename?: 'Mutation';
  /**  Workspace 생성 */
  createWorkspace: Workspace;
  /**  Workspace 삭제 (논리 삭제) */
  deleteWorkspace: Scalars['Boolean']['output'];
  /**  Workspace 업데이트 */
  updateWorkspace: Workspace;
};


export type MutationCreateWorkspaceArgs = {
  workspaceCreateRequestDto: WorkspaceCreateRequestDto;
};


export type MutationDeleteWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateWorkspaceArgs = {
  requestDto: WorkspaceUpdateRequestDto;
};

export type Query = {
  __typename?: 'Query';
  /**  모든 Workspace 조회 */
  getAllWorkspaces: Array<Workspace>;
  /**  특정 Workspace 조회 */
  getWorkspace?: Maybe<Workspace>;
};


export type QueryGetWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};

export type Workspace = {
  __typename?: 'Workspace';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  workspaceName: Scalars['String']['output'];
};

export type WorkspaceCreateRequestDto = {
  /**  요청 필드 정의 */
  workspaceName: Scalars['String']['input'];
};

export type WorkspaceUpdateRequestDto = {
  /**  요청 필드 정의 */
  id: Scalars['ID']['input'];
  workspaceName: Scalars['String']['input'];
};

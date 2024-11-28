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

export type Base = {
  __typename?: 'Base';
  baseName: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  workspaceId: Scalars['ID']['output'];
};

export type BaseCreateRequestDto = {
  baseName: Scalars['String']['input'];
  workspaceId: Scalars['ID']['input'];
};

export type BaseUpdateRequestDto = {
  baseName?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  workspaceId?: InputMaybe<Scalars['ID']['input']>;
};

export type CellValue = {
  __typename?: 'CellValue';
  createdAt?: Maybe<Scalars['String']['output']>;
  fieldId: Scalars['ID']['output'];
  id: Scalars['ID']['output'];
  recordId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
  value: Scalars['String']['output'];
};

export type CellValueCreateRequestDto = {
  fieldId: Scalars['ID']['input'];
  recordId: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};

export type CellValueReadRequestDto = {
  fieldId: Scalars['ID']['input'];
  recordId: Scalars['ID']['input'];
};

export type CellValueUpdateRequestDto = {
  fieldId: Scalars['ID']['input'];
  recordId: Scalars['ID']['input'];
  value: Scalars['String']['input'];
};

export type Field = {
  __typename?: 'Field';
  createdAt?: Maybe<Scalars['String']['output']>;
  fieldIndex: Scalars['Int']['output'];
  fieldName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  options: Scalars['String']['output'];
  tableId: Scalars['ID']['output'];
  type: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type FieldCreateRequestDto = {
  fieldName: Scalars['String']['input'];
  options: Scalars['String']['input'];
  tableId: Scalars['ID']['input'];
  type: Scalars['String']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /**  Base 생성 */
  createBase: Base;
  /**  CellValue 생성 */
  createCellValue: CellValue;
  /**  필드 생성 */
  createField: Field;
  /**  레코드 생성 */
  createRecord: Record;
  /**  테이블 생성 */
  createTable: Table;
  /**  Workspace 생성 */
  createWorkspace: Workspace;
  /**  Base 삭제 */
  deleteBase: Scalars['Boolean']['output'];
  /**  테이블 삭제 */
  deleteTable: Scalars['Boolean']['output'];
  /**  Workspace 삭제 (논리 삭제) */
  deleteWorkspace: Scalars['Boolean']['output'];
  /**  Base 업데이트 */
  updateBase: Base;
  /**  CellValue 수정 */
  updateCellValue: CellValue;
  /**  테이블 업데이트 */
  updateTable: Table;
  /**  Workspace 업데이트 */
  updateWorkspace: Workspace;
};


export type MutationCreateBaseArgs = {
  baseCreateRequestDto: BaseCreateRequestDto;
};


export type MutationCreateCellValueArgs = {
  cellValueCreateRequestDto: CellValueCreateRequestDto;
};


export type MutationCreateFieldArgs = {
  fieldCreateRequestDto: FieldCreateRequestDto;
};


export type MutationCreateRecordArgs = {
  recordCreateRequestDto: RecordCreateRequestDto;
};


export type MutationCreateTableArgs = {
  tableCreateRequestDto: TableCreateRequestDto;
};


export type MutationCreateWorkspaceArgs = {
  workspaceCreateRequestDto: WorkspaceCreateRequestDto;
};


export type MutationDeleteBaseArgs = {
  baseId: Scalars['ID']['input'];
};


export type MutationDeleteTableArgs = {
  tableId: Scalars['ID']['input'];
};


export type MutationDeleteWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type MutationUpdateBaseArgs = {
  baseUpdateRequestDto: BaseUpdateRequestDto;
};


export type MutationUpdateCellValueArgs = {
  cellValueUpdateRequestDto: CellValueUpdateRequestDto;
};


export type MutationUpdateTableArgs = {
  tableUpdateRequestDto: TableUpdateRequestDto;
};


export type MutationUpdateWorkspaceArgs = {
  workspaceUpdateRequestDto: WorkspaceUpdateRequestDto;
};

export type Query = {
  __typename?: 'Query';
  /**  모든 Workspace 조회 */
  getAllWorkspaces: Array<Workspace>;
  /**  특정 Base 를 조회 */
  getBaseById: Base;
  /**  특정 Workspace 의 모든 base 를 조회 */
  getBasesByWorkspaceId: Array<Base>;
  /**  해당 필드 레코드에 맞는 CellValue 보기 */
  getCellValue: CellValue;
  /**  해당 테이블의 Field 목록으로 보기 */
  getFieldsByTableId: Array<Field>;
  /**  해당 테이블의 Record 목록으로 보기 */
  getRecordsByTableId: Array<Record>;
  /**  특정 테이블 상세 조회 */
  getTableDetailsById: TableDetailsResponseDto;
  /**  특정 Base 의 테이블 전체 조회 */
  getTablesByBaseId: Array<Table>;
  /**  특정 Workspace 조회 */
  getWorkspace?: Maybe<Workspace>;
};


export type QueryGetBaseByIdArgs = {
  baseId: Scalars['ID']['input'];
};


export type QueryGetBasesByWorkspaceIdArgs = {
  workspaceId: Scalars['ID']['input'];
};


export type QueryGetCellValueArgs = {
  cellValueReadRequestDto: CellValueReadRequestDto;
};


export type QueryGetFieldsByTableIdArgs = {
  tableId: Scalars['ID']['input'];
};


export type QueryGetRecordsByTableIdArgs = {
  tableId: Scalars['ID']['input'];
};


export type QueryGetTableDetailsByIdArgs = {
  tableId: Scalars['ID']['input'];
};


export type QueryGetTablesByBaseIdArgs = {
  baseId: Scalars['ID']['input'];
};


export type QueryGetWorkspaceArgs = {
  workspaceId: Scalars['ID']['input'];
};

export type Record = {
  __typename?: 'Record';
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  recordIndex: Scalars['Int']['output'];
  tableId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type RecordCreateRequestDto = {
  tableId: Scalars['ID']['input'];
};

export type Table = {
  __typename?: 'Table';
  baseId: Scalars['ID']['output'];
  createdAt?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  tableName: Scalars['String']['output'];
  updatedAt?: Maybe<Scalars['String']['output']>;
};

export type TableCreateRequestDto = {
  baseId: Scalars['ID']['input'];
  tableName: Scalars['String']['input'];
};

export type TableDetailsResponseDto = {
  __typename?: 'TableDetailsResponseDto';
  cellValues: Array<CellValue>;
  fields: Array<Field>;
  records: Array<Record>;
};

export type TableUpdateRequestDto = {
  id: Scalars['ID']['input'];
  tableName: Scalars['String']['input'];
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

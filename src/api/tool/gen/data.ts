export interface Column {
  createDept?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  columnId: string;
  tableId: string;
  columnName: string;
  columnComment: string;
  columnType: string;
  javaType: string;
  javaField: string;
  isPk: string;
  isIncrement: string;
  isRequired: string;
  isInsert?: any;
  isEdit: string;
  isList: string;
  isQuery?: any;
  queryType: string;
  htmlType: string;
  dictType: string;
  sort: number;
  list: boolean;
  required: boolean;
  pk: boolean;
  insert: boolean;
  edit: boolean;
  usableColumn: boolean;
  superColumn: boolean;
  increment: boolean;
  query: boolean;
  capJavaField: string;
}

export interface Table {
  createDept?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  tableId: string;
  dataName: string;
  tableName: string;
  tableComment: string;
  subTableName?: any;
  subTableFkName?: any;
  className: string;
  tplCategory: string;
  packageName: string;
  moduleName: string;
  businessName: string;
  functionName: string;
  functionAuthor: string;
  genType?: any;
  genPath?: any;
  pkColumn?: any;
  columns: Column[];
  options?: any;
  remark?: any;
  treeCode?: any;
  treeParentCode?: any;
  treeName?: any;
  menuIds?: any;
  parentMenuId?: any;
  parentMenuName?: any;
  tree: boolean;
  crud: boolean;
}

export interface Row {
  createDept: number;
  createBy: number;
  createTime: string;
  updateBy: number;
  updateTime: string;
  columnId: string;
  tableId: string;
  columnName: string;
  columnComment: string;
  columnType: string;
  javaType: string;
  javaField: string;
  isPk: string;
  isIncrement: string;
  isRequired: string;
  isInsert?: any;
  isEdit: string;
  isList: string;
  isQuery?: any;
  queryType: string;
  htmlType: string;
  dictType: string;
  sort: number;
  list: boolean;
  required: boolean;
  pk: boolean;
  insert: boolean;
  edit: boolean;
  usableColumn: boolean;
  superColumn: boolean;
  increment: boolean;
  query: boolean;
  capJavaField: string;
}

export interface Column {
  createDept?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  columnId: string;
  tableId: string;
  columnName: string;
  columnComment: string;
  columnType: string;
  javaType: string;
  javaField: string;
  isPk: string;
  isIncrement: string;
  isRequired: string;
  isInsert?: any;
  isEdit: string;
  isList: string;
  isQuery?: any;
  queryType: string;
  htmlType: string;
  dictType: string;
  sort: number;
  list: boolean;
  required: boolean;
  pk: boolean;
  insert: boolean;
  edit: boolean;
  usableColumn: boolean;
  superColumn: boolean;
  increment: boolean;
  query: boolean;
  capJavaField: string;
  editable?: boolean;
}

export interface Info {
  createDept?: any;
  createBy?: any;
  createTime?: any;
  updateBy?: any;
  updateTime?: any;
  tableId: string;
  dataName: string;
  tableName: string;
  tableComment: string;
  subTableName?: any;
  subTableFkName?: any;
  className: string;
  tplCategory: string;
  packageName: string;
  moduleName: string;
  businessName: string;
  functionName: string;
  functionAuthor: string;
  genType: string;
  genPath: string;
  pkColumn?: any;
  columns: Column[];
  options?: any;
  remark?: any;
  treeCode?: any;
  treeParentCode?: any;
  treeName?: any;
  menuIds?: any;
  parentMenuId?: any;
  parentMenuName?: any;
  tree: boolean;
  crud: boolean;
  // 树表需要添加此属性
  params?: any;
}

export interface GenInfo {
  tables: Table[];
  rows: Row[];
  info: Info;
}

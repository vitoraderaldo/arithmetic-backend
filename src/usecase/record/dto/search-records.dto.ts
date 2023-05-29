export interface RecordFilterOptions {
  identityProviderId: string;
  operationId: number;
  startDate: Date;
  endDate: Date;
}

interface RecordPagination {
  page: number;
  pageSize: number;
}

export interface SearchRecordsInputDto {
  filter: RecordFilterOptions;
  pagination: RecordPagination;
  sort: {
    field:
      | 'operationId'
      | 'amount'
      | 'userBalance'
      | 'operationResponse'
      | 'dateCreated';
    order: 'asc' | 'desc';
  };
}

export interface SearchRecordOutput {
  id: string;
  operationName: string;
  amount: number;
  userBalance: number;
  operationResponse: string;
  date: Date;
}

export interface SearchRecordsOutputDto {
  records: SearchRecordOutput[];
  pagination: {
    page: number;
    pageSize: number;
    pageTotal: number;
    total: number;
  };
}

export interface RecordFilterOptions {
  identityProviderId: string
  operationId: number;
  startDate: Date;
  endDate: Date;
}

interface RecordPagination {
  page: number;
  pageSize: number;
}

export interface SearchRecordsInputDto {
  filter: RecordFilterOptions
  pagination: RecordPagination
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
  records: SearchRecordOutput[]
  pagination: {
    page: number;
    pageSize: number;
    pageTotal: number;
    total: number;
  }
}

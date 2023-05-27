export interface RecordSearchRepositoryDto {
  filter: {
    userId: number;
    operationId: number;
    startDate: Date;
    endDate: Date;
  },
  pagination: {
    page: number;
    pageSize: number;
  }
  sort: {
    field: 'dateCreated';
    order: 'ASC' | 'DESC';
  }
}

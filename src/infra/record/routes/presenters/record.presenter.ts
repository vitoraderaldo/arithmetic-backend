import { toXML } from 'jstoxml';
import { SearchRecordsOutputDto } from '../../../../usecase/record/dto/search-records.dto';

export class RecordsPresenter {
  static toXml(data: SearchRecordsOutputDto): string {
    const options = {
      header: true,
      indent: '  ',
      newline: '\n',
      allowEmpty: true,
    };

    return toXML(
      {
        records: data.records.map((record) => {
          return {
            record: {
              ...record,
              operationResponse: record.operationResponse.replace(/\n/g, ''),
              date: record.date.toISOString(),
            },
          };
        }),
        pagination: {
          page: data.pagination.page,
          pageSize: data.pagination.pageSize,
          pageTotal: data.pagination.pageTotal,
          total: data.pagination.total,
        },
      },
      options,
    );
  }
}

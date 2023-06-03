import { SearchRecordsOutputDto } from '../../../../usecase/record/dto/search-records.dto';
import { RecordsPresenter } from './record.presenter';

describe('Record Presenter', () => {
  const recordsSearch: SearchRecordsOutputDto = {
    records: [
      {
        id: '123',
        operationName: 'Addition',
        amount: 1.1,
        userBalance: 3.1,
        operationResponse: '5',
        date: new Date('2022-01-01T00:00:00.000Z'),
      },
    ],
    pagination: {
      page: 1,
      pageSize: 1,
      pageTotal: 1,
      total: 1,
    },
  };

  it('must convert a list of objects to XML', () => {
    const response = RecordsPresenter.toXml(recordsSearch);
    expect(response).toContain('<records>');
    expect(response).toContain('<record>');
    expect(response).toContain('<id>123</id>');
    expect(response).toContain('<operationName>Addition</operationName>');
    expect(response).toContain('<amount>1.1</amount>');
    expect(response).toContain('<userBalance>3.1</userBalance>');
    expect(response).toContain('<operationResponse>5</operationResponse>');
    expect(response).toContain('<date>2022-01-01T00:00:00.000Z</date>');
    expect(response).toContain('</record>');
    expect(response).toContain('</record>');
  });
});

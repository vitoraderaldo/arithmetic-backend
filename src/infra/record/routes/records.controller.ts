import {
  Controller,
  Delete,
  Get,
  Param,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { AuthGuard } from '../../guards/auth.guard';
import { SearchRecordsUseCase } from '../../../usecase/record/serch-records.usecase';
import { SearchRecordsRequest } from './requests/search-records.request';
import { IdentityProviderId } from '../../guards/identity-provider-id.decorator';
import { DeleteRecordUseCase } from '../../../usecase/record/delete-record.usecase';
import { DeleteRecordOutputDto } from '../../../usecase/record/dto/delete-record.dto';
import { RecordsPresenter } from './presenters/record.presenter';

@UseGuards(AuthGuard)
@Controller('/records')
export class RecordsController {
  constructor(
    private readonly searchRecordsUseCase: SearchRecordsUseCase,
    private readonly deleteRecordUseCase: DeleteRecordUseCase,
  ) {}

  @Get('/')
  public async searchRecords(
    @Query() params: SearchRecordsRequest,
    @IdentityProviderId() identityProviderId: string,
    @Res() response: Response,
  ): Promise<void> {
    const result = await this.searchRecordsUseCase.execute({
      filter: {
        identityProviderId,
        operationId: params.operationId,
        startDate: params.startDate,
        endDate: params.endDate,
      },
      sort: {
        field: params.sortBy,
        order: params.sortDirection,
      },
      pagination: {
        page: params.page,
        pageSize: params.pageSize,
      },
    });

    response.format({
      json: () => response.json(result),
      xml: () => response.send(RecordsPresenter.toXml(result)),
    });
  }

  @Delete('/:recordId')
  public deleteRecord(
    @IdentityProviderId() identityProviderId: string,
    @Param('recordId') recordId: string,
  ): Promise<DeleteRecordOutputDto> {
    return this.deleteRecordUseCase.execute({
      identityProviderId,
      recordId,
    });
  }
}

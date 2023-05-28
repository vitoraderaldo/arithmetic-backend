import { Controller, Delete, Get, Param, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";
import { SearchRecordsUseCase } from "../../../usecase/record/serch-records.usecase";
import { SearchRecordsRequest } from "./requests/search-records.request";
import { SearchRecordsOutputDto } from "../../../usecase/record/dto/search-records.dto";
import { IdentityProviderId } from "../../guards/identity-provider-id.decorator";
import { DeleteRecordUseCase } from "../../../usecase/record/delete-record.usecase";
import { DeleteRecordOutputDto } from "../../../usecase/record/dto/delete-record.dto";

@UseGuards(AuthGuard)
@Controller('/records')
export class RecordsController {
  constructor(
    private readonly searchRecordsUseCase: SearchRecordsUseCase,
    private readonly deleteRecordUseCase: DeleteRecordUseCase,
  ) {}

  @Get('/')
  public searchRecords(
    @Query() params: SearchRecordsRequest,
    @IdentityProviderId() identityProviderId: string
  ): Promise<SearchRecordsOutputDto> {
    return this.searchRecordsUseCase.execute({
      filter: {
        identityProviderId,
        operationId: params.operationId,
        startDate: params.startDate,
        endDate: params.endDate,
      },
      pagination: {
        page: params.page,
        pageSize: params.pageSize,
      }
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

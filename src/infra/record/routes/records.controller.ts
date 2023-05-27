import { Controller, Get, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "../../guards/auth.guard";
import { SearchRecordsUseCase } from "../../../usecase/record/serch-records.usecase";
import { SearchRecordsRequest } from "./requests/search-records.request";
import { SearchRecordsOutputDto } from "../../../usecase/record/dto/search-records.dto";
import { IdentityProviderId } from "../../guards/identity-provider-id.decorator";

@UseGuards(AuthGuard)
@Controller('/records')
export class RecordsController {
  constructor(
    private readonly searchRecordsUseCase: SearchRecordsUseCase,
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

}

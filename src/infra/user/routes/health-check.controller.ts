import { Controller, Get } from '@nestjs/common';

@Controller('/')
export class HealthCheckController {
  @Get()
  public healthCheck() {
    return 'Hello World!';
  }
}

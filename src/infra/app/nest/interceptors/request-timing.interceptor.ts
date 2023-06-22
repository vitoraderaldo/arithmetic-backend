import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { tap } from 'rxjs/operators';
import { PromClientInterface } from '../../../prometheus/interfaces/metrics/prom-client.interface';
import { PromMetricNameEnum } from '../../../prometheus/interfaces/metrics/prom-metric-name.enum';
import { PromRegisterName } from '../../../prometheus/interfaces/metrics/prom-registry-name';

@Injectable()
export class RequestTimeInterceptor implements NestInterceptor {
  constructor(private readonly promClient: PromClientInterface) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const route = request.route.path;
    const method = request.method;

    const endTimer = this.promClient.startHistogramTimer({
      metricName: PromMetricNameEnum.REQUEST_TIME_DURATION,
      registerName: PromRegisterName.TECHNICAL,
      labels: { route, method },
    });

    return next.handle().pipe(
      tap(() => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode;
        endTimer({ statusCode });
      }),
    );
  }
}

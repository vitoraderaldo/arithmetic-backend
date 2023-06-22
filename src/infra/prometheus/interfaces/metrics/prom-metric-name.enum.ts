const METRIC_PREFIX = 'app_calculator';

export enum PromMetricNameEnum {
  // Business metrics
  CALCULATION_TOTAL = `${METRIC_PREFIX}_calculation_total`,
  DELETED_RECORDS_TOTAL = `${METRIC_PREFIX}_deleted_records_total`,

  // Technical metrics
  REQUEST_TIME_DURATION = `${METRIC_PREFIX}_request_time_duration`,
}

import {
  Injectable,
  LoggerService,
} from '@nestjs/common'

@Injectable()
export class AppLogger implements LoggerService {
  log(message: any, traceId?: string) {
    console.log(this.format('LOG', message, traceId))
  }

  error(message: any, trace?: string, traceId?: string) {
    console.error(this.format('ERROR', message, traceId, trace))
  }

  warn(message: any, traceId?: string) {
    console.warn(this.format('WARN', message, traceId))
  }

  private format(level: string, message: any, traceId?: string, trace?: string) {
    return JSON.stringify({
      level,
      message,
      trace,
      traceId,
      timestamp: new Date().toISOString(),
    })
  }
}
import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import {
  tap,
  Observable,
} from 'rxjs'
import { AppLogger } from './logger.service'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private logger: AppLogger) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const now = Date.now()
    const req = context.switchToHttp().getRequest()
    const res = context.switchToHttp().getResponse()
    const traceId = req.traceId

    return next.handle().pipe(
      tap(() =>
        this.logger.log(
          {
            method: req.method,
            url: req.url,
            status: res.statusCode,
            duration: Date.now() - now,
          },
          traceId,
        )
      ),
    )
  }
}
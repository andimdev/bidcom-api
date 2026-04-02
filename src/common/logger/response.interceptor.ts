import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common'
import { map } from 'rxjs'

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler) {
    const req = context.switchToHttp().getRequest()

    return next.handle().pipe(
      map((data) => ({
        traceId: req.traceId,
        data,
      })),
    )
  }
}
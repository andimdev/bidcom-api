import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common'
import { DomainError } from '@domain/errors/domain.error'

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    const request = ctx.getRequest()
    const traceId = request.headers['x-trace-id']

    if (exception instanceof DomainError) {
      return response.status(exception.statusCode).json({
        statusCode: exception.statusCode,
        code: exception.code,
        message: exception.message,
        traceId,
      })
    }

    if (exception instanceof HttpException) {
      const status = exception.getStatus()

      return response.status(status).json({
        statusCode: status,
        message: exception.message,
        traceId,
      })
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: 500,
      message: 'Internal server error',
      traceId,
    })
  }
}
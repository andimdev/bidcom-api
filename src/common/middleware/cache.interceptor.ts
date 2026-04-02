import {
  Injectable,
  ExecutionContext,
} from '@nestjs/common'
import { CacheInterceptor } from '@nestjs/cache-manager'

@Injectable()
export class CustomCacheInterceptor extends CacheInterceptor {
  trackBy(context: ExecutionContext): string | undefined {
    const req = context.switchToHttp().getRequest()

    if (req.method !== 'GET') return undefined

    return `${req.url}`
  }
}
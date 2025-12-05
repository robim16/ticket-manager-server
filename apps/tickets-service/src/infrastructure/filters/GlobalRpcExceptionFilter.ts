import { Catch, RpcExceptionFilter, ArgumentsHost } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class GlobalRpcExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
 
    console.error('Caught RPC Exception:', exception.getError());

    const error = exception.getError();
    return throwError(() => ({
      status: 'error',
      message: error instanceof Object ? (error as any).message : error,
      timestamp: new Date().toISOString(),
    }));
  }
}
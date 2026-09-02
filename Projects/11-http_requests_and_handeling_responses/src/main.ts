import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpEventType, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';
import { tap } from 'rxjs';

function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn)  {
  // const clone = request.clone(
  //   {
  //     headers: request.headers.set('X-Custom-Header', 'MyCustomHeaderValue')
  //   });
  //   console.log('Outgoing request:', clone);
  // return next(clone);
  return next(request).pipe(
    tap({
      next: event => {
        if(event.type == HttpEventType.Response) {
          console.log('Incoming response:', event);
        }
      },
      error: (error) => {
        console.error('Error response:', error);
      }
    })
  )

}

bootstrapApplication(AppComponent, {
  providers: [provideHttpClient(
    withInterceptors([loggingInterceptor])
  )],
}).catch((err) => console.error(err));

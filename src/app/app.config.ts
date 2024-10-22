import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { BlogService } from './services/blog.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), BlogService],
};

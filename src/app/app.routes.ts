import { Routes } from '@angular/router';

import { BlogComponent } from './components/blog/blog.component';
import { BlogFormComponent } from './components/blog-form/blog-form.component';

export const routes: Routes = [
  { path: '', component: BlogComponent },
  { path: 'create', component: BlogFormComponent },
  { path: 'edit/:blogId', component: BlogFormComponent },
];

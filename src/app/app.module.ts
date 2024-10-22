import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { BlogComponent } from './components/blog/blog.component';
import { AppRoutingModule } from './app-routing.module';
import { BlogFormComponent } from './components/blog-form/blog-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LoadSpinnerComponent } from './components/load-spinner/load-spinner.component';
@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    BlogFormComponent,
    LoadSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

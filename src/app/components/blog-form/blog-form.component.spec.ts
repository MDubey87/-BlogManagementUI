import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlogFormComponent } from './blog-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';
import { BlogService } from '../../services/blog.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('BlogFormComponent', () => {
  let component: BlogFormComponent;
  let fixture: ComponentFixture<BlogFormComponent>;
  const mockBlogServcie = {
    createBlog: () => {
      return of('');
    },
    updateBlog: () => {
      return of('');
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogFormComponent],
      imports: [ReactiveFormsModule],
      providers: [{ provide: BlogService, useValue: mockBlogServcie }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

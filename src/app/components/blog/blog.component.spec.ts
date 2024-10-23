import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogComponent } from './blog.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { PaginationComponent } from '../pagination/pagination.component';
import { LoadSpinnerComponent } from '../load-spinner/load-spinner.component';
import { of } from 'rxjs';
import { IBlog } from '../../models/blog.model';
import { BlogService } from '../../services/blog.service';

describe('BlogComponent', () => {
  let component: BlogComponent;
  let fixture: ComponentFixture<BlogComponent>;
  const mockBlogServcie = {
    getAllBlogs: () => {
      return of([] as Array<IBlog>);
    },
    deleteBlog: () => {
      return of('');
    },
  };
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BlogComponent, PaginationComponent, LoadSpinnerComponent],
      providers: [{ provide: BlogService, useValue: mockBlogServcie }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(BlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

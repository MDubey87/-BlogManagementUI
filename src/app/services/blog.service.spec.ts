import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { BlogService } from './blog.service';
import { IBlog } from '../models/blog.model';

describe('BlogService', () => {
  let service: BlogService;
  let httpClientSpy: jasmine.SpyObj<HttpClient>;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['get']);
    service = new BlogService(httpClientSpy);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  describe('getAllBlogs()', () => {
    it('should return list of blogs ', (done: DoneFn) => {
      const expectedBlogs: Array<IBlog> = [
        {
          id: '1',
          userName: 'Test',
          dateCreated: '22-10-2024',
          content: 'Test Content',
        },
      ];

      httpClientSpy.get.and.returnValue(of(expectedBlogs));

      service.getAllBlogs().subscribe({
        next: (response: Array<IBlog>) => {
          expect(response).not.toBeNull();
          expect(response.length).toBeGreaterThan(0);
          expect(response[0].id).toBe(expectedBlogs[0].id);
          done();
        },
      });
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
    it('should return errors', (done: DoneFn) => {
      const errorResponse = new HttpErrorResponse({
        error: 'test 404 error',
        status: 404,
        statusText: 'Not Found',
      });

      httpClientSpy.get.and.returnValue(throwError(() => errorResponse));

      service.getAllBlogs().subscribe({
        next: () => {
          done();
        },
        error: (error: any) => {
          expect(error.status).toBe(errorResponse.status);
          done();
        },
      });
      expect(httpClientSpy.get.calls.count()).toBe(1);
    });
  });
});

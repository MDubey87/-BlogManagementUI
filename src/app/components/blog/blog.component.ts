import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { IBlog } from '../../models/blog.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css',
})
export class BlogComponent implements OnInit {
  blogs!: Array<IBlog>;
  showErrorMessage = false;
  showSpinner = false;
  constructor(
    private blogService: BlogService,
    private _cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadBlogs();
  }

  loadBlogs(): void {
    this.showSpinner = true;
    this.blogService.getAllBlogs().subscribe({
      next: (blogs: Array<IBlog>) => {
        this.blogs = blogs;
        this.showErrorMessage = false;
        this.showSpinner = false;
      },
      error: () => {
        this.showSpinner = false;
        this.showErrorMessage = true;
      },
    });
  }

  onDelete(blogId: string): void {
    this.showSpinner = true;
    this.blogService.deleteBlog(blogId).subscribe({
      next: () => {
        this.showErrorMessage = false;
        this.blogs = this.blogs.filter((blog) => blog.id !== blogId);
        this.showSpinner = false;
      },
      error: (error: any) => {
        this.showSpinner = false;
        this.showErrorMessage = true;
      },
    });
  }
}

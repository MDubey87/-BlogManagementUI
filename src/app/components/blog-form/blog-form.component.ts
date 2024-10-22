import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlogService } from '../../services/blog.service';
import { IBlog } from '../../models/blog.model';

@Component({
  selector: 'app-blog-form',
  templateUrl: './blog-form.component.html',
  styleUrl: './blog-form.component.css',
})
export class BlogFormComponent implements OnInit {
  @Input() blogId: string = '';
  form!: FormGroup;
  submitted = false;
  showErrorMessage = false;
  showSuccessMessage = false;
  showSpinner = false;
  constructor(
    private formBuilder: FormBuilder,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: ['', [Validators.required]],
      content: ['', [Validators.required]],
      date: ['', [Validators.required]],
    });
    if (!!this.blogId) {
      this.loadBlogById();
    }
  }
  // convenience getter for easy access to form fields
  get formControls() {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    const blog = {
      userName: this.formControls['userName'].value,
      dateCreated: this.formControls['date'].value,
      content: this.formControls['content'].value,
    } as IBlog;
    if (!!this.blogId) {
      this.updateBlog(this.blogId, blog);
    } else {
      this.createBlog(blog);
    }
  }

  onReset(): void {
    this.submitted = false;
    this.form.reset();
  }

  loadBlogById(): void {
    this.showSpinner = true;
    this.blogService.getBlogById(this.blogId).subscribe({
      next: (blog: IBlog) => {
        this.formControls['userName'].setValue(blog.userName);
        this.formControls['date'].setValue(blog.dateCreated);
        this.formControls['content'].setValue(blog.content);
        this.form.updateValueAndValidity();
        this.showSpinner = false;
        this.showErrorMessage = false;
      },
      error: () => {
        this.showSpinner = false;
        this.showErrorMessage = true;
      },
    });
  }

  createBlog(newBlog: IBlog): void {
    this.showSpinner = true;
    this.blogService.createBlog(newBlog).subscribe({
      next: () => {
        this.showSpinner = false;
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
      },
      error: () => {
        this.showSpinner = false;
        this.showSuccessMessage = false;
        this.showErrorMessage = true;
      },
    });
  }

  updateBlog(blogId: string, newBlog: IBlog): void {
    this.showSpinner = true;
    this.blogService.updateBlog(blogId, newBlog).subscribe({
      next: () => {
        this.showSpinner = false;
        this.showSuccessMessage = true;
        this.showErrorMessage = false;
      },
      error: () => {
        this.showSpinner = false;
        this.showSuccessMessage = false;
        this.showErrorMessage = true;
      },
    });
  }
}

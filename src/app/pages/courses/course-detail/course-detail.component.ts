import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from 'src/app/shared/interfaces';
import { CourseService } from 'src/app/shared/services';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCourse();
  }

  getCourse(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.courseService
      .getCourse(id)
      .subscribe((course) => (this.course = course));
  }

  goBack(): void {
    this.location.back();
  }

  saveCourse(): void {
    if (this.course) {
      this.courseService
        .updateCourse(this.course)
        .subscribe(() => this.goBack());
    }
  }
}

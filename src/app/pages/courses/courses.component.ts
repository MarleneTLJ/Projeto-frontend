import { Component, OnInit } from '@angular/core';

import { Course } from 'src/app/shared/interfaces';
import { CourseService } from '../../shared/services';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.courseService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }
}

import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { Course } from 'src/app/shared/interfaces';
import { CourseService } from '../../shared/services';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(
    private courseService: CourseService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getCourses();
  }

  goBack(): void {
    this.location.back();
  }

  // Pega todos os cursos
  getCourses(): void {
    this.courseService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }

  // Deleta um curso
  deleteCourse(course: Course): void {
    this.courses = this.courses.filter((c) => c !== course);
    this.courseService.deleteCourse(course._id).subscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Course } from 'src/app/shared/interfaces';
import { CourseService } from 'src/app/shared/services';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss'],
})
export class CourseDetailComponent implements OnInit {
  course: Course | undefined;
  // id!: string;

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private location: Location
  ) {}

  // courseForm = new FormGroup({
  //   title: new FormControl('', [

  //     Validators.minLength(3),
  //     Validators.maxLength(255),
  //   ]),
  //   workload: new FormControl('', []),
  //   price: new FormControl('', []),
  //   description: new FormControl('', []),
  // });

  // get title(): AbstractControl {
  //   return this.courseForm.get('title')!;
  // }

  // get workload(): AbstractControl {
  //   return this.courseForm.get('workload')!;
  // }

  // get price(): AbstractControl {
  //   return this.courseForm.get('price')!;
  // }

  // get description(): AbstractControl {
  //   return this.courseForm.get('description')!;
  // }


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
      this.courseService.updateCourse(this.course).subscribe(() => this.goBack());
    }
  }
}

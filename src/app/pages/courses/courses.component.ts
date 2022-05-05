import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Course } from 'src/app/shared/interfaces';
import { CourseService } from '../../shared/services';
import { DialogInfoConf } from '../../dialogs/dialog-info/dialog-info.component';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private courseService: CourseService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.getCourses();
  }

  // Dialogo/modal de confirmação de exclusão do curso
  openDialog(course: Course) {
    const dialogRef = this.dialog.open(DialogInfoConf);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteCourse(course);
      }
    });
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

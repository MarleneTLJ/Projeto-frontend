import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCompra } from '../../dialogs/dialog-compra/dialog-compra.component';

import { Course } from 'src/app/shared/interfaces';
import { CourseService } from '../../shared/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})

export class HomeComponent implements OnInit {
  courses: Course[] = [];
  error: string | null = null;

  constructor(public dialog: MatDialog, private courseService: CourseService) {}

  ngOnInit(): void {
    this.getCourses();
  }

  getCourses() {
    this.courseService
      .getCourses()
      .subscribe({
        next: (courses) => (this.courses = courses),
        error: () => this.error = 'Sem conexão com o banco de dados!'
      });
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogCompra);

    dialogRef.afterClosed().subscribe();
  }
}

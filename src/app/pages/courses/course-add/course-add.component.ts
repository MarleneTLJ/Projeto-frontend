import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { CourseService } from 'src/app/shared/services';
import { DialogInfoSucesso } from 'src/app/dialogs/dialog-info/dialog-info.component';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
})
export class CourseAddComponent implements OnInit {
  error: string | null = null;

  constructor(
    private courseService: CourseService,
    private location: Location,
    public dialog: MatDialog,
    private router: Router,
  ) {}

  ngOnInit(): void {}

  // Form de validação para evitar que o usuário envie dados inválidos
  courseForm = new FormGroup({
    title: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(255),
    ]),
    workload: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    area: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  });

  get title(): AbstractControl {
    return this.courseForm.get('title')!;
  }

  get workload(): AbstractControl {
    return this.courseForm.get('workload')!;
  }

  get type(): AbstractControl {
    return this.courseForm.get('type')!;
  }

  get area(): AbstractControl {
    return this.courseForm.get('area')!;
  }

  get price(): AbstractControl {
    return this.courseForm.get('price')!;
  }

  goBack(): void {
    this.location.back();
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogInfoSucesso);

    dialogRef.afterClosed().subscribe();
  }

  // Adiciona um curso
  addCourse(): void {
    // Se estiver incorreto os dados que o usuário inseriu, ele retorna nada
    if (this.courseForm.invalid) {
      return;
    }

    const { title, workload, type, area, price } =
      this.courseForm.getRawValue();

    this.courseService
      .addCourse(title, workload, type, area, price)
      .subscribe({
        next: () => {
          this.openDialog();
          this.router.navigate(['courses']);
        },
        // Pega o erro para jogar na tela
        error: () => {
          this.error = 'Um erro ocorreu!';
        },
      });
  }
}

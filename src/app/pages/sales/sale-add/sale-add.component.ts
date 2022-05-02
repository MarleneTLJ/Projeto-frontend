import { Component, OnInit } from '@angular/core';
import {
  Validators,
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SaleService } from 'src/app/shared/services';
import { CourseService } from 'src/app/shared/services';
import { Course } from 'src/app/shared/interfaces';
import { Validacoes } from '../../clients/client-add/validacoes.component';
import { DialogInfoSucesso } from 'src/app/dialogs/dialog-info/dialog-info.component';

@Component({
  selector: 'app-sale-add',
  templateUrl: './sale-add.component.html',
  styleUrls: ['./sale-add.component.scss'],
})
export class SaleAddComponent implements OnInit {
  error: string | null = null;
  saleForm!: FormGroup;
  courses: Course[] = [];
  total: number = 0;
  check = true;

  constructor(
    private saleService: SaleService,
    private courseService: CourseService,
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCourses();

    this.saleForm = this.fb.group({
      clientForm: this.fb.group({
        name: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(50),
          ],
        ],
        surname: [
          '',
          [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(255),
          ],
        ],
        email: ['', [Validators.required, Validators.email]],
        cpf: [
          '',
          Validators.compose([Validators.required, Validacoes.ValidaCpf]),
        ],
      }),
      courseArray: this.fb.array([]),
      value_paid: ['', Validators.required],
    });
  }

  checkValue() {
    // Pega os preços quando clica no checkbox
    const selectedCourse = this.courseArray.value
      .map((checked: any, i: any) => (checked ? this.courses[i].price : null))
      .filter((v: any) => v !== null);

    // Soma os preços do curso clicado na variável de total
    this.total = selectedCourse.reduce((acc: any, curr: any) => {
      return acc + curr;
    }, 0);

    // Atualiza automaticamente o input de valor pago através do form
    this.saleForm.patchValue({
      value_paid: this.total
    });
  }

  // Função para colocar o curso no array ao clicar no checkbox
  addCheckboxes() {
    this.courses.forEach(() => this.courseArray.push(new FormControl(false)));
  }

  // Pega todos os cursos e os coloca em um checkbox
  getCourses(): void {
    this.courseService.getCourses().subscribe((courses) => {
      (this.courses = courses), this.addCheckboxes();
    });
  }

  get name(): AbstractControl {
    return this.saleForm.get('clientForm.name')!;
  }

  get surname(): AbstractControl {
    return this.saleForm.get('clientForm.surname')!;
  }

  get email(): AbstractControl {
    return this.saleForm.get('clientForm.email')!;
  }

  get cpf(): AbstractControl {
    return this.saleForm.get('clientForm.cpf')!;
  }

  get clientForm(): AbstractControl {
    return this.saleForm.get('clientForm')!;
  }

  get courseArray() {
    return this.saleForm.get('courseArray') as FormArray;
  }

  get value_paid(): AbstractControl {
    return this.saleForm.get('value_paid')!;
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogInfoSucesso);

    dialogRef.afterClosed().subscribe();
  }

  // Adiciona uma compra
  addSale(): void {
    // Se estiver incorreto os dados que o usuário inseriu, ele retorna nada
    if (this.saleForm.invalid) {
      return;
    }

    const selectedCourse = this.courseArray.value
      .map((checked: any, i: any) => (checked ? this.courses[i] : null))
      .filter((v: any) => v !== null);

    this.saleService
      .addSale(this.clientForm.value, selectedCourse, this.value_paid.value)
      .subscribe({
        next: () => {
          this.openDialog();
          this.router.navigate(['sales']);
        },
        // Pega o erro para jogar na tela
        error: () => {
          this.error = 'Um erro ocorreu!';
        },
      });
  }
}

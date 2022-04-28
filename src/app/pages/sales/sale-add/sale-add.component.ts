import { Component, OnInit } from '@angular/core';
import {
  Validators,
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { SaleService } from 'src/app/shared/services';
import { Validacoes } from '../../clients/client-add/validacoes.component';
import { DialogInfoSucesso } from 'src/app/dialogs/dialog-info/dialog-info.component';
import { distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-sale-add',
  templateUrl: './sale-add.component.html',
  styleUrls: ['./sale-add.component.scss'],
})
export class SaleAddComponent implements OnInit {
  error: string | null = null;
  saleForm!: FormGroup;

  constructor(
    private saleService: SaleService,
    private location: Location,
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
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
      courses: this.fb.array([]),
      value_paid: ['', Validators.required],
    });

    // this.saleForm.statusChanges.subscribe((status) => console.log(status));



    // this.saleForm
    //   .get('clientForm.name')
    //   ?.valueChanges.pipe(
    //     distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b))
    //   )
    //   .subscribe(async (value) => {
    //     console.log('firstname value changed');
    //     console.log(value);
    //   });
  }

  courseForm(): FormGroup {
    return this.fb.group({
      title: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(255),
        ],
      ],
      workload: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  addCourse() {
    this.courses.push(this.courseForm());
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

  get courses() {
    return this.saleForm.get('courses') as FormArray;
  }

  get title(): AbstractControl {
    return this.courseForm().get('title')!;
  }

  get workload(): AbstractControl {
    return this.courseForm().get('workload')!;
  }

  get price(): AbstractControl {
    return this.courseForm().get('price')!;
  }

  get description(): AbstractControl {
    return this.courseForm().get('description')!;
  }

  get coursesForm(): AbstractControl {
    return this.courseForm().get('coursesForm')!;
  }

  get value_paid(): AbstractControl {
    return this.saleForm.get('value_paid')!;
  }

  goBack(): void {
    this.location.back();
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

    this.saleService
      .addSale(this.clientForm.value, this.courses.value, this.value_paid.value)
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

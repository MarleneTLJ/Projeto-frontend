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
import { ClientService } from 'src/app/shared/services';
import { Client, Course } from 'src/app/shared/interfaces';
import { DialogInfoSucesso } from 'src/app/dialogs/dialog-info/dialog-info.component';
import { distinctUntilChanged, map, Observable, startWith } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-sale-add',
  templateUrl: './sale-add.component.html',
  styleUrls: ['./sale-add.component.scss'],
})
export class SaleAddComponent implements OnInit {
  error: string | null = null;
  saleForm!: FormGroup;
  courses: Course[] = [];
  clients: Client[] = [];
  filteredClients$!: Observable<Client[]>;
  isLoading = false;
  total: number = 0;

  constructor(
    private saleService: SaleService,
    private courseService: CourseService,
    private clientService: ClientService,
    public dialog: MatDialog,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.getClients();

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
        cpf: ['', [Validators.required, Validators.maxLength(11)]],
      }),
      courseArray: this.fb.array([], [Validators.required]),
      value_paid: ['', Validators.required],
    });

    this.filteredClients$ = this.clientForm.get('name')!.valueChanges.pipe(
      distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)),
      startWith(''),
      map((value) => (typeof value === 'string' ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.clients.slice()))
    );
  }

  // Pega todos os clientes
  getClients(): void {
    this.clientService
      .getClients()
      .subscribe((clients) => (this.clients = clients));
  }

  private _filter(name: string): Client[] {
    const filterValue = name.toLowerCase();

    return this.clients.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  setFormData(event: MatAutocompleteSelectedEvent) {
    let client = event.option.value;
    if (client) {
      this.clientForm.get('name')!.setValue(client.name, { emitEvent: false });
      this.clientForm
        .get('surname')!
        .setValue(client.surname, { emitEvent: false });
      this.clientForm
        .get('email')!
        .setValue(client.email, { emitEvent: false });
      this.clientForm.get('cpf')!.setValue(client.cpf, { emitEvent: false });
    }
  }

  checkValue() {
    // Pega os preços quando clica no checkbox
    const selectedCourse = this.courseArray.value
      .map((checked: any, i: any) => (checked ? this.courses[i].price : null))
      .filter((v: any) => v !== null);

    // Soma os preços colocando na variável de total
    this.total = selectedCourse.reduce((acc: any, curr: any) => {
      return acc + curr;
    }, 0);

    // Atualiza automaticamente o input de valor pago através do form
    this.saleForm.patchValue({
      value_paid: this.total,
    });

    console.log(selectedCourse);
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
    if (this.saleForm.invalid || this.total === 0) {
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

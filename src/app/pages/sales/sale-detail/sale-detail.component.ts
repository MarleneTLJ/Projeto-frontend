import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Sale } from 'src/app/shared/interfaces';
import { SaleService } from 'src/app/shared/services';
import { CourseService } from 'src/app/shared/services';
import { Course } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss'],
})
export class SaleDetailComponent implements OnInit {
  sale!: Sale;
  courses: Course[] = [];
  total: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private saleService: SaleService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.getCourses();
    this.getSale();
  }

  // Pega os dados da compra pelo id
  getSale(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.saleService.getSale(id).subscribe((sale) => (this.sale = sale));
  }

  // Pega todos os cursos
  getCourses(): void {
    this.courseService
      .getCourses()
      .subscribe((courses) => (this.courses = courses));
  }

  // Remove um curso do array
  remove(item: any) {
    let index = this.sale.courses.indexOf(item);

    this.sale.courses.splice(index, 1);

    // Diminui o valor pago automaticamente através do preço do curso removido
    this.sale.value_paid -= item.price;
  }

  // Adiciona um curso no array de cursos da compra
  add(item: any) {
    this.sale.courses.push(item);

    // Acrescenta o valor pago automaticamente através do preço do curso adicionado
    this.sale.value_paid += item.price;
  }

  saveSale(): void {
    if (this.sale) {
      this.saleService
        .updateSale(this.sale)
        .subscribe(() => this.router.navigate(['/sales']));
    }
  }
}

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

import { Sale } from 'src/app/shared/interfaces';
import { SaleService } from '../../../shared/services';

@Component({
  selector: 'app-sale-detail',
  templateUrl: './sale-detail.component.html',
  styleUrls: ['./sale-detail.component.scss'],
})
export class SaleDetailComponent implements OnInit {
  sale: Sale | undefined;

  @ViewChild('salepdf') salepdf!: ElementRef;

  constructor(
    private saleService: SaleService,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getSale();
  }

  getSale(): void {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.saleService.getSale(id).subscribe((sale) => (this.sale = sale));
  }

  goBack(): void {
    this.location.back();
  }

  makePdf(): void {
    let DATA: any = document.getElementById('salepdf');
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 150;
      let fileHeigth = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeigth);
      PDF.save('comprovante.pdf');
    });
  }
}

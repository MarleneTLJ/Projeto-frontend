import { Component } from '@angular/core';

@Component({
  selector: 'app-dialog-info',
  templateUrl: './dialog-sucesso.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoSucesso {

  constructor() { }

}

@Component({
  templateUrl: './dialog-falha.component.html',
  styleUrls: ['./dialog-info.component.scss']
})
export class DialogInfoFalha {

  constructor() { }

}

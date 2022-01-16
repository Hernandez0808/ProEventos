import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrls: ['./titulo.component.scss']
})
export class TituloComponent implements OnInit {

  constructor(private router:Router) { }
   @Input() titulo:string = 'Evento';
   @Input() iconClass:string = 'fa fa-user';
   @Input() subTitulo:string = 'Desde 2021';
   @Input() botaoLista = false;

  ngOnInit(): void {
  }

  listar():void{
    this.router.navigate([`/${this.titulo.toLowerCase()}/lista`]);
  }

}

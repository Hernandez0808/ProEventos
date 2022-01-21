import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Evento } from 'src/app/models/evento';
import { EventoService } from 'src/app/service/evento.service';

@Component({
  selector: 'app-evento-lista',
  templateUrl: './evento-lista.component.html',
  styleUrls: ['./evento-lista.component.scss']
})
export class EventoListaComponent implements OnInit {


  modalRef?: BsModalRef;
  message?: string;

  public eventoId:number = 0;
  public eventos:Evento[] = [];
  public eventosFiltrados:Evento[] = [];

  constructor(
    private eventoService: EventoService,
     private modalService: BsModalService,
     private toastr: ToastrService,
     private spinner: NgxSpinnerService,
     private router :Router
     ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.getEventos();
  }
  larguraImagem:number = 150;
  margemImagem:number = 2;
  mostrarImagem:boolean = true;
  private _filtroLista:string = '';

  public get filtroLista():string{
    return this._filtroLista;
  }

  public set filtroLista(value:string){
    this._filtroLista = value;
    this.eventosFiltrados = this.filtroLista ? this.filtrarEventos(this.filtroLista) : this.eventos;
  }

  public filtrarEventos(filtrarPor: string): Evento[]{
    filtrarPor = filtrarPor.toLocaleLowerCase();

    return this.eventos.filter((evento: { tema: string; }) => evento.tema.toLocaleLowerCase().indexOf(filtrarPor) !== -1)
  }

  public alterarImagem(): void{
    this.mostrarImagem = !this.mostrarImagem;
  }
  public getEventos(): void{
      this.eventoService.getEvento().subscribe({
        next: (eventos:Evento[])=>{
          this.eventos = eventos;
          this.eventosFiltrados = this.eventos
        },
        error: (error : any) => {
          this.spinner.hide();
          this.toastr.error('Erro ao Carregar os Eventos', 'Erro!');
        },

        complete: () => {this.spinner.hide();}
      });
    }




        openModal(event:any, template: TemplateRef<any>, eventoId:number) {
          event.stopPropagation();

          this.eventoId= eventoId;
          this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
        }
        confirm(): void {

         this.modalRef?.hide();
         this.spinner.show();

          this.eventoService.deleteEvento(this.eventoId).subscribe(
            (result:any)=>{
              if(result.message === 'Deletado'){
                this.toastr.success('O Evento foi deletado com Sucesso.', 'Deletado');
                this.getEventos();
              }
            },
            (error : any) => {
              console.error(error);

              this.toastr.error(`Erro ao tentar deletar o evento ${this.eventoId}`, 'Erro!');

            }
            ).add(()=>this.spinner.hide())}

        decline(): void {
          this.message = 'Não';
          this.modalRef?.hide();
        }

        detalheEvento(id:number):void{
            this.router.navigate([`eventos/detalhe/${id}`]);
        }

}

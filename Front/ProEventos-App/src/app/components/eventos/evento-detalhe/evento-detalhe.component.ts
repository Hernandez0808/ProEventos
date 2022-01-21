import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Evento } from '@app/models/evento';
import { EventoService } from '@app/service/evento.service';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { NgxSpinnerService, Spinner } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento-detalhe',
  templateUrl: './evento-detalhe.component.html',
  styleUrls: ['./evento-detalhe.component.scss']
})
export class EventoDetalheComponent implements OnInit {


  form: FormGroup = this.formBuilder.group({});

  public evento = {} as Evento;
  public estadoSalvar: string = 'post';
  get f():any{
    return this.form.controls;
  }

  get bsConfig():any{
    return{
        isAnimated:true,
        adaptivePosition:true,
        dateInputFormat: 'DD/MM/YYYY hh:mm a',
        containerClass: 'theme-default',
        showWeekNumbers:false
    }
  }
  constructor(private formBuilder:FormBuilder,
     private localeSerivce: BsLocaleService,
      private router: ActivatedRoute,
       private eventoService: EventoService,
       private  spinner:NgxSpinnerService,
       private toastr: ToastrService) {
    this.localeSerivce.use('pt-br');
   }



  ngOnInit(): void {
    this.carregarEvento();
    this.validation();
  }

  public carregarEvento():void{
    const eventoIdParam = this.router.snapshot.paramMap.get('id');

    if (eventoIdParam !== null){
      this.spinner.show();
      this.estadoSalvar = 'put';
      this.eventoService.getEventoById(parseInt(eventoIdParam)).subscribe({
        next:(evento:Evento)=>{
          this.evento = {...evento};
          this.form.patchValue(this.evento);
          this.spinner.hide();
        },
        error:(error:any)=>{
          console.error(error);
          this.spinner.hide();
          this.toastr.error(`Erro ao carregar o evento ${eventoIdParam}`, "Evento");
        },
        complete:()=>{this.spinner.hide();},
      })
    }
  }

  public validation():void{
    this.form = this.formBuilder.group({
    tema: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(50)]],
    local: ['', Validators.required],
    dataEvento: ['', Validators.required],
    qtdPessoas: ['', [Validators.required,Validators.max(120000)]],
    telefone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    imagemURL: ['', Validators.required]
    });
  }

  public resteForm():void{
      this.form.reset();
  }

  public cssValidator(campoForm: FormControl): any{
    return{ 'is-invalid': campoForm.errors && campoForm.touched};
}

public salvarAlteracao():void{
  // this.spinner.show();
    if(this.form.valid){

      if(this.estadoSalvar === 'post'){

        this.evento = {...this.form.value};

        this.eventoService.postEvento(this.evento).subscribe(
          () => {this.toastr.success("Evento salvo com Sucesso","Sucesso")},
          (error:any) => {
            console.error(error);
            this.spinner.hide();
            this.toastr.error("Erro ao salvar evento", "Evento");
          },
          () => this.spinner.hide()
        );

      }

    else{

      this.evento = {id: this.evento.id, ...this.form.value};

      this.eventoService.putEvento(this.evento).subscribe(
        () => {this.toastr.success("Evento editado com Sucesso","Sucesso")},
        (error:any) => {
          console.error(error);
          this.spinner.hide();
          this.toastr.error("Erro ao editar evento", "Evento");
        },
        () => this.spinner.hide()
      );
    }
    }
}
}

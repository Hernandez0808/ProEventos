import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {

  form: FormGroup = this.formBuilder.group({});

  get f():any{
    return this.form.controls;
  }

  constructor(private formBuilder:FormBuilder) {  }

  ngOnInit(): void {
    this.validation();
  }

  public validation():void{
    const formOptions:AbstractControlOptions = {
      validators: ValidatorField.MustMatch('senha', 'confirmeSenha')
    };

    this.form = this.formBuilder.group({

    titulo:['', Validators.required],
    primeiroNome:['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    ultimoNome:['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    email:['', [Validators.required , Validators.email]],
    telefone:['', [Validators.required ,Validators.minLength(11), Validators.maxLength(11)]],
    funcao:['',Validators.required],
    senha:['', [Validators.required, Validators.minLength(8)]],
    confirmeSenha:['', Validators.required],
    }, formOptions);
  }

  public resteForm():void{
      this.form.reset();
  }
}

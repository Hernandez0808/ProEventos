import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ValidatorField } from '@app/helpers/ValidatorField';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

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
    primeiroNome:['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    ultimoNome:['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    email:['', [Validators.required , Validators.email]],
    userName:['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
    senha:['', [Validators.required, Validators.minLength(8)]],
    confirmeSenha:['', Validators.required],
    }, formOptions);
  }

  public resteForm():void{
      this.form.reset();
  }

}

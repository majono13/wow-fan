import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
  ;
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { Dialog } from 'src/app/shared/services/dialog.service';
import { SanackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    acessCode: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(11)]]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private snackbar: SanackbarService, public dialog: Dialog, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const newUser: User = this.formRegister.value;

    this.authService.registerNewUser(newUser)
      .subscribe({
        error: err => this.snackbar.snackbarNotify(`Falha ao registrar novo usuário, contate um administrador`),
        next: (data) => this.dialog.openDialog('Usuário registrado! Passe as credenciais (email e código de acesso) a ele para que que ele possa logar')
      })
  }

  exit() {
    this.router.navigateByUrl('/admin');
  }

}

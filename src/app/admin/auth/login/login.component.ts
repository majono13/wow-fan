import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SanackbarService } from 'src/app/shared/services/snackbar.service';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    acessCode: ['', [Validators.required, Validators.minLength(6)]]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackbar: SanackbarService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.authService.login(this.formLogin.value)
      .subscribe({
        error: err => this.snackbar.snackbarNotify('Erro ao tentar logar.Verifique suas credenciais e tente novamente, ou contate um administrador.'),
        next: () => {
          this.router.navigateByUrl('/admin');
          this.snackbar.snackbarNotify('Bem vindo!')
        }
      });
  }

}

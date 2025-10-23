import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../service/auth-service';
import { Spiner } from '../../components/spiner/spiner';
@Component({
  selector: 'app-login-page',
  imports: [RouterModule, FormsModule, Spiner],
  templateUrl: './login-pages.html',
  styleUrl: './login-pages.scss'
})
export class LoginPage {

  errorLogin = false;
  authService = inject(AuthService);
  isLoading = false;

  async login(form: any) {
    console.log(form.value)
    this.errorLogin = false;
    if (!form.value.email || !form.value.password) {
      this.errorLogin = true;
      return
    }
    this.isLoading = true;
    await this.authService.login(form.value);
    this.isLoading = false;
    this.errorLogin = true;
  }
}
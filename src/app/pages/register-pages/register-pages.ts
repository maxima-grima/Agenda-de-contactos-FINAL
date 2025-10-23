import { Component, inject } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../service/user-service';
import { Spiner } from '../../components/spiner/spiner';

@Component({
  selector: 'app-register-page',
  imports: [RouterModule,FormsModule,Spiner],
  templateUrl: './register-pages.html',
  styleUrl: './register-pages.scss'
})
export class RegisterPages {
  errorRegister=false;
  usersService = inject(UsersService);
  isLoading = false;
  router = inject(Router);

  async register(form: NgForm){
    this.errorRegister = false;
    if(!form.value.email || 
      !form.value.password || 
      !form.value.password2 || 
      !form.value.firstName ||
      !form.value.lastName ||
      form.value.password !== form.value.password2){
      this.errorRegister = true;
      return
    }
    this.isLoading = true;
    const res = await this.usersService.register(form.value);
    if(res.ok){
      this.router.navigate(["/login"])
    }
    this.isLoading = false;
    this.errorRegister = true;
  }
}
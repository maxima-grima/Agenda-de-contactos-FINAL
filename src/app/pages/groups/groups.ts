import { Component, inject } from '@angular/core';
import { AuthService } from '../../service/auth-service';
@Component({
  selector: 'app-groups',
  imports: [],
  templateUrl: './groups.html',
  styleUrl: './groups.scss'
})
export class GroupsPage {
  authService = inject(AuthService);
}
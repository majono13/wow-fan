import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/models/user.model';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.scss']
})
export class MenuAdminComponent implements OnInit {

  user!: Observable<User>;

  constructor(private authService: AuthService, private route: Router) { }

  ngOnInit(): void {
    this.getUser();
  }

  getUser() {
    this.user = this.authService.getUser();
  }

  logout() {
    this.authService.logout();
    this.route.navigateByUrl('/login');
  }
}

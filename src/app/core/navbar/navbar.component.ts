import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavBarComponent {
  constructor(private auth: AuthService,
              private router: Router) {}

  logout() {
    this.auth.logout();
    this.router.navigateByUrl('/auth');
  }
 }

import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/helpers/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}
  sesion!: { token: string | null };

  ngOnInit(): void {
    this.sesion = this.authService.getSesion();
  }

  logOut(): void {
    this.authService.logOut();
  }
}

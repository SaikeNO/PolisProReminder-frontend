import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSlideToggle } from '@angular/material/slide-toggle';
import { AuthService } from './shared/data-access/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggle],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  authService = inject(AuthService);

  ngOnInit() {
    this.authService.login({ name: 'admin', password: 'password' }).subscribe();
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { StorageService } from './shared/data-access/storage.service';
import { UserService } from './shared/data-access/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private storageService = inject(StorageService);
  private userService = inject(UserService);
  private router = inject(Router);

  ngOnInit() {
    const user = this.storageService.getUser();

    if (user) {
      this.userService.setUser(user);
    } else {
      this.router.navigate(['/login']);
    }
  }
}

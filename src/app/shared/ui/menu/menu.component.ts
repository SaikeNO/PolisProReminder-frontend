import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatListModule,
    MatIconModule,
    MatDividerModule,
    RouterLink,
    MatButtonModule,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  public menuItems = [
    {
      name: 'Polisy',
      url: '/',
    },
    {
      name: 'Klienci',
      url: '/insurers',
    },
    {
      name: 'Towarzystwa',
      url: '/company',
    },
    {
      name: 'Kategorie',
      url: '/type',
    },
  ];
}

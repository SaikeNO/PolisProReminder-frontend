import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { AsyncPipe, NgFor } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIcon } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconButton } from '@angular/material/button';
import { PoliciesLatestComponent } from './components/policies-latest/policies-latest.component';
import { TodoComponent } from './components/todo/todo.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    NgFor,
    LayoutModule,
    MatCardModule,
    MatMenuModule,
    MatIcon,
    MatGridListModule,
    AsyncPipe,
    MatIconButton,
    PoliciesLatestComponent,
    TodoComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  // private breakpointObserver = inject(BreakpointObserver);
  // cards$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
  //   map(({ matches }) => {
  //     if (matches) {
  //       return [
  //         { id: 1, title: 'Najbliższe polisy', cols: 2, rows: 1 },
  //         { id: 2, title: 'Card 2', cols: 2, rows: 1 },
  //         { id: 3, title: 'Card 3', cols: 2, rows: 1 },
  //         { id: 4, title: 'Card 4', cols: 2, rows: 1 },
  //       ];
  //     }
  //     return [
  //       { id: 1, title: 'Najbliższe polisy', cols: 2, rows: 1 },
  //       { id: 2, title: 'Card 2', cols: 1, rows: 1 },
  //       { id: 3, title: 'Card 3', cols: 1, rows: 2 },
  //       { id: 4, title: 'Card 4', cols: 1, rows: 1 },
  //     ];
  //   }),
  // );
}

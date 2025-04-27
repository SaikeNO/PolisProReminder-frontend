import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { map } from 'rxjs';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { PoliciesLatestComponent } from './components/policies-latest/policies-latest.component';
import { TodoComponent } from './components/todo/todo.component';
import { AssistantsComponent } from './components/assistants/assistants.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    LayoutModule,
    MatCardModule,
    MatMenuModule,
    MatGridListModule,
    PoliciesLatestComponent,
    TodoComponent,
    AssistantsComponent,
    AsyncPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  private breakpointObserver = inject(BreakpointObserver);
  cards$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map(({ matches }) => {
      if (matches) {
        return [
          { id: 1, title: 'Najbliższe polisy', cols: 3, rows: 1 },
          { id: 3, title: null, cols: 3, rows: 1 },
          { id: 2, title: 'Twoi pracownicy', cols: 3, rows: 1 },
          { id: 4, title: 'Card 3', cols: 3, rows: 1 },
        ];
      }
      return [
        { id: 1, title: 'Najbliższe polisy', cols: 3, rows: 1 },
        { id: 2, title: 'Twoi pracownicy', cols: 1, rows: 1 },
        { id: 3, title: null, cols: 2, rows: 2 },
        { id: 4, title: 'Card 3', cols: 1, rows: 1 },
      ];
    }),
  );
}

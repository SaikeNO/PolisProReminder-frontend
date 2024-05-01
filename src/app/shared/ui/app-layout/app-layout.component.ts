import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule, MatNavList } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, map, shareReplay } from 'rxjs';
import { StorageService } from '../../data-access/storage.service';
import { UserService } from '../../data-access/user.service';
import { MatIconButton } from '@angular/material/button';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';
import { PortalModule } from '@angular/cdk/portal';
import { PortalService } from '../../data-access/portal.service';

@Component({
  selector: 'app-app-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    MatSidenavModule,
    AsyncPipe,
    MatIcon,
    MatToolbarModule,
    MatNavList,
    MatListModule,
    NgIf,
    MatIconButton,
    LoadingBarComponent,
    PortalModule,
    RouterLinkActive,
  ],
  templateUrl: './app-layout.component.html',
  styleUrl: './app-layout.component.scss',
})
export class AppLayoutComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private storageService = inject(StorageService);
  private userService = inject(UserService);
  private portalService = inject(PortalService);
  private router = inject(Router);

  selectedPortal$ = this.portalService.selectedPortal$;
  isPortalOpened$ = this.portalService.isOpened$;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  ngOnInit() {
    const user = this.storageService.getUser();

    if (user) {
      this.userService.setUser(user);
    } else {
      this.router.navigate(['/login']);
    }
  }

  public onPortalClose(): void {
    this.portalService.closePortal();
  }
}

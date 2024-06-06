import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule, MatNavList } from '@angular/material/list';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, filter, map, shareReplay, take } from 'rxjs';
import { StorageService } from '../../data-access/storage.service';
import { UserService } from '../../data-access/user.service';
import { MatIconButton } from '@angular/material/button';
import { LoadingBarComponent } from '../loading-bar/loading-bar.component';
import { PortalModule } from '@angular/cdk/portal';
import { PortalService } from '../../data-access/portal.service';
import { MenuComponent } from '../menu/menu.component';

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
    MenuComponent,
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
  @ViewChild('drawer') drawer!: MatSidenav;

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
      //this.router.navigate(['/login']);
    }
  }

  public closeDrawer() {
    this.isHandset$
      .pipe(
        filter((isHandset) => isHandset),
        take(1),
      )
      .subscribe(() => {
        this.drawer.close();
      });
  }

  public onPortalClose(): void {
    this.portalService.closePortal();
  }
}

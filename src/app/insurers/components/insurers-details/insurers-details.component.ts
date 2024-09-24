import { Component, Inject, InjectionToken, Injector, inject } from '@angular/core';
import { Insurer } from '../../../shared/interfaces/insurer';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { InsurersPoliciesComponent } from '../insurers-policies/insurers-policies.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ErrorInfoComponent } from '../../../shared/ui/error-info/error-info.component';
import { ComponentPortal } from '@angular/cdk/portal';
import {
  POLICY_FORM,
  PoliciesFormComponent,
} from '../../../policies/components/policies-form/policies-form.component';
import { PortalService } from '../../../shared/data-access/portal.service';
import { PhonePipe } from '../../../shared/pipes/phone.pipe';

export const INSURER_DETAILS = new InjectionToken<{}>('CONTAINER_DATA');

@Component({
  selector: 'app-insurers-details',
  standalone: true,
  imports: [
    MatCardModule,
    MatListModule,
    InsurersPoliciesComponent,
    MatIconModule,
    MatButtonModule,
    ErrorInfoComponent,
    PhonePipe,
  ],
  templateUrl: './insurers-details.component.html',
  styleUrl: './insurers-details.component.scss',
})
export class InsurersDetailsComponent {
  private injector = inject(Injector);
  private portalService = inject(PortalService);

  constructor(@Inject(INSURER_DETAILS) public insurer: Insurer | undefined) {}

  public openForm() {
    this.portalService.setSelectedPortal(
      new ComponentPortal(
        PoliciesFormComponent,
        null,
        Injector.create({
          parent: this.injector,
          providers: [
            {
              provide: POLICY_FORM,
              useValue: { insurer: this.insurer },
            },
          ],
        }),
      ),
    );
    this.portalService.setIsOpen(true);
  }
}

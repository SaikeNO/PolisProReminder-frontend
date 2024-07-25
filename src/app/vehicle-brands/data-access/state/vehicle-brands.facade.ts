import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as VehiclesActions from './vehicle-brands.actions';
import * as VehiclesSelectors from './vehicle-brands.selectors';
import { AppState } from '../../../shared/reducers';

@Injectable({ providedIn: 'root' })
export class VehicleBrandsFacade {
  private store: Store<AppState> = inject(Store);

  isLoading$ = this.store.pipe(select(VehiclesSelectors.isLoading));
  error$ = this.store.pipe(select(VehiclesSelectors.getError));
  vehicles$ = this.store.pipe(select(VehiclesSelectors.getVehicleBrands));

  getVehicleBrands(): void {
    this.store.dispatch(VehiclesActions.getVehicleBrands());
  }
}

import { Injectable, inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as VehiclesActions from './vehicles.actions';
import * as VehiclesSelectors from './vehicles.selectors';
import { AppState } from '../../../shared/reducers';
import { GetQuery } from '../../../shared/interfaces/getQuery';
import { CreateVehicle } from '../../../shared/interfaces/vehicle';

@Injectable({ providedIn: 'root' })
export class VehiclesFacade {
  private store: Store<AppState> = inject(Store);

  isLoading$ = this.store.pipe(select(VehiclesSelectors.isLoading));
  error$ = this.store.pipe(select(VehiclesSelectors.getError));
  query$ = this.store.pipe(select(VehiclesSelectors.getQuery));
  vehicles$ = this.store.pipe(select(VehiclesSelectors.getVehicles));
  totalItemsCount$ = this.store.pipe(select(VehiclesSelectors.getTotalItemsCount));
  totalPages$ = this.store.pipe(select(VehiclesSelectors.getTotalPages));
  itemsFrom$ = this.store.pipe(select(VehiclesSelectors.getItemsFrom));
  itemsTo$ = this.store.pipe(select(VehiclesSelectors.getItemsTo));

  getPaginatedVehicles(query: GetQuery): void {
    this.store.dispatch(VehiclesActions.getPaginatedVehicles({ query }));
  }

  createVehicle(createVehicle: CreateVehicle): void {
    this.store.dispatch(VehiclesActions.createVehicle({ createVehicle }));
  }

  editVehicle(createVehicle: CreateVehicle, id: string): void {
    this.store.dispatch(VehiclesActions.editVehicle({ createVehicle, id }));
  }

  deleteVehicle(id: string): void {
    this.store.dispatch(VehiclesActions.deleteVehicle({ id }));
  }
}

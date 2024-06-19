import { createReducer, on } from '@ngrx/store';
import * as VehiclesActions from './vehicles.actions';
import { VehiclesState } from './vehicles.models';

export const initialState: VehiclesState = {
  isLoading: false,
  error: null,
  vehicles: [],
  query: {
    searchPhrase: '',
    pageIndex: 0,
    pageSize: 10,
    sortBy: '',
    sortDirection: 'none',
  },
  itemsFrom: 0,
  itemsTo: 0,
  totalItemsCount: 0,
  totalPages: 0,
};

export const vehiclesReducer = createReducer(
  initialState,
  on(VehiclesActions.getPaginatedVehicles, (state, { query }) => ({
    ...state,
    query,
    isLoading: true,
  })),
  on(
    VehiclesActions.getPaginatedVehiclesSuccess,
    (state, { pageResult: { items, itemsFrom, itemsTo, totalItemsCount, totalPages } }) => ({
      ...state,
      itemsFrom,
      itemsTo,
      totalItemsCount,
      totalPages,
      isLoading: false,
      vehicles: items,
    }),
  ),
  on(VehiclesActions.getPaginatedVehiclesFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VehiclesActions.createVehicle, (state) => ({ ...state, isLoading: true, error: null })),
  on(VehiclesActions.createVehicleSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(VehiclesActions.createVehicleFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VehiclesActions.editVehicle, (state) => ({ ...state, isLoading: true, error: null })),
  on(VehiclesActions.editVehicleSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(VehiclesActions.editVehicleFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),

  on(VehiclesActions.deleteVehicle, (state) => ({ ...state, isLoading: true, error: null })),
  on(VehiclesActions.deleteVehicleSuccess, (state) => ({
    ...state,
    isLoading: false,
  })),
  on(VehiclesActions.deleteVehicleFailure, (state, action) => ({
    ...state,
    isLoading: false,
    error: action.error,
  })),
);

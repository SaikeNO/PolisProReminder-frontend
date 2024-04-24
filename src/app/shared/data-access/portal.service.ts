import { ComponentPortal, Portal } from '@angular/cdk/portal';
import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PortalService {
  private _selectedPortal$ = new BehaviorSubject<Portal<any> | null>(null);
  private _isOpened$ = new BehaviorSubject<boolean>(false);
  public onClose = new EventEmitter();

  get selectedPortal$() {
    return this._selectedPortal$.asObservable();
  }

  get isOpened$() {
    return this._isOpened$.asObservable();
  }

  setSelectedPortal(component: ComponentPortal<any>): void {
    this._selectedPortal$.next(component);
  }

  setIsOpen(value: boolean): void {
    this._isOpened$.next(value);
  }

  closePortal(): void {
    this._isOpened$.next(false);
    this.onClose.emit();
  }
}

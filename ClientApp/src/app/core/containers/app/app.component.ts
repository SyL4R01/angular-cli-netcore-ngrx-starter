import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { select, Store } from '@ngrx/store';
import * as layoutActions from 'app/core/store/actions';
import * as fromRoot from 'app/core/store/reducers';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showSidenav$: Observable<boolean>;
  title$: Observable<string>;
  constructor(private store: Store<fromRoot.State>) {
    this.showSidenav$ = this.store.pipe(select(fromRoot.getShowSidenav));
    this.title$ = this.store.pipe(select(fromRoot.getTitle));
  }
  ngOnInit(): void {}
  openSidenav() {
    this.store.dispatch(new layoutActions.OpenSidenav());
  }
  closeSidenav() {
    this.store.dispatch(new layoutActions.CloseSidenav());
  }
  toggleSidenav() {
    this.store.dispatch(new layoutActions.ToggleSidenav());
  }
  sidenavChanged(sidenavOpened) {
    if (sidenavOpened) {
      this.openSidenav();
    } else {
      this.closeSidenav();
    }
  }
}

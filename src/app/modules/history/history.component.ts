import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectSearchHistory } from 'src/app/store/selectors/app.selectors';
import * as AppActions from '../../store/actions/app.actions';
import { Observable } from 'rxjs';
import { GithubUser } from 'src/app/models/github-user.model';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {

  searchHistory$: Observable<{query: string, results: GithubUser[]}[]> | undefined;

  constructor(private store: Store) {
    this.searchHistory$ = this.store.select(selectSearchHistory);
  }

  clearSearch(): void {
    this.store.dispatch(AppActions.clearSearchHistory());
  }
}

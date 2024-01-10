import { Component, OnDestroy, OnInit } from '@angular/core';
import { GithubService } from '../../services/github/github.service';
import { GithubUser } from '../../models/github-user.model';
import { Store } from '@ngrx/store';
import * as AppActions from '../../store/actions/app.actions';
import { selectSearchResults } from '../../store/selectors/app.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchTerm: string = '';
  searchResults$: Observable<GithubUser[]> | undefined;

  constructor(private githubService: GithubService, private store: Store) {}

  ngOnInit(): void {
    this.searchResults$ = this.store.select(selectSearchResults);
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      
      this.githubService.searchUsers(this.searchTerm).subscribe(
        (data: any) => {
          this.store.dispatch(AppActions.addSearchHistory({ query: this.searchTerm, results: data.items}));
          this.store.dispatch(AppActions.setSearchResults({ results: data.items }));
        },
        (error) => {
          // TODO: Add a toastr
          console.error('Error during user search:', error);
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(AppActions.clearSearchResults());
  }
}

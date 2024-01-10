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

  constructor(private githubService: GithubService, private store: Store) {
    // Subscribe to the store to get the search results and search history
  }

  ngOnInit(): void {
    this.searchResults$ = this.store.select(selectSearchResults);
  }

  search(): void {
    if (this.searchTerm.trim() !== '') {
      // Dispatch the addSearchHistory action to update the search history in the store
      
      this.githubService.searchUsers(this.searchTerm).subscribe(
        (data: any) => {
          // Assuming data is an array of users
          // Dispatch the setSearchResults action to update the search results in the store
          this.store.dispatch(AppActions.addSearchHistory({ query: this.searchTerm, results: data.items}));
          this.store.dispatch(AppActions.setSearchResults({ results: data.items }));
        },
        (error) => {
          console.error('Error during user search:', error);
          // Handle error
        }
      );
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(AppActions.clearSearchResults());
  }
}

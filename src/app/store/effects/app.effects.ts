
import { Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { EMPTY } from 'rxjs';
import { mergeMap, catchError, map } from 'rxjs/operators';
import * as AppActions from '../actions/app.actions';
import { GithubService } from '../../services/github/github.service';

@Injectable()
export class AppEffects {
  searchUsers$ = createEffect(() => this.actions$.pipe(
    ofType(AppActions.addSearchHistory),
    mergeMap(({ query }) => this.githubService.searchUsers(query).pipe(
      map((data: any) => AppActions.setSearchResults({ results: data.items })),
      catchError(() => EMPTY)
    ))
  ));

  // Add other effects as needed

  constructor(
    private actions$: Actions,
    private githubService: GithubService
  ) {}
}
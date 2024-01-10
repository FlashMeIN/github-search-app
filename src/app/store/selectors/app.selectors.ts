
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../state/app.state';

export const selectAppState = createFeatureSelector<AppState>('app');

export const selectSearchHistory = createSelector(
  selectAppState,
  (state) => state.searchHistory
);

export const selectSearchResults = createSelector(
  selectAppState,
  (state) => state.searchResults
);
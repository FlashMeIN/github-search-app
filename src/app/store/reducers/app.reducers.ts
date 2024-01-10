import { createReducer, on } from '@ngrx/store';
import * as AppActions from '../actions/app.actions';
import { initialState, AppState } from '../state/app.state';

export const appReducer = createReducer(
  initialState,
  on(AppActions.setSearchResults, (state, { results }) => ({
    ...state,
    searchResults: [...results],
  })),
  on(AppActions.addSearchHistory, (state, { query, results }) => {
    const existingHistory = state.searchHistory.find(entry => entry.query === query);
    if (existingHistory) {
      return {
        ...state,
        searchHistory: state.searchHistory.map(entry => entry.query === query ? { ...entry, results } : entry),
      };
    } else {
      return {
        ...state,
        searchHistory: [...state.searchHistory, { query, results }],
      };
    }
  }),
  on(AppActions.clearSearchHistory, (state) => ({
    ...state,
    searchHistory: [],
  })),
  on(AppActions.clearSearchResults, (state) => ({
    ...state,
    searchResults: [],
  })),
);
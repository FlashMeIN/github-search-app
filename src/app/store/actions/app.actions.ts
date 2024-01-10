import { createAction, props } from '@ngrx/store';
import { GithubUser } from '../../models/github-user.model';

export const addSearchHistory = createAction('Add Search History', props<{ query: string, results: GithubUser[] }>());
export const clearSearchHistory = createAction('Clear Search History');
export const setSearchResults = createAction('Set Search Results', props<{ results: GithubUser[] }>());
export const clearSearchResults = createAction('Clear Search Results');
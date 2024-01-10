import { GithubUser } from 'src/app/models/github-user.model';

export interface AppState {
  searchHistory: {
    query: string,
    results: GithubUser[]
  }[];
  searchResults: GithubUser[]; // Assuming you store search results in the state
}

export const initialState: AppState = {
  searchHistory: [],
  searchResults: [],
};

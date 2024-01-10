import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { GithubService } from '../../services/github/github.service';
import { Store, StoreModule } from '@ngrx/store';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as AppActions from '../../store/actions/app.actions';
import { of, throwError } from 'rxjs';
import { appReducer } from 'src/app/store/reducers/app.reducers';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let mockGithubService: jasmine.SpyObj<GithubService>;
  let mockStore: jasmine.SpyObj<Store>;

  beforeEach(() => {
    mockGithubService = jasmine.createSpyObj('GithubService', ['searchUsers']);
    mockStore = jasmine.createSpyObj('Store', ['dispatch', 'select']);

    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule, StoreModule.forRoot({ app: appReducer })],
      providers: [
        { provide: GithubService, useValue: mockGithubService },
        { provide: Store, useValue: mockStore },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should dispatch actions on search', fakeAsync(() => {
    const mockSearchResults = [
      {
        login: 'sushil',
        id: 108484,
        node_id: 'MDQ6VXNlcjEwODQ4NA==',
        avatar_url: 'https://avatars.githubusercontent.com/u/108484?v=4',
        gravatar_id: '',
        url: 'https://api.github.com/users/sushil',
        html_url: 'https://github.com/sushil',
        followers_url: 'https://api.github.com/users/sushil/followers',
        following_url:
          'https://api.github.com/users/sushil/following{/other_user}',
        gists_url: 'https://api.github.com/users/sushil/gists{/gist_id}',
        starred_url:
          'https://api.github.com/users/sushil/starred{/owner}{/repo}',
        subscriptions_url: 'https://api.github.com/users/sushil/subscriptions',
        organizations_url: 'https://api.github.com/users/sushil/orgs',
        repos_url: 'https://api.github.com/users/sushil/repos',
        events_url: 'https://api.github.com/users/sushil/events{/privacy}',
        received_events_url:
          'https://api.github.com/users/sushil/received_events',
        type: 'User',
        site_admin: false,
        name: 'Sushil Bajracharya',
        company: null,
        blog: 'http://sushil.github.io',
        location: 'MA',
        email: null,
        hireable: null,
        bio: null,
        twitter_username: null,
        public_repos: 14,
        public_gists: 25,
        followers: 24,
        following: 77,
        created_at: '2009-07-24T22:50:32Z',
        updated_at: '2023-10-25T20:41:20Z',
      },
    ];
    mockGithubService.searchUsers.and.returnValue(
      of({ items: mockSearchResults })
    );

    component.searchTerm = 'testuser';
    component.search();
    tick();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AppActions.addSearchHistory({
        query: 'testuser',
        results: mockSearchResults,
      })
    );
    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AppActions.setSearchResults({ results: mockSearchResults })
    );
  }));

  it('should handle error during search', fakeAsync(() => {
    mockGithubService.searchUsers.and.returnValue(throwError('')); // Simulating an error
    component.searchTerm = 'testuser';
    component.search();
    tick();

    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      AppActions.addSearchHistory({query: 'testuser', results: []})
    ); // Ensure that addSearchHistory is not called on error
    expect(mockStore.dispatch).not.toHaveBeenCalledWith(
      AppActions.setSearchResults({results: []})
    ); // Ensure that setSearchResults is not called on error
  }));

  it('should dispatch clearSearchResults on destroy', () => {
    component.ngOnDestroy();

    expect(mockStore.dispatch).toHaveBeenCalledWith(
      AppActions.clearSearchResults()
    );
  });
});

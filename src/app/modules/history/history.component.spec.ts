import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { HistoryComponent } from './history.component';
import { Store, StoreModule } from '@ngrx/store';
import * as AppActions from '../../store/actions/app.actions';
import { selectSearchHistory } from '../../store/selectors/app.selectors';
import { appReducer } from 'src/app/store/reducers/app.reducers';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;
  let store: Store;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HistoryComponent],
      imports: [StoreModule.forRoot({ app: appReducer })],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store); // Inject the store
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display search history', () => {
    const history = [
      { query: 'user1', results: [] },
      { query: 'user3', results: [] },
    ];
    component.searchHistory$ = store.select(selectSearchHistory);
    store.dispatch(AppActions.addSearchHistory(history[0]));
    store.dispatch(AppActions.addSearchHistory(history[1]));

    fixture.detectChanges();
    const historyEntries =
      fixture.nativeElement.querySelectorAll('.history-entry');
    expect(historyEntries.length).toBe(history.length);
  });

  
  it('should dispatch action on clear button click', fakeAsync(() => {
    spyOn(store, 'dispatch').and.callThrough();
    const history = [
      { query: 'user1', results: [] },
      { query: 'user3', results: [] },
    ];
    component.searchHistory$ = store.select(selectSearchHistory);
    store.dispatch(AppActions.addSearchHistory(history[0]));
    store.dispatch(AppActions.addSearchHistory(history[1]));

    fixture.detectChanges();
    const clearButton = fixture.nativeElement.querySelector('.clear-button');
    clearButton.click();
    tick();
    expect(store.dispatch).toHaveBeenCalledWith(
      AppActions.clearSearchHistory()
    );
  }));
});

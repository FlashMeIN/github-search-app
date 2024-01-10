import { TestBed, inject, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { GithubService } from './github.service';

describe('GithubService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [GithubService],
    });
  });

  it('should be created', inject([GithubService], (service: GithubService) => {
    expect(service).toBeTruthy();
  }));

  it('should make a GET request to GitHub API', inject([GithubService, HttpTestingController],
    (service: GithubService, httpMock: HttpTestingController) => {
      const testData = { items: [{ login: 'user1' }, { login: 'user2' }] };
      service.searchUsers('testuser').subscribe(data => {
        expect(data).toEqual(testData);
      });

      const req = httpMock.expectOne('https://api.github.com/search/users?q=testuser');
      expect(req.request.method).toEqual('GET');
      req.flush(testData);

      httpMock.verify();
    }));
});
import { TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ChampionsDataService } from './champions-data.service';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

describe('ChampionsDataService', () => {
  let service: ChampionsDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [],
    providers: [provideHttpClient(withInterceptorsFromDi()), provideHttpClientTesting()]
});
    service = TestBed.inject(ChampionsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

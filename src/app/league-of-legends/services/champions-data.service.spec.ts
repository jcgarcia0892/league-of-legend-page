import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ChampionsDataService } from './champions-data.service';

describe('ChampionsDataService', () => {
  let service: ChampionsDataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(ChampionsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

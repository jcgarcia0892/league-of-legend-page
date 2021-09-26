import { TestBed } from '@angular/core/testing';

import { ChampionsDataService } from './champions-data.service';

describe('ChampionsDataService', () => {
  let service: ChampionsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChampionsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

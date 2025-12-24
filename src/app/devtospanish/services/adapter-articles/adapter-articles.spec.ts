import { TestBed } from '@angular/core/testing';

import { AdapterArticlesService } from './adapter-articles';

describe('AdapterArticlesService', () => {
  let service: AdapterArticlesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdapterArticlesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

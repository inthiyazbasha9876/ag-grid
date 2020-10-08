import { TestBed } from '@angular/core/testing';

import { DefaultfunctionsService } from './defaultfunctions.service';

describe('DefaultfunctionsService', () => {
  let service: DefaultfunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultfunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

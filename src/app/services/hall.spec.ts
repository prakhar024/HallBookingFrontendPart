import { TestBed } from '@angular/core/testing';

import { Hall } from './hall';

describe('Hall', () => {
  let service: Hall;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Hall);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

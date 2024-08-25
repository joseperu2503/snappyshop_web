import { TestBed } from '@angular/core/testing';

import { AddressStore } from './address.store';

describe('AddressStore', () => {
  let service: AddressStore;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddressStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

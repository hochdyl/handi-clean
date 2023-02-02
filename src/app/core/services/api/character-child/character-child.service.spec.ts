import { TestBed } from '@angular/core/testing';

import { CharacterChildService } from './character-child.service';

describe('CharacterChildService', () => {
  let service: CharacterChildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CharacterChildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

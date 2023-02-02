import { TestBed } from '@angular/core/testing';

import { ChildGameService } from './child-game.service';

describe('ChildGameService', () => {
  let service: ChildGameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChildGameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

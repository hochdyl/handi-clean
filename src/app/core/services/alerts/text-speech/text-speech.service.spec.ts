import { TestBed } from '@angular/core/testing';

import { TextSpeechService } from './text-speech.service';

describe('TextSpeechService', () => {
  let service: TextSpeechService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TextSpeechService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

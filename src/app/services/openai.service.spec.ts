/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OpenaiService } from './openai.service';

describe('Service: Openai', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OpenaiService]
    });
  });

  it('should ...', inject([OpenaiService], (service: OpenaiService) => {
    expect(service).toBeTruthy();
  }));
});

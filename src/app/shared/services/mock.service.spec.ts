import { TestBed } from '@angular/core/testing';

import { MockService } from './mock.service';
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('MockServiceService', () => {
  let service: MockService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(MockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

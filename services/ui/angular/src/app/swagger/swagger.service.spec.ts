import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SwaggerService } from './swagger.service';

describe('SwaggerService', () => {
  let service: SwaggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    service = TestBed.inject(SwaggerService);
  });

  it('should be created', () => {
    expect(service).toBeDefined();
  });
});

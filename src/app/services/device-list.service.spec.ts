import { TestBed } from '@angular/core/testing';

import { DeviceListService } from './device-list.service';
import { HttpClientModule } from '@angular/common/http';

describe('DeviceListService', () => {
  let service: DeviceListService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });
    service = TestBed.inject(DeviceListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

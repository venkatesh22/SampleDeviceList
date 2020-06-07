import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeviceListComponent } from './device-list.component';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { DeviceListService } from '../../services/device-list.service';
import { HttpClientModule } from '@angular/common/http';

describe('DeviceListComponent', () => {
  let component: DeviceListComponent;
  let fixture: ComponentFixture<DeviceListComponent>;
  const routerSpy = jasmine.createSpyObj('Router', ['navigateTo']);
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceListComponent ],
      imports: [HttpClientModule],
      providers: [AuthService, DeviceListService, {provide: Router, useValue: routerSpy}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

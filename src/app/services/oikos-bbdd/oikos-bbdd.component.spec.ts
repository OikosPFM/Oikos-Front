import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OikosBbddComponent } from './oikos-bbdd.component';

describe('OikosBbddComponent', () => {
  let component: OikosBbddComponent;
  let fixture: ComponentFixture<OikosBbddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OikosBbddComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OikosBbddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

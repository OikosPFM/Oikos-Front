import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateInstalacionComponent } from './create-instalacion.component';

describe('CreateInstalacionComponent', () => {
  let component: CreateInstalacionComponent;
  let fixture: ComponentFixture<CreateInstalacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateInstalacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateInstalacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

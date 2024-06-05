import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearTemasComponent } from './crear-temas.component';

describe('CrearTemasComponent', () => {
  let component: CrearTemasComponent;
  let fixture: ComponentFixture<CrearTemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrearTemasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CrearTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

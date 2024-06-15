import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaAsignacionComponent } from './tarea-asignacion.component';

describe('TareaAsignacionComponent', () => {
  let component: TareaAsignacionComponent;
  let fixture: ComponentFixture<TareaAsignacionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TareaAsignacionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TareaAsignacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTareaModalComponent } from './create-tarea-modal.component';

describe('CreateTareaModalComponent', () => {
  let component: CreateTareaModalComponent;
  let fixture: ComponentFixture<CreateTareaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTareaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateTareaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

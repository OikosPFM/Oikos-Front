import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEntradaModalComponent } from './edit-entrada-modal.component';

describe('EditEntradaModalComponent', () => {
  let component: EditEntradaModalComponent;
  let fixture: ComponentFixture<EditEntradaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditEntradaModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditEntradaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

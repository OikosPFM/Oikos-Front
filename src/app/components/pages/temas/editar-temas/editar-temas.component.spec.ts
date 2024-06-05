import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarTemasComponent } from './editar-temas.component';

describe('EditarTemasComponent', () => {
  let component: EditarTemasComponent;
  let fixture: ComponentFixture<EditarTemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarTemasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

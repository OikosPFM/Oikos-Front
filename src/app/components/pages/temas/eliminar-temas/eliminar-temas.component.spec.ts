import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarTemasComponent } from './eliminar-temas.component';

describe('EliminarTemasComponent', () => {
  let component: EliminarTemasComponent;
  let fixture: ComponentFixture<EliminarTemasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarTemasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EliminarTemasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RespuestaForoComponent } from './respuesta-foro.component';

describe('RespuestaForoComponent', () => {
  let component: RespuestaForoComponent;
  let fixture: ComponentFixture<RespuestaForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RespuestaForoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RespuestaForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntradaForoComponent } from './entrada-foro.component';

describe('EntradaForoComponent', () => {
  let component: EntradaForoComponent;
  let fixture: ComponentFixture<EntradaForoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntradaForoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EntradaForoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

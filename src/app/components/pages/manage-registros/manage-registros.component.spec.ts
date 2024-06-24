import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRegistrosComponent } from './manage-registros.component';

describe('ManageRegistrosComponent', () => {
  let component: ManageRegistrosComponent;
  let fixture: ComponentFixture<ManageRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageRegistrosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

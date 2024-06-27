import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageInstalacionesComponent } from './manage-instalaciones.component';

describe('ManageInstalacionesComponent', () => {
  let component: ManageInstalacionesComponent;
  let fixture: ComponentFixture<ManageInstalacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageInstalacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ManageInstalacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

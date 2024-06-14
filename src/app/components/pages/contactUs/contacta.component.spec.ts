import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderLayoutComponent } from '../../layout/header/header.component';
import { NavbarComponent } from '../../layout/header/navbar/navbar.component';
import { ContactComponent } from './contacta.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLayoutComponent, NavbarComponent, ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

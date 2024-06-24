import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderLayoutComponent } from '../../layout/header/header.component';
import { NavbarComponent } from '../../layout/header/navbar/navbar.component';
import { AboutComponent } from './about.component';

describe('AboutComponent', () => {
  let component: AboutComponent;
  let fixture: ComponentFixture<AboutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLayoutComponent, NavbarComponent, AboutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AboutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderLayoutComponent } from '../../layout/header/header.component';
import { NavbarComponent } from '../../layout/header/navbar/navbar.component';
import { ContactComponent } from './contacta.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;
  let de: DebugElement;
  let el: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderLayoutComponent, NavbarComponent, ContactComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('form'));
    el = de.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should have a form', () => {
    expect(el).toBeTruthy();
  });

  it('should render email input', () => {
    const emailInput = fixture.debugElement.query(
      By.css('input[name=email]')
    ).nativeElement;
    expect(emailInput).toBeTruthy();
  });

  it('should render subject input', () => {
    const subjectInput = fixture.debugElement.query(
      By.css('input[name=subject]')
    ).nativeElement;
    expect(subjectInput).toBeTruthy();
  });

  it('should render message textarea', () => {
    const messageTextarea = fixture.debugElement.query(
      By.css('textarea[name=message]')
    ).nativeElement;
    expect(messageTextarea).toBeTruthy();
  });

  it('should call sendEmail on form submit', () => {
    spyOn(component, 'sendEmail');
    el.dispatchEvent(new Event('submit'));
    expect(component.sendEmail).toHaveBeenCalled();
  });
});

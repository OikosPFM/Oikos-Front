import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterLayoutComponent } from './footer.component';

describe('FooterComponent', () => {
  let component: FooterLayoutComponent;
  let fixture: ComponentFixture<FooterLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FooterLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

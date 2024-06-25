import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackFooterComponent } from './backFooter.component';

describe('FooterComponent', () => {
  let component: BackFooterComponent;
  let fixture: ComponentFixture<BackFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BackFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BackFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

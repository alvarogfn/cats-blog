import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { LoadingComponent } from './loading.component';

describe('LoadingComponent', () => {
  let component: LoadingComponent;
  let textElement: DebugElement;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingComponent],
      imports: [NoopAnimationsModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    textElement = fixture.debugElement.query(By.css('p'));
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should display the phrase in the template', () => {
    expect(textElement.nativeElement.textContent).toContain(component.phrase);
  });
});

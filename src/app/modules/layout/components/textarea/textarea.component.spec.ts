import { DebugElement, ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;
  let textAreaElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TextareaComponent],
      providers: [],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
    component = fixture.componentInstance;
    textAreaElement = fixture.debugElement.query(By.css('textarea'));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the label in the template', () => {
    let labelElement = fixture.debugElement.query(By.css('label'));
    expect(labelElement.nativeElement.textContent).toContain(component.label);
  });

  it('should display the placeholder in the input', () => {
    expect(textAreaElement.nativeElement.placeholder).toContain(
      component.placeholder
    );
  });

  it('should initialize the input empty', () => {
    expect(textAreaElement.nativeElement.value).toEqual('');
  });

  it('should textarea and textarearef be defined after view init', () => {
    component.ngAfterViewInit();

    expect(component.textarea).toBeDefined();
    expect(component.textareaRef).toBeDefined();
  });
});

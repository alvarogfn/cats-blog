import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let inputElement: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InputComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);

    component = fixture.componentInstance;
    inputElement = fixture.debugElement.query(By.css('input'));
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
    expect(inputElement.nativeElement.placeholder).toContain(
      component.placeholder
    );
  });

  it('should initialize the input empty', () => {
    expect(inputElement.nativeElement.value).toEqual('');
  });

  it('should input type be set in template', () => {
    expect(inputElement.nativeElement.type).toEqual(component.type);
  });
});

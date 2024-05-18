import { Component, Input } from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class InputComponent {
  @Input() label: string = 'label';
  @Input() placeholder: string = 'My cat ate my boot';
  @Input() controlName: string = '';
  @Input() type: string = 'text';
}

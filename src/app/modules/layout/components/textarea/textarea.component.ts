import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { ControlContainer, FormGroupDirective } from '@angular/forms';

@Component({
  selector: 'app-textarea',
  templateUrl: './textarea.component.html',
  styleUrls: ['./textarea.component.scss'],
  viewProviders: [
    {
      provide: ControlContainer,
      useExisting: FormGroupDirective,
    },
  ],
})
export class TextareaComponent implements AfterViewInit {
  @Input() label: string = 'label';
  @Input() placeholder: string =
    'Then I something, and BOOM, something after...';
  @Input() controlName: string = '';

  @ViewChild('textarea') textareaRef: ElementRef | undefined;

  textarea: HTMLTextAreaElement | undefined;
  textareaHeight: number = 100;

  constructor() {}

  ngAfterViewInit(): void {
    if (this.textareaRef === undefined) return;
    this.textarea = this.textareaRef.nativeElement as HTMLTextAreaElement;

    this.textarea.addEventListener('scroll', () => {
      const height = +this.textarea!.style.height.replace('px', '');
      const scrollHeight = this.textarea!.scrollHeight;

      if (height < scrollHeight)
        this.textareaHeight = this.textarea!.scrollHeight + 5;
      // +5 just adds a better look at the height
    });
  }
}

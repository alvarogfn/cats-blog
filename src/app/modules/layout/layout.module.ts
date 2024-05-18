import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleComponent } from './components/page-title/page-title.component';
import { CardComponent } from './components/card/card.component';
import { InputComponent } from './components/input/input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoadingComponent } from './components/loading/loading.component';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    PageTitleComponent,
    CardComponent,
    InputComponent,
    TextareaComponent,
    LoadingComponent,
    ErrorComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule, FormsModule],
  exports: [
    PageTitleComponent,
    CardComponent,
    InputComponent,
    TextareaComponent,
    LoadingComponent,
    ErrorComponent,
  ],
})
export class LayoutModule {}

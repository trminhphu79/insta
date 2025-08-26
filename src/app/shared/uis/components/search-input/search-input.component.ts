import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostListener,
  ViewChild,
  forwardRef,
  input,
  output,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'insta-search-input',
  standalone: true,
  imports: [IonIcon],
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SearchInputComponent),
      multi: true,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchInputComponent implements ControlValueAccessor {
  placeholder = input<string>('Tìm kiếm');

  focused = output<void>();
  blurred = output<void>();
  focusChange = output<boolean>();

  @ViewChild('inputEl', { static: true })
  inputEl!: ElementRef<HTMLInputElement>;

  value = '';
  disabled = false;

  private onChange: (v: any) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(v: any): void {
    this.value = v ?? '';
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  handleInput(e: Event) {
    const v = (e.target as HTMLInputElement).value;
    this.value = v;
    this.onChange(v);
  }

  focus() {
    if (!this.disabled) this.inputEl.nativeElement.focus();
  }

  @HostListener('focusin')
  onFocusIn() {
    this.focused.emit();
    this.focusChange.emit(true);
  }

  @HostListener('focusout')
  onFocusOut() {
    this.onTouched();
    this.blurred.emit();
    this.focusChange.emit(false);
  }

  clearValue() {
    this.value = '';
    this.onChange(this.value);
    this.inputEl?.nativeElement.focus();
  }
}

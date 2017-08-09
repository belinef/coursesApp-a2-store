import { Directive, ElementRef, HostListener, Input, Output, EventEmitter } from '@angular/core';

@Directive({
  selector: '[contenteditableModel]',
  host: {
    '(blur)': 'onBlur()',
    '(keydown)': 'onKeyDown($event)'
  }
})
export class ContentEditable {
  @Input('contenteditableModel') model: any;
  @Input('editable') editable: boolean;
  @Output('editChanged') changed = new EventEmitter();
  @Output('contenteditableModelChange') update = new EventEmitter();

  private lastViewModel: any;

  constructor(private el: ElementRef) {
  }

  @HostListener('mouseenter') onMouseEnter() {
    if(this.editable) {
      this.highlight('yellow');
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.highlight(null);
  }

  private highlight(color: string) {
    this.el.nativeElement.style.backgroundColor = color;
  }

  public ngOnChanges(changes) {
    if(changes && changes.editable && changes.editable.currentValue) {
      setTimeout(() => {
        const range = document.createRange();
        var sel = window.getSelection();

        range.setStart(this.el.nativeElement, 0);
        range.setEnd(this.el.nativeElement, 1);
        sel.removeAllRanges();
        sel.addRange(range);
      }, 0);
    }

    this.el.nativeElement.setAttribute('contentEditable', this.editable);
    this.lastViewModel = this.model;
    this.refreshView();
  }

  public onBlur() {
    const value = this.el.nativeElement.innerText;
    this.lastViewModel = value;

    this.changed.emit(value);
    this.update.emit(value);
  }

  private refreshView() {
    this.el.nativeElement.innerText = this.model;
  }
}

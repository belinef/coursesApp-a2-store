import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cdp-swap',
  styleUrls: ['swap.styles.css'],
  templateUrl: 'swap.tmpl.html'
})
export class SwapComponent {
  public search : string = '';
  public resultListChecked = {};
  public availableListChecked = {};

  @Input() loading: boolean = false;

  @Input() current: Array<string> = [];

  @Input() available: Array<string> = [];

  @Output('onSearch')
  searchAuthor: EventEmitter<string> = new EventEmitter<string>();

  @Output('onAddNew')
  addAuthor: EventEmitter<string> = new EventEmitter<string>();

  @Output('onSwap')
  swap: EventEmitter<Array<string>> = new EventEmitter<Array<string>>();


  constructor() {}

  itemSelection(index: number, type: string): void {
    this[`${type}ListChecked`][index] ?
      this[`${type}ListChecked`][index] = false :
      this[`${type}ListChecked`][index] = true;
  }

  findItems() {
    this.searchAuthor.emit(this.search);
  }

  addNewItem() {
    this.addAuthor.emit(this.search);
  }

  swapFromCurrent() {
    for (let index in this.resultListChecked) {
      if (!this.available.includes(this.current[index])) {
        this.available.push(this.current[index]);
      }
      this.current[index] = null;
    }

    this.current = this.current.filter(author => author);
    this.resultListChecked = {};

    this.swap.emit(this.current);
  }

  swapToCurrent() {
    for (let index in this.availableListChecked) {
      if (!this.current.includes(this.available[index])) {
        this.current.push(this.available[index]);
      }
    }

    this.availableListChecked = {};

    this.swap.emit(this.current);
  }
}

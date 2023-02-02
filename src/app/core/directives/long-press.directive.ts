import {Directive, EventEmitter, HostListener, Output} from '@angular/core';

@Directive({
  standalone: true,
  selector: '[longPress]'
})
export class LongPressDirective {
  private threshold = 1500;
  private timeout: any;

  @Output()
  private longPress = new EventEmitter();

  @HostListener('mousedown') onMouseDown( e ) {
    this.timeout = setTimeout(() => {
      this.longPress.emit( e );
    }, this.threshold);
  }

  @HostListener('mouseup') onMouseUp() {
    clearTimeout(this.timeout);
  }

  @HostListener('mouseleave') onMouseLeave() {
    clearTimeout(this.timeout);
  }
}

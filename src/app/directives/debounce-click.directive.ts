import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[appDebounceClick]',
  standalone: true,
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() appDebounceClick: number = 300;
  @Output() debounceClick = new EventEmitter<MouseEvent>();

  private clicks = new Subject<MouseEvent>();
  private subscription: Subscription | undefined;

  ngOnInit() {
    this.subscription = this.clicks.pipe(
      debounceTime(this.appDebounceClick)
    ).subscribe(event => {
      this.debounceClick.emit(event);
    });
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  // Escuta o evento de clique padrão do elemento
  @HostListener('click', ['$event'])
  clickEvent(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}

import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, map, take, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription = new Subscription;

  constructor() {
    this.intervalSubs = this.retornarIntervalo().subscribe( console.log );
   }
  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornarIntervalo():Observable<number> {
    return interval(100)
      .pipe(
          take(20),
          map( valor => valor + 1 ),
          filter( valor => (valor % 2 === 0) ? true : false),
      )
  }

}

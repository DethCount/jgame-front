import { Component, OnInit, Input } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'

import { ShipRequestObserver } from '../ship-request-observer'

@Component({
  selector: 'app-ship-request-observer',
  templateUrl: './ship-request-observer.component.html',
  styleUrls: ['./ship-request-observer.component.sass']
})
export class ShipRequestObserverComponent implements OnInit {
  @Input() observer: ShipRequestObserver

  tooltip: string = ""

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.get(""+this.observer.request.type)
      .subscribe((data) => {
        this.tooltip = data
      })
  }

}

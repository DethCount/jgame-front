import { Component, OnInit, Input } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'

import { ConstructionType } from '../construction-type'
import { ConstructionRequestObserver } from '../construction-request-observer'

@Component({
  selector: 'app-construction-request-observer',
  templateUrl: './construction-request-observer.component.html',
  styleUrls: ['./construction-request-observer.component.sass']
})
export class ConstructionRequestObserverComponent implements OnInit {
  @Input() observer: ConstructionRequestObserver
  tooltip: string = ""

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.get(""+this.observer.request.type)
      .subscribe((data) => {
        this.tooltip = data
      })
  }

}

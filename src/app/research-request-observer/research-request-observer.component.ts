import { Component, OnInit, Input } from '@angular/core';

import { TranslateService } from '@ngx-translate/core'

import { ResearchRequestObserver } from '../research-request-observer'

@Component({
  selector: 'app-research-request-observer',
  templateUrl: './research-request-observer.component.html',
  styleUrls: ['./research-request-observer.component.sass']
})
export class ResearchRequestObserverComponent implements OnInit {
  @Input() observer: ResearchRequestObserver

  tooltip: string = ""

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.get(""+this.observer.request.type)
      .subscribe((data) => {
        this.tooltip = data
      })
  }

}

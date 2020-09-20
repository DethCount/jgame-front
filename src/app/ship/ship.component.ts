import { Component, Input, OnInit } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'

import { ShipType } from '../ship-type'

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.sass']
})
export class ShipComponent implements OnInit {
  @Input() type: string
  @Input() nb: number

  realType: ShipType
  tooltip: string = ""

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    this.realType = ShipType[this.type]
    this.translate.get(this.type)
      .subscribe((data: string) => {
        this.tooltip = data;
      });
  }

}

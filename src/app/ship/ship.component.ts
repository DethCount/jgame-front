import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'

import { AdministrableLocation } from '../administrable-location'
import { AdministrableLocationService } from '../administrable-location/administrable-location.service'
import { ShipType } from '../ship-type'
import { ShipRequest } from '../ship-request'

@Component({
  selector: 'app-ship',
  templateUrl: './ship.component.html',
  styleUrls: ['./ship.component.sass']
})
export class ShipComponent implements OnInit {
  @Input() administrableLocation: AdministrableLocation
  @Input() type: string
  @Input() nb: number

  @Output() onbuild = new EventEmitter<AdministrableLocation>()

  realType: ShipType
  tooltip: string = ""

  constructor(
    private translate: TranslateService,
    private administrableLocationService: AdministrableLocationService
  ) {
  }

  ngOnInit() {
    this.realType = ShipType[this.type]
    this.translate.get(this.type)
      .subscribe((data: string) => {
        this.tooltip = data;
      });
  }

  buildNextLevel(event) {
    this.administrableLocationService.pushToProd(
      new ShipRequest(
        this.realType,
        1,
        this.administrableLocation,
        undefined
      )
    )
      .subscribe((data: AdministrableLocation) => {
        this.onbuild.emit(data);
      });
  }
}

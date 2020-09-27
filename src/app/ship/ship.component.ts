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
  @Input() type: ShipType
  @Input() nb: number

  @Output() build = new EventEmitter<AdministrableLocation>()

  tooltip: string = ""

  constructor(
    private translate: TranslateService,
    private administrableLocationService: AdministrableLocationService
  ) {
  }

  ngOnInit() {
    this.translate.get(this.type.name)
      .subscribe((data: string) => {
        this.tooltip = data;
      });
  }

  buildNextLevel(event) {
    this.administrableLocationService.pushToProd(
      new ShipRequest(
        this.type,
        1,
        this.administrableLocation,
        undefined
      )
    )
      .subscribe((data: AdministrableLocation) => {
        this.administrableLocation = data
        this.build.emit(data);
      });
  }
}

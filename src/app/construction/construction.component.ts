import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'

import { ConstructionType } from '../construction-type'
import { ConstructionRequest } from '../construction-request'
import { AdministrableLocation } from '../administrable-location'
import { AdministrableLocationService } from '../administrable-location/administrable-location.service'

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.sass']
})
export class ConstructionComponent implements OnInit {
  @Input() administrableLocation: AdministrableLocation
  @Input() type: string
  @Input() level: number

  @Output() onbuild = new EventEmitter<AdministrableLocation>()

  realType: ConstructionType
  tooltip: string = ""

  constructor(
    private translate: TranslateService,
    private administrableLocationService: AdministrableLocationService
  ) {
  }

  ngOnInit() {
    this.realType = ConstructionType[this.type];
    this.translate.get(this.type)
      .subscribe((data: string) => {
        this.tooltip = data;
      });
  }

  buildNextLevel(event) {
    this.administrableLocationService.pushToProd(
      new ConstructionRequest(
        this.realType,
        this.level + 1,
        this.administrableLocation,
        undefined
      )
    )
      .subscribe((data: AdministrableLocation) => {
        this.onbuild.emit(data);
      });
  }
}

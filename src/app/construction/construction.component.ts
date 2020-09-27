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
  @Input() type: ConstructionType
  @Input() level: number

  @Output() onbuild = new EventEmitter<AdministrableLocation>()

  tooltip: string = ""

  constructor(
    private translate: TranslateService,
    private administrableLocationService: AdministrableLocationService
  ) {}

  ngOnInit() {
    console.log('construction init', this.administrableLocation, this.type, this.level);
    this.translate.get(this.type.name)
      .subscribe((data: string) => {
        this.tooltip = data;
      });
  }

  buildNextLevel(event) {
    this.administrableLocationService.pushToProd(
      new ConstructionRequest(
        this.type,
        this.level + 1,
        this.administrableLocation,
        undefined
      )
    )
      .subscribe((data: AdministrableLocation) => {
        console.log('buildNextLevel subscribe', data, this.onbuild);
        this.onbuild.emit(data);
        console.log('emitted', data, this.onbuild);
      });
  }
}

import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { TranslateService } from '@ngx-translate/core'

import { Research } from '../research'
import { ResearchRequest } from '../research-request'
import { AdministrableLocation } from '../administrable-location'
import { AdministrableLocationService } from '../administrable-location/administrable-location.service'

@Component({
  selector: 'app-research',
  templateUrl: './research.component.html',
  styleUrls: ['./research.component.sass']
})
export class ResearchComponent implements OnInit {
  @Input() administrableLocation: AdministrableLocation
  @Input() type: Research
  @Input() level: number

  @Output() build = new EventEmitter<ResearchComponent>()

  tooltip: string = ""

  constructor(
    private translate: TranslateService,
    private administrableLocationService: AdministrableLocationService
  ) {}

  ngOnInit() {
    console.log('construction init', this.administrableLocation, this.type, this.level);
    console.log("Build Observers: " + this.build.observers.length);
    this.translate.get(this.type.name)
      .subscribe((data: string) => {
        this.tooltip = data;
      });
  }

  buildNextLevel(event) {
    this.administrableLocationService.pushToProd(
      new ResearchRequest(
        this.type,
        this.level + 1,
        this.administrableLocation,
        undefined
      )
    )
      .subscribe((data: AdministrableLocation) => {
        console.log('buildNextLevel subscribe', data);
        this.administrableLocation = data;
        this.build.emit(this);
        console.log('emitted', this);
      });
  }
}

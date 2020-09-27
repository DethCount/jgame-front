import { Component, OnInit, Input } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'

import { AdministrableLocation } from '../administrable-location'

@Component({
  selector: 'app-administrable-location-btn',
  templateUrl: './administrable-location-btn.component.html',
  styleUrls: ['./administrable-location-btn.component.sass']
})
export class AdministrableLocationBtnComponent implements OnInit {
  @Input() administrableLocation: AdministrableLocation
  @Input() level: number

  tooltip: string = ""

  constructor(private translate: TranslateService) { }

  ngOnInit(): void {
    this.translate.get(this.administrableLocation.name)
      .subscribe((data: string) => {
        this.tooltip = data;
      });
  }

}

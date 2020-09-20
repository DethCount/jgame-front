import { Component, Input, OnInit } from '@angular/core'

import { TranslateService } from '@ngx-translate/core'

import { ConstructionType } from '../construction-type'

@Component({
  selector: 'app-construction',
  templateUrl: './construction.component.html',
  styleUrls: ['./construction.component.sass']
})
export class ConstructionComponent implements OnInit {
  @Input() type: string
  @Input() level: number

  realType: ConstructionType
  tooltip: string = ""

  constructor(private translate: TranslateService) {
  }

  ngOnInit() {
    this.realType = ConstructionType[this.type];
    this.translate.get(this.type)
      .subscribe((data: string) => {
        this.tooltip = data;
      });
  }
}

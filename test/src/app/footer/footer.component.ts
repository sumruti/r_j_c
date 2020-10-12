import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MissionService } from '../app.service';
import { LanguageService } from '../app.language';
declare var $: any;

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  footerClosed = false;
  succesSeller = false;
  footer:any;

  constructor(private missionService: MissionService, private _lang: LanguageService) {
    missionService.missionheaderOpen$.subscribe(
      headerOpen => {
        this.footerClosed = true;
      });
    missionService.missionheaderClose$.subscribe(
      headerClose => {
        this.footerClosed = true;
      });
    missionService.missionheaderClosed$.subscribe(
      headerClosed => {
        this.footerClosed = false;
      });
    missionService.missionheaderHelpClose$.subscribe(
      headerHelpClose => {
        this.footerClosed = true;
      });
    
  }

  ngOnInit() {
    this.footer = this._lang.engFooter;
  }

}

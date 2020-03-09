import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/service.index';
import { AppInitService } from './app-init.service';
declare var window: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  envirPath: any;
  
  constructor(
    public _ajustes: SettingsService,
    public _appInit: AppInitService
    ){}

    ngOnInit(){
      // this.init_app();
    }
    
    init_app(){
      this.getConfigs();
    }
    
    public getConfigs() {
      // return this._appInit.getJsonPath()
      // .subscribe( (path: any) => {
      //   this.envirPath = path
      //   this.getSpecificConfig();
      // });
    }

    public getSpecificConfig(){
      
      // return this._appInit.getSpecificConfig(this.envirPath)
      // .subscribe( (config: any) => {
      //   window.config = config;
      //   console.log( 'App componenet', config )
      // })
    }
}

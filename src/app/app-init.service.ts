import { Injectable, OnInit } from '@angular/core';
import { from } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import configEX from '../assets/environments/env-route.json';
declare var window: any;

@Injectable({
  providedIn: "root"
})
export class AppInitService {
  envirPath: string;
  constructor(public http: HttpClient) {}

  public getSpecificConfig(){
    return this.http.get( configEX.path + '/config.json' )
    .pipe(
      map( (config: any) => {
        window.config = config;
        return config;
      })
    ).toPromise();
  }
}

import { Injectable, OnInit } from '@angular/core';
import { from } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
declare var window: any;

@Injectable({
  providedIn: "root"
})
export class AppInitService {
  envirPath: string;
  constructor(public http: HttpClient) {}

  public getJsonPath() {
  // public init() {
    return this.http
      .get("assets/config.json")
      .pipe(
        map((path: any) => {
          this.getSpecificConfig( path.path )
          return path.path;
        })
      ).toPromise();
  }

  public getSpecificConfig( envPath: string ){
    return this.http.get( envPath + '/config.json' )
    .pipe(
      map( (config: any) => {
        window.config = config;
        return config;
      })
    ).toPromise();
  }

  // Example
  public init() {

    return from(
      fetch( "assets/config.json").then((respone) => {
        return respone.json();
      })
    ).pipe(
      map((config: any) => {
        from(
          fetch(config.path + '/config.json').then((resp) =>{
            return resp.json()
          })
        ).pipe(
          map((secConfig: any) => {
            window.config = secConfig;
            console.log('Secnd CONFIG', secConfig);
            return secConfig;
          })
        ).toPromise() // end from

        return config;
      })
    ).toPromise()
  }
}

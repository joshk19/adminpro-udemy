import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
declare var window: any;

@Injectable({
  providedIn: 'root'
})
export class AppInitService {

  public init() {
    return from(
      fetch('assets/config.json').then( ( respone: any ) => {
        return respone.json();
      })
      ).pipe(
        map((config: any) => {
          window.config = config;
          console.log( 'Estamos corriendo en: ', config.message);
          return config;
      })
    ).toPromise()
  }
}

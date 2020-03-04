import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { Hospital } from '../../models/hospital.model';

// Remedio para error en sweetAlert
// import * as _swal from "sweetalert";
// import { SweetAlert } from "sweetalert/typings/core";
// const swal: SweetAlert = _swal as any;

import { Usuario } from '../../models/usuario.model';
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  token: string;
  usuario: Usuario;

  totalHospitales: number;

  constructor(
    public http: HttpClient
  ) {
    this.cargarStorage();
   }


  cargarStorage(){
    if(localStorage.getItem('token')){
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse( localStorage.getItem('usuario'))
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

  crearHospital(nombre: string){
    let url = URL_SERVICIOS + '/hospital';
    url += '?token=' + this.token;
    return this.http.post(url, {nombre})
    .pipe(
      map((resp: any) => {
        // swal('Hospital creado', resp.hospital.nombre, 'success');
        return resp.hospital;
      })
    )
  }

  cargarHospitales( desde: number = 0){
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url )
    .pipe(
      map( (resp: any) => {
        this.totalHospitales = resp.total;
        return resp.hospitales;
      })
    )
  }

  obtenerHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url );
  }

  buscarHopsitales( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;

    return this.http.get( url )
    .pipe(
      map( (resp: any) => resp.hospitales )
    );
  }

  actualizarHospital(hospital: Hospital){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += '?token=' + this.token;

    return this.http.put(url, hospital)
    .pipe(
      map( (resp: any) => {
        // swal('Hospital actualizado', hospital.nombre, 'success');
        return true;
      })
    )
  }

  borrarHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += '?token=' + this.token;

    return this.http.delete( url )
    .pipe(
      map( resp => {
        // swal('Hospital borrado', 'El hospital ha sido eliminado correctamente', 'success');
        return true;
      })
    )
  }
}
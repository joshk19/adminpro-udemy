import { Component, OnInit } from "@angular/core";
import { HospitalService } from "../../services/service.index";
import { Hospital } from "../../models/hospital.model";
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

// declare var swal: any;

@Component({
  selector: "app-hospitales",
  templateUrl: "./hospitales.component.html",
  styles: []
})
export class HospitalesComponent implements OnInit {
  hospitales: Hospital[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService
    ) {}

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarHospitales() );
  }

  cargarHospitales() {
    this.cargando = true;

    this._hospitalService
      .cargarHospitales(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = this._hospitalService.totalHospitales;
        this.hospitales = resp;
        this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this._hospitalService.totalHospitales) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  buscarHospital(termino: string) {
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService
      .buscarHopsitales(termino)
      .subscribe((hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.cargando = false;
      });
  }

  mostrarModal( id: string ){
    this._modalUploadService.mostrarModal( 'hospitales', id );
  }

  crearHospital() {
    // swal("Escribe el nombre del hospital", {
    //   content: "input",
    //   buttons: true
    // }).then( (value) => {
    //   if(value){
    //     this._hospitalService.crearHospital(value)
    //     .subscribe((resp: any) => {
    //       this.cargarHospitales();
    //     });
    //   }
    // });
  }

  // obtenerHospital(id: string) {
  //   this._hospitalService.obtenerHospital(id)
  //   .subscribe((resp: any) => {
  //   });
  // }

  guardarHospital( hospital: Hospital ){
    if( hospital.nombre.trim().length <= 0 ){
      // swal( 'No debe estar vacio','No puede estar vacio el nombre del hospital', 'error');
    }
    this._hospitalService.actualizarHospital( hospital )
    .subscribe(); 
  }

  borrarHospital( hospital: Hospital){
    // swal({
    //   title: '¿Estas seguro?',
    //   text: 'Estas a punto de borrar a ' + hospital.nombre,
    //   icon: 'warning',
    //   buttons: true,
    //   dangerMode: true
    // })
    // .then( borrar =>{
    //   if( borrar ) {
    //     this._hospitalService.borrarHospital( hospital._id )
    //     .subscribe( borrado => {
    //       this.cargarHospitales();
    //     });
    //   }
    // });
  }
}

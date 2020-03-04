import { Component, OnInit } from "@angular/core";
import { Medico } from "../../models/medico.model";
import { MedicoService } from "../../services/medico/medico.service";

// declare var swal: any;

@Component({
  selector: "app-medicos",
  templateUrl: "./medicos.component.html",
  styles: []
})
export class MedicosComponent implements OnInit {
  medicos: Medico[] = [];
  totalRegistros: number;
  desde: number = 0;

  constructor(public _medicosService: MedicoService) {}

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos() {
    this._medicosService.cargarMedicos( this.desde ).subscribe(medicos => {
      this.medicos = medicos,
      this.totalRegistros = this._medicosService.totalMedicos;
    });
  }

  buscarMedico(termino: string) {
    if (termino.length <= 0) {
      this.cargarMedicos();
      return;
    }

    this._medicosService.buscarMedicos(termino).subscribe(medicos => {
      this.medicos = medicos;
    });
  }

  borrarMedico(medico: Medico) {
    // swal({
    //   title: "¿Estas seguro?",
    //   text: "Estas a punto de borrar a " + medico.nombre,
    //   icon: "warning",
    //   buttons: true,
    //   dangerMode: true
    // }).then(borrar => {
    //   if (borrar) {
    //     this._medicosService.borrarMedico(medico._id).subscribe(() => {
    //       this.cargarMedicos();
    //     });
    //   }
    // });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this._medicosService.totalMedicos) {
      return;
    }
    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarMedicos();
  }
}

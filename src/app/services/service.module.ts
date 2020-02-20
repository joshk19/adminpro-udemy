import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
  SettingsService,
  SidebarService,
  SharedService,
  UsuarioService,
  SubirArchivoService,
  HospitalService,
  MedicoService,
  //Guards
  LoginGuardGuard,
  AdminGuard
} from "./service.index";

@NgModule({
  declarations: [],
  imports: [CommonModule,
  HttpClientModule],
  providers: [
    SettingsService, 
    SidebarService, 
    SharedService,
    UsuarioService, 
    SubirArchivoService,
    ModalUploadService,
    HospitalService,
    MedicoService,
    //Guards
    LoginGuardGuard, 
    AdminGuard
  ]
})
export class ServiceModule {}

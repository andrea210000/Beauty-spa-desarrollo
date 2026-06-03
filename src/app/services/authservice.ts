import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class Authservice {

  constructor(private http: HttpClient) {} //Para hacer la injección de dependencias del HttpClient y hacer las peticiones HTTP

  private apiUrl = environment.apiUrl; //Obtenemos la URL de la API desde el archivo de entorno

  register(data: any) {
    return this.http.post(`${this.apiUrl}Auth/Register`, data); //Hacemos una petición POST a la API para registrar un nuevo usuario
  }

  Login(data: any){
    return this.http.post(`${this.apiUrl}Auth/Login`, data); //Hacemos una petición POST a la API para iniciar sesión
  }
  
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.css']
})
export class ManageComponent implements OnInit {
  theater: Theater
  mode:number // mode=1 -> View, mode=2 -> create, mode=3-> update
  theFormGroup: FormGroup;
  trySend: Boolean; //Indica si la persona hizo un intento de enviar información
  constructor(private theaterService: TheaterService, 
    private router:Router,
    private activateRoute:ActivatedRoute, //Visializar o tomar foto a la ruta
    private theFormBuilder: FormBuilder// Hace cumplir los validadores

  ) {
    this.theater = {id:0,capacity:0,location:""}
    this.mode=0;
    this.configFormGroup()
    this.trySend=false
   }

  ngOnInit(): void {
    const currentUrl = this.activateRoute.snapshot.url.join('/');//Tomar una foto y separar por /
    if (currentUrl.includes('view')) { // Si en esa lista incluye la palabra view
      this.mode = 1;
    } else if (currentUrl.includes('create')) {
      this.mode = 2;
    } else if (currentUrl.includes('update')) {
      this.mode = 3;
    }
    if(this.activateRoute.snapshot.params.id){
      this.theater.id = this.activateRoute.snapshot.params.id
      this.getTheater(this.theater.id)
    }
  }
  configFormGroup(){
    this.theFormGroup=this.theFormBuilder.group({ //theFormGroup es el que establece las reglas 
      // primer elemento del vector, valor por defecto
      // lista, serán las reglas
      capacity:[0,[Validators.required,Validators.min(1),Validators.max(100)]], //Reglas que riguen ese campo
      location:['',[Validators.required,Validators.minLength(2)]]
    })
  }
  get getTheFormGroup(){ //Para poder ser llamado desde la interfaz grafica 
    return this.theFormGroup.controls
  }
  getTheater(id:number){
    this.theaterService.view(id).subscribe(data => {
      this.theater=data
    })
  }
  create(){
    this.theaterService.create(this.theater).subscribe(data =>{
      Swal.fire("creado", "Se ha creado exitosamente","success")
      this.router.navigate(["theaters/list"])
    })
  }

  update(){
    this.theaterService.update(this.theater).subscribe(data =>{
      Swal.fire("Actualizado", "Se Actualizado exitosamente","success")
      this.router.navigate(["theaters/list"])
    })
  }

}

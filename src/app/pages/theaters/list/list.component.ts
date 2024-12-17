import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Theater } from 'src/app/models/theater.model';
import { TheaterService } from 'src/app/services/theater.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  theaters:Theater[]

  constructor(private theatersService:TheaterService,
     private router:Router ) { 
    this.theaters=[]
  }

  ngOnInit(): void {
  this.list()
  }
  list(){
    this.theatersService.list().subscribe(data =>{
      this.theaters=data
    })
  }
  delete(id:number){
    Swal.fire({ 
      title: 'Eliminar Theatro', 
      text: "Está seguro que quiere eliminar el Theatro?", 
      icon: 'warning', 
      showCancelButton: true, 
      confirmButtonColor: '#3085d6', 
      cancelButtonColor: '#d33', 
      confirmButtonText: 'Si, eliminar',
      cancelButtonText:'No, Cancelar'
      }).then((result) => { 
      if (result.isConfirmed) { 
      this.theatersService.delete(id). 
      subscribe(data => { 
      Swal.fire( 
      'Eliminado!', 
      'El Teatro ha sido eliminada correctamente', 
      'success'
      ) 
      this.ngOnInit();
      }); 
      } 
      }) 
  }
  update(id:number){
    this.router.navigate(["theaters/update/"+id])
  }
  view(id:number){
    this.router.navigate(["theaters/view/"+id])
  }
  viewSeats(TheaterId:number){
    this.router.navigate(["seats/list/"+TheaterId])
  }
  create(){
    this.router.navigate(["theaters/create"])
  }
}

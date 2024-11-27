import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  constructor(private activateRoute:ActivatedRoute) { }
  theaterId:number
  ngOnInit(): void {
    if(this.activateRoute.snapshot.params.id){
      this.theaterId = this.activateRoute.snapshot.params.theaterId
      //this.getSeats(theaterId)
    }
  }

}

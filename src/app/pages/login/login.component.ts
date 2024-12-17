import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { error } from 'console';
import { User } from 'src/app/models/user.model';
import { SecurityService } from 'src/app/services/security.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  theuser : User
  constructor( private securityService:SecurityService, private router:Router) {
    this.theuser={
      email:"", 
      password:""
    }
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
  login(){
    this.securityService.login(this.theuser).subscribe({
      next(data) {
          this.securityService.saveSession(data)
          this.router.navigate(["dashboard"])
      },
      error(error) {
        Swal.fire("Autenticación invalida", "usuario o contraseña invalido", "error")
      },
    })
  }  
}



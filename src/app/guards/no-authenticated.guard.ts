import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Route, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from '../services/security.service';

@Injectable({
  providedIn: 'root'
})
export class NoAuthenticatedGuard implements CanActivate {
    constructor(private securityService : SecurityService,
      private router: Route
    ){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if (this.securityService.existSession){ // Si existe la sesion debe de dejarlo  ingresar
        return true;
      }else{ //Si debe de devolverlo al login
        this.router.navigate(["/dashboard"]);
        return false;
      }  
  }
  
}

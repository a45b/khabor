import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AppService } from './shared/services/app.service';

@Injectable({
  providedIn: 'root'
})

export class AppGuardGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private appService: AppService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

      if (localStorage.getItem('appState')) {        
        const appState = JSON.parse(localStorage.getItem('appState'));    
        this.appService.changeCountry(appState.country);
        return true;
      } 

      this.setAppDefaultState();      
  }

  setAppDefaultState() {
    const appState = {
      country: {code: "in", name: "India"},
      language: { code: '',name: 'All'}
    };
    localStorage.setItem('appState', JSON.stringify(appState));

    this.router.navigate(['']);
    return true;
  }
  
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  private categorySource = new BehaviorSubject<any>({name: 'Top Headlines', value: 'general'});
  currentCategory = this.categorySource.asObservable();

  private countrySource = new BehaviorSubject<any>({});
  currentCountry = this.countrySource.asObservable();

  constructor() { }

  changeCategory(category: any) {    
    this.categorySource.next(category);    
  }

  changeCountry(country: any) {
    this.countrySource.next(country);
  }


}

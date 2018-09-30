import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { environment } from '../../../environments/environment';

const newsApi = {
  TOP_HEADLINES: 'top-headlines',
  EVERYTHING: 'everything',
  SOURCES: 'sources'
}

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getAllSources() {   
    const url: string = this.prepareEndPointUrl(newsApi.SOURCES);    
    return this.http.get(url);    
  }

  getTopHeadlines(category = null) {
    const url: string = this.prepareEndPointUrl(newsApi.TOP_HEADLINES);
    const qprams: string = this.prepareQueryParams(category);
    return this.http.get(url+qprams);    
  }

  private prepareEndPointUrl(route: string) {
    return `${environment.config.apiUrl}/${environment.config.apiVersion}/${route}`;
  }

  private prepareQueryParams(category) {
    if (localStorage.getItem('appState')) {
      const appState = JSON.parse(localStorage.getItem('appState'));          
      let qprams = `?country=${appState.country.code}`;
      
      if (category !== null) {
        qprams += `&category=${category.value}`
      }      

      // if (appState.language.code !== '') {
      //   this.getSourceByLang().map((i) => i.id).join(',')
      //   qprams += `&sources=${category.value}`
      // }
      
      return qprams;
    }
  }

  // private getSourceByLang() {    
  //   let result: any[] = [];
    
  //   if (localStorage.getItem('appState')) {      
  //     const appState = JSON.parse(localStorage.getItem('appState'));
  //     if (appState.language.code !== '') {        
  //       const allNewsSources: any[] = JSON.parse(localStorage.getItem('allNewsSources'));        
  //       if(allNewsSources) {          
  //         if(allNewsSources.length !== 0) {            
  //           result = allNewsSources.filter(s => {
  //             if(s.language === appState.language.code) {                
  //               return s;
  //             }                            
  //           });            
  //         }
  //       }
  //     }
  //   }

  //   return result;
  // }

}

import { Component, OnInit} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { pluck, map, filter, shareReplay } from 'rxjs/operators';
import { AppService } from './shared/services/app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {  

  title: string = 'khabor';
  sidenavMode: string = 'side';
  isSmallScreen: boolean = false;
  sidenavPos: string = 'start';    
  currentCountry: string = '';

  categories: any[] = [        
    {name: 'Top Headlines', value: 'general'},
    {name: 'Business', value: 'business'},
    {name: 'Entertainment', value: 'entertainment'},    
    {name: 'Health', value: 'health'},
    {name: 'Science', value: 'science'},
    {name: 'Sports', value: 'sports'},
    {name: 'Technology', value: 'technology'},
  ];     

  selectedCategory: any = {name: 'Top Headlines', value: 'general'};

  constructor(
    private _breakpointObserver: BreakpointObserver,
    private appService: AppService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.onResized();
    
    if (localStorage.getItem('appState')) {
      const appState = JSON.parse(localStorage.getItem('appState'));    
      this.currentCountry = appState.country.name;          
    }

    this.appService.currentCountry
    .subscribe(res => {      
      this.currentCountry = res.name;
    });

  }

  onResized() {
    this._breakpointObserver
    .observe(['(max-width: 901px)'])
    .pipe(pluck('matches'))
    .subscribe((m: boolean) => {
      this.isSmallScreen = m;
      this.sidenavMode = !m ? 'side' : 'over';
    });
  }

  setCategory(category: any) {    
    this.selectedCategory = category;
    this.appService.changeCategory(category);     
    this.router.navigate(['']);            
  }
  
}

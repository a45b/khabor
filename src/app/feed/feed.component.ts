import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/services/data.service';
import { AppService } from '../shared/services/app.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs/Observable';
import { pluck, map, filter, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit {

  articles: any[] = [];
  isLoading: boolean = false;
  isSmallScreen: boolean = false;
  
  constructor(
    private dataService: DataService,
    private appService: AppService,
    private _breakpointObserver: BreakpointObserver
  ) { }

  ngOnInit() {    
    this.onResized();
    this.appService.currentCategory
    .subscribe((category) => {
      this.getArticles(category);
    })
  }

  onResized() {
    this._breakpointObserver
    .observe(['(max-width: 901px)'])
    .pipe(pluck('matches'))
    .subscribe((m: boolean) => {
      this.isSmallScreen = m;      
    });
  }

  getArticles(category = null) {
    this.articles = [];
    this.isLoading = true;    
    this.dataService.getTopHeadlines(category)
    .subscribe((res: any) => {            
      this.isLoading = false;
      this.articles = res.articles;
    }, err => {
      this.isLoading = false;
    });
  }

}

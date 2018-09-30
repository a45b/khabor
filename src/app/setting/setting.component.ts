import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { DataService } from '../shared/services/data.service';
import { AppService } from '../shared/services/app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent implements OnInit {

  countries: any[] = [
    {code: "ar", name: "Argentina"},
    {code: "at", name: "Austria"},
    {code: "au", name: "Australia"},
    {code: "be", name: "Belgium"},
    {code: "bg", name: "Bulgaria"},
    {code: "br", name: "Brazil"},
    {code: "ca", name: "Canada"},    
    {code: "cn", name: "China"},
    {code: "co", name: "Colombia"},
    {code: "cu", name: "Cuba"},
    {code: "cz", name: "Czech Republic"},    
    {code: "eg", name: "Egypt"},
    {code: "fr", name: "France"},    
    {code: "de", name: "Germany"},
    {code: "gr", name: "Greece"},
    {code: "hk", name: "Hong Kong"},
    {code: "hu", name: "Hungary"},
    {code: "id", name: "Indonesia"},
    {code: "ie", name: "Ireland"},      
    {code: "il", name: "Israel"},
    {code: "in", name: "India"},
    {code: "it", name: "Italy"},
    {code: "jp", name: "Japan"},    
    {code: "lt", name: "Lithuania"},
    {code: "lv", name: "Latvia"},
    {code: "ma", name: "Morocco"},
    {code: "mx", name: "Mexico"},
    {code: "my", name: "Malaysia"},
    {code: "ng", name: "Nigeria"},
    {code: "nl", name: "Netherlands"},
    {code: "no", name: "Norway"},
    {code: "nz", name: "New Zealand"},
    {code: "ph", name: "Philippines"},
    {code: "pk", name: "Pakistan"},
    {code: "pl", name: "Poland"},
    {code: "pt", name: "Portugal"},
    {code: "ro", name: "Romania"},
    {code: "ru", name: "Russia"},    
    {code: "sa", name: "Saudi Arabia"},
    {code: "rs", name: "Serbia"},
    {code: "kr", name: "South Korea"},
    {code: "ch", name: "Switzerland"},
    {code: "se", name: "Sweden"},
    {code: "sg", name: "Singapore"},
    {code: "si", name: "Slovenia"},
    {code: "sk", name: "Slovakia"},
    {code: "za", name: "South Africa"},
    {code: "th", name: "Thailand"},
    {code: "tr", name: "Turkey"},
    {code: "tw", name: "Taiwan"},
    {code: "ua", name: "Ukraine"},        
    {code: "us", name: "United States"},
    {code: "gb", name: "United Kingdom"},
    {code: "ae", name: "United Arab Emirates"},
    {code: "ve", name: "Venezuela"},    
  ];  

  languages: any[] = [
    { code: '',name: 'All'},
    { code: 'ar',name: 'Arabic'},
    { code: 'de',name: 'German'},
    { code: 'en',name: 'English'},
    { code: 'es',name: 'Spanish'},
    { code: 'fr',name: 'French'},
    { code: 'he',name: 'Hebrew'},
    { code: 'it',name: 'Italian'},
    { code: 'nl',name: 'Dutch'},
    { code: 'no',name: 'Norwegian'},
    { code: 'pt',name: 'Portuguese'},
    { code: 'ru',name: 'Russian'},
    { code: 'se',name: 'Sami'},
    { code: 'ud',name: 'Urdu'},
    { code: 'zh',name: 'Chinese'},
  ];

  sources: any = [];
    
  selectedCountry: FormControl = new FormControl();
  selectedLang: FormControl = new FormControl();
  selectedSource: FormControl = new FormControl();
  
  panelOpenState: boolean = false;

  constructor(    
    private dataService: DataService,
    private appService: AppService,
    private router: Router
  ) { }

  ngOnInit() {
    
    if (localStorage.getItem('appState')) {          
      const appState = JSON.parse(localStorage.getItem('appState'));    
      this.selectedCountry.setValue(appState.country.code);
      this.selectedLang.setValue(appState.language.code);
    }
    

    if (!localStorage.getItem('allNewsSources')) {
      this.getAllNewsSources();
    }

    this.onCountryChange()
    this.onLangChange();
  }
  
  onCountryChange() {
    this.selectedCountry.valueChanges
    .subscribe(code => { 
      
      const country = this.countries.filter(c => c.code === code);
      const language = this.languages.filter(l => l.code === this.selectedLang.value);
            
      const appState = {
        country: country[0],
        language: language[0]
      };
      this.setAppState(appState);      

      this.appService.changeCountry(country[0]);
      this.router.navigate(['']);
    });
  }

  onLangChange() {
    this.selectedLang.valueChanges
    .subscribe(lang => {

      const country = this.countries.filter(c => c.code === this.selectedCountry.value);
      const language = this.languages.filter(l => l.code === lang);
            
      const appState = {
        country: country[0],
        language: language[0]
      };
      this.setAppState(appState);            

    });
  }

  setAppState(appState) {
    localStorage.setItem('appState', JSON.stringify(appState));
  }

  getAllNewsSources() {
    this.dataService.getAllSources()
    .subscribe((res: any) => {      
      this.sources = res.sources;
      localStorage.setItem('allNewsSources', JSON.stringify(this.sources));
    }, err => {
      console.log(err);
    });
  }

}

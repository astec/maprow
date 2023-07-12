import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'maprow-6-0v';
    constructor(public translate: TranslateService) {
    translate.addLangs(['PL', 'EN', 'DE']);
    translate.setDefaultLang('PL');
    }
  
  translateLanguageTo(lang: string) {
    this.translate.use(lang);
  }
}

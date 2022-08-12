import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GeocodingComponent } from './geocoding/geocoding.component';
import { MapComponent } from './map/map.component';
import { ResultListComponent } from './result-list/result-list.component';
import { MapPointFormComponent } from './map-point-form/map-point-form.component';

import { NominatimService } from './services/nominatim.service';
import { PersonComponent } from './person/person.component';

import { PersonService } from './person/person.service';

@NgModule({
  declarations: [
    AppComponent,
    GeocodingComponent,
    MapComponent,
    ResultListComponent,
    MapPointFormComponent,
    PersonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    LeafletModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    NominatimService,
    PersonService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

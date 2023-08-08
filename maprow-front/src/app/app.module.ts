import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { AppRoutingModule } from './app-routing.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { LeafletMarkerClusterModule } from '@asymmetrik/ngx-leaflet-markercluster';
import { MatButtonModule } from '@angular/material/button';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgxLeafletLocateModule } from '@runette/ngx-leaflet-locate';
import { TextFieldModule } from '@angular/cdk/text-field';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MatSnackBarModule } from "@angular/material/snack-bar";


import { AppComponent } from './app.component';
import { GeocodingComponent } from './components/geocoding/geocoding.component';
import { MapComponent } from './components/map/map.component';
import { ResultListComponent } from './components/result-list/result-list.component';
import { MapPointFormComponent } from './components/map-point-form/map-point-form.component';
import { PersonComponent } from './components/person/person.component';
import { MapSidebarComponent } from './components/map-sidebar/map-sidebar.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './components/login/login.component';
import { NgxWebstorageModule } from 'ngx-webstorage';

import { NominatimService } from './services/nominatim.service';
import { PersonService } from './services/person.service';
import { StationsService } from './services/stations.service';
import { FullScreenBtnComponent } from './components/map/full-screen-btn/full-screen-btn.component';


export function httpTranslateLoaderFactory(http: HttpClient) {
	return new TranslateHttpLoader(http);
}

@NgModule({
	declarations: [
		AppComponent,
		GeocodingComponent,
		LoginComponent,
		MapComponent,
		MapPointFormComponent,
		MapSidebarComponent,
		PersonComponent,
		ResultListComponent,
		ToolbarComponent,
		FullScreenBtnComponent,
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FormsModule,
		HttpClientModule,
		LeafletMarkerClusterModule,
		LeafletModule,
		MatButtonModule,
		MatGridListModule,
		MatIconModule,
		MatInputModule,
		MatListModule,
		MatSelectModule,
		MatSidenavModule,
		MatTabsModule,
		MatToolbarModule,
		NgxLeafletLocateModule,
		ReactiveFormsModule,
		TextFieldModule,
		MatSnackBarModule,
		NgxWebstorageModule.forRoot(),
		TranslateModule.forRoot({
			loader: {
				provide: TranslateLoader,
				useFactory: httpTranslateLoaderFactory,
				deps: [HttpClient],
			},
		}),
	],
	providers: [NominatimService, PersonService, StationsService],
	bootstrap: [AppComponent],
})
export class AppModule {}

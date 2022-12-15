import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { HomeComponent } from './components/home/home.component';
import { AppliancesOverviewComponent } from './components/appliances-overview/appliances-overview.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecurityInterceptor } from './interceptors/security.interceptor';
import { ApplianceCreateComponent } from './components/appliance-create/appliance-create.component';
import { ApplianceSharedComponent } from './components/shared/appliance-shared.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ApplianceUpdateComponent } from './components/appliance-update/appliance-update.component';
import { ApplianceDetailsComponent } from './components/appliance-details/appliance-details.component';


const MaterialModules = [
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatFormFieldModule,
  MatPaginatorModule,
  MatTableModule,
  HttpClientModule,
  ReactiveFormsModule,
  MatSortModule,
  MatInputModule,
  MatButtonModule,
  MatCardModule,
  FlexLayoutModule,
  MatSelectModule,
  MatSlideToggleModule,
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AppliancesOverviewComponent,
    ApplianceCreateComponent,
    ApplianceUpdateComponent,
    ApplianceSharedComponent,
    ApplianceDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    MaterialModules,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SecurityInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

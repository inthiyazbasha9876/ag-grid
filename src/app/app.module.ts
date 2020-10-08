import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AgGridModule } from 'ag-grid-angular';
import { AggridComponent } from './aggrid/aggrid.component';
import { HttpClientModule } from '@angular/common/http';
import {FormsModule} from '@angular/forms'
import 'ag-grid-enterprise';
@NgModule({
  declarations: [
    AppComponent,
    AggridComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AgGridModule.withComponents([]),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

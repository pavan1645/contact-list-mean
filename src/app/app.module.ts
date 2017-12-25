import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpModule} from '@angular/http';
import {FormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from "./app-routing/app-routing.module";

import { AppComponent } from './app.component';
import { RoutingComponents } from "./app-routing/app-routing.module";

import { ContactService } from './contact.service';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ContactService],
  bootstrap: [AppComponent]
})
export class AppModule { }

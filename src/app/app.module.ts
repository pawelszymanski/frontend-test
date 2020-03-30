import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {HomeComponent} from './components/home/home.component';
import {ApiService} from './services/api.service';
import {ApiItemsResponseAdapterService} from './services/api-items-response-adapter.service';

@NgModule({
  declarations: [AppComponent, HomeComponent],
  imports: [BrowserModule, HttpClientModule, AppRoutingModule, FormsModule],
  providers: [ApiService, ApiItemsResponseAdapterService],
  bootstrap: [AppComponent]
})
export class AppModule {}

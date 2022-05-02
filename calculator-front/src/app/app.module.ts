import { LOCALE_ID,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveCalculatorComponent } from './reactive-calculator/reactive-calculator.component';

import { httpInterceptorProviders } from './interceptors';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ReactiveCalculatorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [ 
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    httpInterceptorProviders],
    bootstrap: [AppComponent] 
})
export class AppModule { }

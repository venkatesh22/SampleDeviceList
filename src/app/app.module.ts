import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { DeviceListComponent } from './components/device-list/device-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FakebackendInterceptor } from './interceptors/fakebackend/fakebackend.interceptor';
import { CustomvalidationDirective } from './directives/customvalidation.directive';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    WelcomeComponent,
    DeviceListComponent,
    PageNotFoundComponent,
    CustomvalidationDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: FakebackendInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ServiceWorkerModule } from '@angular/service-worker';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { UiMaterialModule } from './ui-material/ui-material.module';
import { AppRoutesModule } from './app-routes/app-routes.module';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TokenInterceptor } from './login/auth/token.interceptor';
import { AuthService } from './login/auth/auth.service';
import { AuthInterceptor } from './login/auth/auth.interceptor';
import { environment } from '../environments/environment';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { SignupFormComponent } from './login/signup-form/signup-form.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PageNotFoundComponent,
    LoginFormComponent,
    SignupFormComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    UiMaterialModule,
    AppRoutesModule,
    ServiceWorkerModule.register('./ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}

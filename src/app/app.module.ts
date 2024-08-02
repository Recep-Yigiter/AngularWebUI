import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UretimComponent } from './pages/uretim/uretim.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { StokSelectModalComponent } from './shared/components/stok-select-modal/stok-select-modal.component';
import { CariSelectModalComponent } from './shared/components/cari-select-modal/cari-select-modal.component';
import { DeleteButtonComponent } from './shared/components/delete-button/delete-button.component';
import { DepoSelectModalComponent } from './shared/components/depo-select-modal/depo-select-modal.component';
import { VerilenTeklifModalComponent } from './shared/components/verilen-teklif-modal/verilen-teklif-modal.component';
import { VerilenTeklifHareketModalComponent } from './shared/components/verilen-teklif-hareket-modal/verilen-teklif-hareket-modal.component';
import { TabMainComponent } from './shared/components/tab-main.component';
import { TabItemComponent } from './shared/components/tab-item.component';
import { AlinanTeklifModalComponent } from './shared/components/alinan-teklif-modal/alinan-teklif-modal.component';
import { AlinanTeklifHareketModalComponent } from './shared/components/alinan-teklif-hareket-modal/alinan-teklif-hareket-modal.component';
import { OnayDurumSelectComponent } from './shared/components/onay-durum-select/onay-durum-select.component';
import { ConfirmModalComponent } from './shared/components/confirm-modal/confirm-modal.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { RegisterComponent } from './pages/Auth/register/register.component';
import { JwtHelperService, JWT_OPTIONS, } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from "ngx-spinner";
import { AddRoleClaimsButtonComponent } from './shared/components/add-role-claims-button/add-role-claims-button.component';
import { RequestInterceptor } from './core/request.interceptor';
import { AlertModalComponent } from './shared/components/alert-modal/alert-modal.component';
import { AlertService } from './core/services/alert.service';
import { HtppErrorHandlerInterceptor } from './core/http-error-handler.interceptor';
import { PageModule } from './pages/page.module';
import { PageDesignComponent } from './shared/components/page-design/page-design.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { DesignComponent } from './shared/design/design.component';
import { ResizeDirective } from './pages/deneme/resize.directive';

@NgModule({
  declarations: [
    AppComponent,
    UretimComponent,
    StokSelectModalComponent,
    CariSelectModalComponent,
    DeleteButtonComponent,
    DepoSelectModalComponent,
    VerilenTeklifModalComponent,
    VerilenTeklifHareketModalComponent,
    AlinanTeklifModalComponent,
    AlinanTeklifHareketModalComponent,
    OnayDurumSelectComponent,
    ConfirmModalComponent,
    LoginComponent,
    RegisterComponent,
    AddRoleClaimsButtonComponent,
    AlertModalComponent,
    PageDesignComponent,
    DesignComponent,


  ],
  imports: [

    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserModule,
    AgGridAngular,
    PageModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),

  ],
  providers: [
    AlertService,
    { provide: "baseUrl", useValue: "https://localhost:7051/api", multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy, },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: HtppErrorHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],

})
export class AppModule { }

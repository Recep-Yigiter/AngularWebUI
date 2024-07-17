import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UretimComponent } from './pages/uretim/uretim.component';

import { HashLocationStrategy, LocationStrategy, registerLocaleData } from '@angular/common';
import { BirimSelect } from './shared/birim-select.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AgGridAngular, AgGridModule } from 'ag-grid-angular';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
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
import { JwtHelperService, JWT_OPTIONS, JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from "ngx-spinner";
import { AddRoleClaimsButtonComponent } from './shared/components/add-role-claims-button/add-role-claims-button.component';
import { RequestInterceptor } from './core/request.interceptor';
import { MessagesModule } from 'primeng/messages';
import { MessageModule } from 'primeng/message';
import { AlertModalComponent } from './shared/components/alert-modal/alert-modal.component';
import { AlertService } from './core/services/alert.service';
import { HtppErrorHandlerInterceptor } from './core/http-error-handler.interceptor';
import { PageModule } from './pages/page.module';

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
    TabMainComponent,
    TabItemComponent,
    AlinanTeklifModalComponent,
    AlinanTeklifHareketModalComponent,
    OnayDurumSelectComponent,
    ConfirmModalComponent,
    LoginComponent,
    RegisterComponent,
    AddRoleClaimsButtonComponent,
    AlertModalComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    BirimSelect,
    AgGridAngular,
    MatIconModule,
    MatButtonModule,
    MatCheckboxModule,
    MessagesModule,
    MessageModule,
    PageModule,
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem("tokenData"),
        allowedDomains: ["localhost:7051", "192.168.4.216"]
      }
    }),
    NgbModule,
    AgGridAngular,












  ],
  providers: [
    AlertService,
    { provide: "baseUrl", useValue: "https://localhost:7051/api", multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy, },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS }, JwtHelperService,
    //provideHttpClient(withInterceptors([HtppErrorHandlerInterceptorService])),
    { provide: HTTP_INTERCEPTORS, useClass: HtppErrorHandlerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },

    // { provide: ErrorHandler, useClass: HandleErrorInterceptor }
  ],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],

})
export class AppModule { }

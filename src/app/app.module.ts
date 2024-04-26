import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UretimComponent } from './pages/uretim/uretim.component';
import { ItemTabComponent } from './layout/item-tab/item-tab.component';
import { MainTabComponent } from './layout/main-tab/main-tab.component';
import { StokTabComponent } from './layout/components/stok-tab/stok-tab.component';
import { UretimTabComponent } from './layout/components/uretim-tab/uretim-tab.component';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from './layout/layout.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { BirimSelect } from './shared/birim-select.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SatinAlmaTabComponent } from './layout/components/satin-alma-tab/satin-alma-tab.component';
import { FaturaTabComponent } from './layout/components/fatura-tab/fatura-tab.component';
import { SatisTabComponent } from './layout/components/satis-tab/satis-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    UretimComponent,
    ItemTabComponent,
    MainTabComponent,
    StokTabComponent,
    UretimTabComponent,
    SatinAlmaTabComponent,
    FaturaTabComponent,
    SatisTabComponent,
    LayoutComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
    HttpClientModule,
    BirimSelect,
    
    LayoutModule,
         NgbModule
  ],
  providers: [{ provide: "baseUrl", useValue: "https://localhost:7146/api", multi: true }, { provide: LocationStrategy, useClass: HashLocationStrategy, }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule { }

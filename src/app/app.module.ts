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
import { AgGridAngular } from 'ag-grid-angular';
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
import { NumberInputDirective } from './shared/directives/number-input.directive';
import { AlinanTeklifModalComponent } from './shared/components/alinan-teklif-modal/alinan-teklif-modal.component';
import { AlinanTeklifHareketModalComponent } from './shared/components/alinan-teklif-hareket-modal/alinan-teklif-hareket-modal.component';
import { OnayDurumSelectComponent } from './shared/components/onay-durum-select/onay-durum-select.component';
import { MainPageComponent } from './main-page/main-page.component';

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
    MainPageComponent,

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
    LayoutModule,
    NgbModule
  ],
  providers: [{ provide: "baseUrl", useValue: "http://192.168.5.33/api", multi: true }, { provide: LocationStrategy, useClass: HashLocationStrategy, }],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],

})
export class AppModule { }

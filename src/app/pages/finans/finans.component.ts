import { state } from '@angular/animations';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CariService } from 'src/app/core/services/repository/cari.service';
import { CekSenetService } from 'src/app/core/services/repository/cek-senet.service';
import { VirmanCariComponent } from './virman/virman-cari/virman-cari.component';
import { VirmanBankaComponent } from './virman/virman-banka/virman-banka.component';
import { VirmanKasaComponent } from './virman/virman-kasa/virman-kasa.component';
import { VirmanGenelComponent } from './virman/virman-genel/virman-genel.component';

@Component({
  selector: 'app-finans',
  templateUrl: './finans.component.html',
  styleUrls: ['./finans.component.scss'],
})
export class FinansComponent {
  constructor(
    private router: Router,
    private CekSenetService: CekSenetService,
    private CariService: CariService,
    private NgbModal: NgbModal
  ) {}

  virmanCariModal() {
    const modalRef = this.NgbModal.open(VirmanCariComponent, {
      size: 'lg',
      backdrop: 'static',
    });

    modalRef.componentInstance.data = 'Virman Cari';

    modalRef.result.then(async (item) => {});
  }

  virmanBankaModal() {
    const modalRef = this.NgbModal.open(VirmanBankaComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Virman Banka';
    modalRef.result.then(async (item) => {});
  }

  virmanKasaModal() {
    const modalRef = this.NgbModal.open(VirmanKasaComponent, {
      size: 'lg',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = 'Virman Kasa';
    modalRef.result.then(async (item) => {});
  }

  virmanGenelModal() {
    const modalRef = this.NgbModal.open(VirmanGenelComponent, {
      size: 'xl',
      backdrop: 'static',
    });
    modalRef.componentInstance.data = ' Genel Virman ';
    modalRef.result.then(async (item) => {});
  }

  async MusteriCekleri() {
    this.router.navigate(['/menu/finans/cek-senet/musteri-ceki'], {
      state: {
        filterList: (await this.CekSenetService.list()).items.filter(
          (c) => c.cekSenetTipi == 1
        ),
        filterBy: [1],
        createModal: true,
        createValue: { seriNo: 'AÇ-1', cekSenetTipi: 1 },
      },
    });
  }
  async KendiCeklerimiz() {
    this.router.navigate(['/menu/finans/cek-senet/kendi-cekimiz'], {
      state: {
        filterList: (await this.CekSenetService.list()).items.filter(
          (c) => c.cekSenetTipi == 3
        ),
        filterBy: [3],
        createModal: true,
        createValue: { seriNo: 'VÇ-1', cekSenetTipi: 3 },
      },
    });
  }
  async MusteriSenetleri() {
    this.router.navigate(['/menu/finans/cek-senet/musteri-senedi'], {
      state: {
        filterList: (await this.CekSenetService.list()).items.filter(
          (c) => c.cekSenetTipi == 2
        ),
        filterBy: [2],
        createModal: true,
        createValue: { seriNo: 'AS-1', cekSenetTipi: 2 },
      },
    });
  }
  async KendiSenetlerimiz() {
    this.router.navigate(['/menu/finans/cek-senet/kendi-senedimiz'], {
      state: {
        filterList: (await this.CekSenetService.list()).items.filter(
          (c) => c.cekSenetTipi == 4
        ),
        filterBy: [4],
        createModal: true,
        createValue: { seriNo: 'VS-1', cekSenetTipi: 4 },
      },
    });
  }
  async MusteriCekSenetleri() {
    this.router.navigate(['/menu/finans/cek-senet/musteri-cek-senet'], {
      state: {
        filterList: (await this.CekSenetService.list()).items.filter(
          (c) => c.cekSenetTipi == 1 || c.cekSenetTipi == 2
        ),
        filterBy: [1, 2],
        createModal: false,
        createValue: { seriNo: '', cekSenetTipi: 0 },
      },
    });
  }
  async KendiCekSenetlerimiz() {
    this.router.navigate(['/menu/finans/cek-senet/kendi-cek-senet'], {
      state: {
        filterList: (await this.CekSenetService.list()).items.filter(
          (c) => c.cekSenetTipi == 3 || c.cekSenetTipi == 4
        ),
        filterBy: [3, 4],
        createModal: false,
        createValue: { seriNo: '', cekSenetTipi: 0 },
      },
    });
  }
  async cekSenetListesi() {
    this.router.navigate(['/menu/finans/cek-senet/list'], {
      state: {
        filterList: (await this.CekSenetService.list()).items.filter(
          (c) =>
            c.cekSenetTipi == 1 ||
            c.cekSenetTipi == 2 ||
            c.cekSenetTipi == 3 ||
            c.cekSenetTipi == 4
        ),
        filterBy: [1, 2, 3, 4],
        createModal: false,
      },
    });
  }
}

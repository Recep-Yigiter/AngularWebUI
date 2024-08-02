export class CreateBankaModel {
  kod?: any;
  ad?: any;
  aciklama?: any;
  hourId?: any;
  bankaHesaplar?: CreateBankaHesapModel[];

}
export class CreateBankaHesapModel {
  hesapNo?: any;
  hesapAdi?: any;
  ibanNo?: any;
  hesapTuru?: any;
  mutabakatTarihi?: any;
  emkbBankaKodu?: any;
  emkbSubeKodu?: any;
  musteriNo?: any;
  faiz?: any;
  komisyon?: any;
  paraBirimi?: any;
  dovizCinsi?: any;


}

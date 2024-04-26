
export class CreateUrunAgaciModel {
    kod?: any;
    ad?: any;
    stokId?: any;
    miktar?: any;
    urunGrubu: any;
    parentId?: any;
    aciklama?: any;
    birimFiyat?: any;
    durum?: any;
    tip?: any;
    operasyonMaliyeti?:any;
    urunAgaciBilesenler?: CreateUrunAgaciHareketModel[];
  
  }
  
  
  export class CreateUrunAgaciHareketModel {
    stokId?: any;
    miktar?: any;
    tip?: any;
    fiyatListesiId?: any;
    birimFiyat?: any;
    oranMiktar?: any;
    fire?: any;
    aciklama?: any;
    BilesenRotalar?:CreateBilesenRotaModel[];
  }
  
  export class CreateBilesenRotaModel {
    OperasyonId?: any;
    OperasyonSuresi?: any;
    BilesenId?:any;
  }
  
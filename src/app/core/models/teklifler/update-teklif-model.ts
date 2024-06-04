export class UpdateTeklifModel {
    id?:any;
    teklifTuru?: any;
    seri?: any;
    belgeNo?: any;
    referans?: any;
    kdv?: any;
    otv?: any;
    aciklama?: any;
    hourId?:any;
    opsiyonTarihi?:any;
    durum?:any;
    cariId?: any;
    onay?: any;
  
    teklifHareketler?: UpdateTeklifHareketModel[];
}

export class UpdateTeklifHareketModel{
    teklifHareketTuru?:any;
    birimFiyat?:number;
    stokId?:any;
    hourId?:any;
}
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
    tenantId?: any;
  
    teklifHareketler?: UpdateTeklifHareketModel[];
}

export class UpdateTeklifHareketModel{
    id?:any;
    teklifHareketTuru?:any;
    birimFiyat?:number;
    stokId?:any;
    hourId?:any;
}
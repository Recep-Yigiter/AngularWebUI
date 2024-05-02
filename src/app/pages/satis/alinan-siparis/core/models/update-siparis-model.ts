export class UpdateSiparisModel {
    id?:any;
    siparisTuru?: any;
    seri?: any;
    belgeNo?: any;
    referans?: any;
    kdv?: any;
    otv?: any;
    aciklama?: any;
    hourId?:any;
    cariId?: any;
    teslimTarihi?: any;
    siparisHareketler?: UpdateSiparisHareketModel[];
}

export class UpdateSiparisHareketModel{
    siparisHareketTuru?:any;
    birimFiyat?:number;
    stokId?:any;
    hourId?:any;
}
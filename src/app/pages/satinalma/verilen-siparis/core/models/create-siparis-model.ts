export class CreateSiparisModel {
    siparisTuru?: any;
    seri?: any;
    belgeNo?: any;
    referans?: any;
    kdv?: any;
    otv?: any;
    aciklama?: any;
    hourId?:any;
    cariId?: any;
    teslimTarihi?:any;
    siparisHareketler?: CreateSiparisHareketModel[];
}

export class CreateSiparisHareketModel{
    siparisHareketTuru?:any;
    birimFiyat?:number;
    giren?:number;
    cikan?:number;
    stokId?:any;
    depoId?:any;
    hourId?:any;
}
export class UpdateFaturaModel {
    id?:any;
    faturaTuru?: any;
    seri?: any;
    belgeNo?: any;
    referans?: any;
    kdv?: any;
    otv?: any;
    eFatura?: any;
    eArsiv?: any;
    aciklama?: any;
    cariId?: any;
    depoId?: any;
    hourId?:any;
    faturaHareketler?: UpdateFaturaHareketModel[];
}

export class UpdateFaturaHareketModel{
    faturaHareketTuru?:any;
    birimFiyat?:number;
    giren?:number;
    cikan?:number;
    stokId?:any;
    depoId?:any;
    hourId?:any;
}

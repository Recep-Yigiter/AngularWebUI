export class CreateTeklifModel {
    teklifTuru?: any;
    seri?: any;
    belgeNo?: any;
    referans?: any;
    kdv?: any;
    otv?: any;
    aciklama?: any;
    hourId?:any;
    cariId?: any;
    depoId?: any;
    opsiyonTarihi?: any;
    durum?:any;
    onay?:any;
    teklifHareketler?: CreateTeklifHareketModel[];
}

export class CreateTeklifHareketModel{
    teklifHareketTuru?:any;
    birimFiyat?:number;
    giren?:number;
    cikan?:number;
    stokId?:any;
    depoId?:any;
    hourId?:any;
}
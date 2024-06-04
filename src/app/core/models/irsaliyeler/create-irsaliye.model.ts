export class CreateIrsaliyeModel {
    irsaliyeTuru?: any;
    seri?: any;
    belgeNo?: any;
    referans?: any;
    kdv?: any;
    otv?: any;
    eIrsaliye?: any;
    eArsiv?: any;
    aciklama?: any;
    cariId?: any;
    depoId?: any;
    hourId?:any;
    irsaliyeHareketler?: CreateIrsaliyeHareketModel[];
}

export class CreateIrsaliyeHareketModel{
    irsaliyeHareketTuru?:any;
    birimFiyat?:number;
    giren?:number;
    cikan?:number;
    stokId?:any;
    hourId?:any;
}

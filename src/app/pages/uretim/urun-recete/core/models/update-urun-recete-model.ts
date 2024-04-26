import { CreateUrunReceteHareketModel } from "./create-urun-recete-model";

export class UpdateUrunReceteModel {

    id?:any;
    stokAdi?:any;
    stokKodu?:any;
    birimAdi?:any;
    stokId?: any;
    miktar?: any;
    referans?: any;
    boMTuru?: any;
    hourId?:any;
    urunReceteBilesenler?: CreateUrunReceteHareketModel[];
}


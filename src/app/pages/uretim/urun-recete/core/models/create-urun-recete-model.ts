
export class CreateUrunReceteModel {

  stokAdi?:any;
  stokKodu?:any;
  birimAdi?:any;
  stokId?: any;
  miktar?: any;
  referans?: any;
  boMTuru?: any;
  hourId?:any;
  urunReceteBilesenler?: CreateUrunReceteHareketModel[];
  operasyonlar?: OperasyonModel[];

}


export class CreateUrunReceteHareketModel {
  stokId?: any;
  miktar?: any;
}

export class OperasyonModel{
  kod:any;
  ad:any;
  isMerkeziId:any;

}
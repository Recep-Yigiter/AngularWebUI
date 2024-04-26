import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
  
})

export class UrunAgaciTreeViewService  {
    index = 0;
    expand = {};
    res:any;
    constructor() { }

    CreateTreeView(data: any) {

        function findParent(arr, id) {
            return arr.find((parent) => parent.id === id);
        }
        function createTreeNode(value) {

            return {
                id: value.id,
                ad: value.ad,
                kod:value.kod,
                birimId: value.birimId,
                birimAdi: value.birimAdi,
                birimFiyat: value.birimFiyat,
                stokGrup:value.stokGrup,
                urunGrubu:value.urunGrubu,
                parentId:value.parentId,
                stokId:value.stokId,
                stokAdi:value.stokAdi,
                stokKodu:value.stokKodu,
                miktar:value.miktar,
                tip:value.tip,
                durum:value.durum,
                submenu: (value.submenu !== undefined)
                    ? value.submenu.map(createTreeNode)
                    : undefined
            };
        }

        function createTree(data) {
            return data
                .reduce((result, value, index, originalArray) => {
                    if (value.parentId !== null) {
                        const parent = findParent(originalArray, value.parentId);
                        if (parent) {
                            parent.submenu = (parent.submenu || []).concat(value);
                        }
                        return result;
                    } else {
                        return result.concat(value);
                    }
                }, [])
                .map(createTreeNode);
        }

        return createTree(data)


    }
    toNode(x: any): any {
        const y: any = { ...x };

        
        y.index = ++this.index;
        for (let n = 0; n < y.submenu?.length; n++) {
            y.submenu[n] = this.toNode(y.submenu[n])
        }
        return y;
    }
    toggleVisible(node: any) {
 
        if (node.submenu && node.submenu?.length) {
            if (this.expand[node.index]) {
                this.expand[node.index] = false;
            } else {
                this.expand[node.index] = true;
            }
        }
    }
    treeViewChildList(item: any) {

        var array = [];
    
    
        array.push(item)
        const collect = (n, out = []) => {
    
          for (const { submenu, ...item } of n) {
            out.push(item);
            submenu?.length && collect(submenu, out);
          }
          return out;
        };
    
        const result = array.map(({ submenu, ...item }) => ({ ...item, submenu: collect(submenu) }));
    
        this.res = result[0].submenu
    
      return this.res
      }
    
}


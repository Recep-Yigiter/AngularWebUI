import { Injectable } from '@angular/core';
import { BirimService } from 'src/app/core/services/repository/birim.service';

@Injectable({
  providedIn: 'root'
})
export class BirimFilterService {

  constructor(private BirimService: BirimService) { }
  rowData: any[];
  searchKeys = { array: [] };
  filterClearDisabled: boolean = true;
  filtredBy: any;

  async filterListbox(event, filterColumn) {
    this.rowData = (await this.BirimService.list(() => { })).items;
    this.rowData.forEach((rowData) => {
      const dateSplit = rowData.createdDate.split("T");
      const dateParts = dateSplit[0].split("-");
      rowData.createdDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`

    })
    this.filtredBy = event.value;
    if (this.filtredBy.length == 0) {
      this.searchKeys[filterColumn] = []
    }

    this.filtredBy.reduce((acc, obj) => {
      acc[filterColumn] = this.filtredBy.map(c => c[filterColumn]).map(c => { return c.toLowerCase(); });
      return acc
    }, this.searchKeys)

    const filter = this.rowData.filter(obj =>
      Object.entries(this.searchKeys).every(([k, p]) => (
        p.length === 0 || p.map(c => c.toLowerCase()).includes(obj[k].toLowerCase())
      ))
    )
    this.rowData = filter


    return this.rowData
    
  }

}

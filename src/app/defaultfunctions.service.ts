import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DefaultfunctionsService {

  constructor() { }

  searchStartWith(data, searchvalue) {
    let result = data.filter(d => (d.Brand.toLowerCase()).startsWith(searchvalue.toLowerCase()))
    return result
  }

  filetrWithRange(data,rangeArray){
    let result = data.filter(d => d.Price >=rangeArray[0] && d.Price <=rangeArray[1])
    console.log(result);
    
    return result
  }
}

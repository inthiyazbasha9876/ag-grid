import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DefaultfunctionsService } from '../defaultfunctions.service';
import { ServiceService } from '../service.service';
declare var XLSX: any;
@Component({
  selector: 'app-aggrid',
  templateUrl: './aggrid.component.html',
  styleUrls: ['./aggrid.component.scss']
})
export class AggridComponent implements OnInit {


  columnDefs: any
  rowData: any
  dummyRowdata: any
  filterData: any
  searchedData: any

  rangefilter:any=false

  gridOptions
  defaultColDef = {
    sortable: true,
    filter: true,
    minwidth: 100,
    resizable: true,
    floatingFilter: true,
  };



  constructor(private service: ServiceService, private customDefined: DefaultfunctionsService) {
  }

  ngOnInit(): void {
    this.getValues()
  }

  getValues() {
    let data
    this.service.getDetails().subscribe(res => {
      data = res
      this.settoGrid(data)
    })
  }

  settoGrid(data) {
    this.columnDefs = this.generateColumns(data)
    this.dummyRowdata = data
    this.rowData = data
  }

  generateColumns(data: any[]) {
    let columnDefinitions = [];

    data.map(object => {
      Object
        .keys(object)
        .map(key => {
          let mappedColumn = {
            headerName: key.toUpperCase(),
            field: key
          }

          columnDefinitions.push(mappedColumn);
        })
    })
    columnDefinitions = columnDefinitions.filter((column, index, self) =>
      index === self.findIndex((colAtIndex) => (
        colAtIndex.field === column.field
      ))
    )
    return columnDefinitions;
  }

  search(e) {
    console.log(e)
    this.gridOptions.api.setQuickFilter(e)
  }

  filter(e) {
    if (e != "") {
      let rangeArray = e.split('-')
      this.filterData = this.customDefined.filetrWithRange(this.dummyRowdata, rangeArray)
      this.rowData = this.filterData
    } else {
      this.rowData = this.dummyRowdata
    }
  }

  onGridReady(event) {
    this.gridOptions = event
  }

  downloadCSV() {
    var params = {
      skipHeader: false,
      skipFooters: true,
      skipGroups: true,
      fileName: "bikesmodal.csv"
    };
    this.gridOptions.api.exportDataAsCsv(params);
  }
  
  getExcelSheet(fileInput: any) {
    let fileReaded = fileInput.target.files[0];
    let reader: FileReader = new FileReader();
    reader.readAsText(fileReaded);

    reader.onload = (e) => {
      let csv: any = reader.result;
      let lines = csv.split("\n");
      let result = [];
      let headers = lines[0].split(",");
      for (let i = 1; i < lines.length; i++) {
        let obj = {};
        let currentline = lines[i].split(',');
        for (let j = 0; j < headers.length; j++) {
          let dataString = String(currentline[j])
          console.log(dataString.toString());
          obj[headers[j]] = currentline[j];
        }
        result.push(obj);

      }
      console.log(result);
      this.rangefilter=true
      this.settoGrid(result)
    }
  }

}

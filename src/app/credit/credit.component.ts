import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../services/api-service.service';

import { DataManager, Query } from '@syncfusion/ej2-data';
import { data } from '../trip-monitor/data';
import {
  SelectionService,
  RowSelectEventArgs,
  GridComponent,
  FilterService,
  VirtualScrollService,
  ToolbarItems,
} from '@syncfusion/ej2-angular-grids';



import { WebApiAdaptor } from '@syncfusion/ej2-data';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.scss'],
  providers: [SelectionService, FilterService, VirtualScrollService , DatePipe],
})
export class CreditComponent implements OnInit {
  public filter: Object;
  public initialPage: Object;
  public filterSettings: Object;
  public selectionSettings: Object;
  public height: string = '240px';
  public data: object[];
  public toolbarOptions: ToolbarItems[];
  public dropSlectedIndex: number = null;
  public stTime: any;

  // public headerText: Object = [
  //   { text: 'Route' },
  //   { text: 'Driver' },
  //   { text: 'Vehicle' },
  //   { text: 'Time' },
  // ];
  // {{date.date | date: "medium" }}
  constructor(private _API: ApiServiceService , private datePipe:DatePipe) {
    this._API.getPassengerTransAction().subscribe((res) => {
      
      for (let i = 0; i < res.length; i++) {
        let date = res[i].timeStamp
        date = this.datePipe.transform(date , "dd-MM-yyyy")
        console.log(date);
        res[i].timeStamp = date
      }
      console.log(res);
      
      this.data = res
    }, (err) => {
      console.log(err);
    })
  }

  ngOnInit(): void {
    // this.data = data;
    this.toolbarOptions = ['Search'];

    this.filterSettings = { type: 'Menu' };
    this.initialPage = { pageSizes: true, pageCount: 4 };
    this.filter = { type: 'CheckBox' };
    this.stTime = performance.now();
    this.selectionSettings = {
      persistSelection: true,
      type: 'Multiple',
      checkboxOnly: true,
    };
  }
  key;
  ngAfterViewInit(args: any): void { }

  public onRowSelected(args: RowSelectEventArgs): void {


    const queryData: any = args.data;
    this.key = queryData.tripID;
    // get trip id
    console.log(this.key);

    // speed chart here

    // speed chart end


    // this.apiService.onsendId.next(this.key)
    // JSON.stringify(localStorage.setItem('dataSource',this.key))

    const dataSource: object[] = new DataManager().executeLocal(
      new Query().where('CustomerName', 'equal', queryData.ContactName)
    );
  }





}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommandColumnService, CommandModel, EditService, PageService } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';
import { command, rowEdit } from '../grid-commands';
import { orderDatas } from '../trip-monitor/data';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  providers: [EditService, PageService, CommandColumnService]
})
export class SettingsComponent implements OnInit {

  CustomerData = new FormGroup({
    customerId: new FormControl(''),
    freight: new FormControl(''),
    orderData: new FormControl(''),
    shipCountry: new FormControl(''),
  });

  sendData() {
    console.log(this.CustomerData);

  }
  public data: Object[];
  public editSettings: Object;
  public orderidrules: Object;
  public customeridrules: Object;
  public freightrules: Object;
  public editparams: Object;
  public pageSettings: Object;
  public commands: CommandModel[];
  public commandParse: command;
  public rowParse: rowEdit;


  public ngOnInit(): void {
    this.data = orderDatas;
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: false };
    this.orderidrules = { required: true };
    this.customeridrules = { required: true };
    this.freightrules = { required: true };
    this.editparams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 5 };
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];
  }


  clickHandler(args: ClickEventArgs): void {
    console.log(args);

    this.commandParse = args.commandColumn as command;
    console.log(this.commandParse.type);
    console.log(args);

    if (this.commandParse.type == 'Save') {
      setTimeout(() => {
        // alert("save")
        this.rowParse = args.rowData as rowEdit;
        console.log(args.rowData);
        console.log(this.rowParse);
        // let obj = {
        //   id: this.rowParse.id,
        //   machineID: this.rowParse.machineID,
        //   factoryID: null,
        //   lineID: null,
        //   machineTypeID: null,
        //   machineFunctionalityID: null,
        //   ratedSpeed: this.rowParse.ratedSpeed,
        //   useInCalculation: this.rowParse.useInCalculation,
        // };
            // Object.keys(this.country).forEach((key) => {
            //   if (this.country[key].countryName == this.rowParse.factory) {
            //     obj.factoryID = Number(this.country[key].countryId);
            //   }
            // });
            // Object.keys(this.state).forEach((key) => {
            //   if (
            //     this.state[key].stateName == this.rowParse.line &&
            //     this.state[key].countryId == obj.factoryID
            //   ) {
            //     obj.lineID = Number(this.state[key].stateId);
            //   }
            // });
            // Object.keys(this.MachineTypes).forEach((key) => {
            //   console.log(this.MachineTypes[key].type);
            //   console.log(this.MachineTypes[key].id);
            //   if (this.MachineTypes[key].type == this.rowParse.machineType) {
            //     obj.machineTypeID = this.MachineTypes[key].id;
            //   }
            // });
            // Object.keys(this.MachineFunctionality).forEach((key) => {
            //   if (
            //     this.MachineFunctionality[key].name ==
            //     this.rowParse.machineFunctionality
            //   ) {
            //     obj.machineFunctionalityID = this.MachineFunctionality[key].id;
            //   }
            // });
            // console.log(obj);
            // this.service.putmachine(obj).subscribe((x) => {});
          }, 50);
      }
    // if (this.commandParse.type == 'Save') {
    //   this.service.putmachine(obj).subscribe((x) => {});
    // }
    // if (this.commandParse.type == 'Delete') {
    //   this.service
    //     .deleteUnMachinesAssigned(this.rowParse.machineID)
    //     .subscribe((x) => {});
    // }
  }
}


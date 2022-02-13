import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CommandModel } from '@syncfusion/ej2-angular-grids';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';
import { EnumDriver } from 'src/app/enum-driver';
import { command, rowEdit } from 'src/app/grid-commands';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss']
})
export class VehicleComponent implements OnInit {
  reactForm: FormGroup;

  constructor(private service: ApiServiceService, private notifyService: NotificationService) {

    this.service.getBuses().subscribe((res: any) => {
      res.forEach((elem: any) => {
        if (elem.status == 0) {
          // alert(elem.status)
          elem.status = EnumDriver.notActive
          // alert(elem.status)
          // this.data.push(elem)

        }
        else {
          // console.log(elem);


          // this.data.push(elem)
          elem.status = EnumDriver.active
          // alert("else"+elem.status)

        }

        // return true ;
      });
      this.data = res;
      console.log(res);
    }, (err) => {
      console.log(err);
    })

    this.reactForm = new FormGroup({

      'bassVendor': new FormControl('', [FormValidators.required]),
      'chassisNumber': new FormControl('', [FormValidators.required]),
      'palletNumber': new FormControl('', [FormValidators.required]),
      'status': new FormControl('', [FormValidators.required]),
      'terminalID': new FormControl('', [FormValidators.required]),
      
    });

  }
  showToasterSuccess() {
    this.notifyService.showSuccess("Success !!", "Transportation.com")
  }

  showToasterError() {
    this.notifyService.showError("Faild ", "Transportation.com")
  }



  vehicleData = new FormGroup({

    bassVendor: new FormControl(''),
    chassisNumber: new FormControl(''),
    palletNumber: new FormControl(''),
    status: new FormControl(''),
    terminalID: new FormControl(''),
  });
  // id
  // terminalId
  // status
  // bassVendor
  // baletNum
  // chassis
  sendData() {
    console.log(this.reactForm.value);
    // let obj = {
    //   bassVendor: this.rowParse.bassVendor,
    //   terminalID: this.rowParse.terminalID,
    //   chassisNumber: Number(this.rowParse.chassisNumber),
    //   palletNumber: this.rowParse.palletNumber,
    //   status: Number(this.rowParse.status),


    // };
    let obj = {
      bassVendor: this.reactForm.value.bassVendor,
      terminalID: this.reactForm.value.terminalID,
      chassisNumber: Number(this.reactForm.value.chassisNumber),
      palletNumber: this.reactForm.value.palletNumber,
      status: Number(this.reactForm.value.status),


    };
    this.service.addVehicle(obj).subscribe((res) => {
      this.showToasterSuccess();
      this.reactForm.reset();
      console.log(res);
      
    this.service.getBuses().subscribe((res: any) => {
      res.forEach((elem: any) => {
        if (elem.status == 0) {
          // alert(elem.status)
          elem.status = EnumDriver.notActive
          // alert(elem.status)
          // this.data.push(elem)

        }
        else {
          // console.log(elem);


          // this.data.push(elem)
          elem.status = EnumDriver.active
          // alert("else"+elem.status)

        }

        // return true ;
      });
      this.data = res;
      console.log(res);
    }, (err) => {
      console.log(err);
    })

    }, (err) => {
      this.showToasterError()
      console.log(err);
    })




  }
  public data: any;
  public editSettings: Object;
  public orderidrules: Object;
  public customeridrules: Object;
  public nameRole: Object;
  public freightrules: Object;
  public editparams: Object;
  public pageSettings: Object;
  public commands: CommandModel[];
  public commandParse: command;
  public rowParse: rowEdit;


  public ngOnInit(): void {
    // this.data = orderDatas;
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Normal', allowEditOnDblClick: false };
    this.orderidrules = { required: true };
    this.customeridrules = { required: true };
    this.nameRole = { required: true };
    this.freightrules = { required: true };
    this.editparams = { params: { popupHeight: '300px' } };
    this.pageSettings = { pageCount: 5 };
    this.commands = [{ type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
    { type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },
    { type: 'Save', buttonOption: { iconCss: 'e-icons e-update', cssClass: 'e-flat' } },
    { type: 'Cancel', buttonOption: { iconCss: 'e-icons e-cancel-icon', cssClass: 'e-flat' } }];





    
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          this.reactForm.reset();
        } else {
          // validating whole form
          Object.keys(this.reactForm.controls).forEach(field => {
            const control = this.reactForm.get(field);
            control.markAsTouched({ onlySelf: true });
          });
        }
      });
  }
 
  
  get bassVendor() { return this.reactForm.get('bassVendor'); }
  get chassisNumber() { return this.reactForm.get('chassisNumber')}; 
  get palletNumber() { return this.reactForm.get('palletNumber')}; 
  get status() { return this.reactForm.get('status')}; 
  get terminalID() { return this.reactForm.get('terminalID')}; 
  


  clickHandler(args: ClickEventArgs): void {
    console.log(args);

    this.commandParse = args.commandColumn as command;
    console.log(this.commandParse.type);
    console.log(args);

    if (this.commandParse.type == 'Save') {
      setTimeout(() => {
        this.rowParse = args.rowData as rowEdit;
        console.log(args.rowData);
        console.log(this.rowParse);
        
        let obj = {
          id: Number(this.rowParse.id),
          bassVendor: this.rowParse.bassVendor,
          terminalID: this.rowParse.terminalID,
          chassisNumber: Number(this.rowParse.chassisNumber),
          palletNumber: this.rowParse.palletNumber,
          status: Number(this.rowParse.status),


        };

        this.service.putVehicle(obj).subscribe((res) => {
          console.log(res);
          this.showToasterSuccess();
          this.reactForm.reset()

        }, (err) => {
          this.showToasterError()
          console.log(err);

        })
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

    if (this.commandParse.type == 'Delete') {
      console.log("in delete");

      setTimeout(() => {
        this.rowParse = args.rowData as rowEdit;
        console.log(args.rowData);
        console.log(this.rowParse);
        let obj = {
          id: Number(this.rowParse.id),
          bassVendor: this.rowParse.bassVendor,
          terminalID: this.rowParse.terminalID,
          chassisNumber: Number(this.rowParse.chassisNumber),
          palletNumber: this.rowParse.palletNumber,
          status: Number(this.rowParse.status),


        };

        this.service.DeleteVehicle(obj).subscribe((res) => {
          this.showToasterSuccess()
          console.log(res);

        }, (err) => {
          this.showToasterError()
          console.log(err);

        })
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

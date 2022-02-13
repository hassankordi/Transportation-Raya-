import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommandModel } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-buttons';
import { command, rowEdit } from 'src/app/grid-commands';
import { ApiServiceService } from 'src/app/services/api-service.service';
import { Passenger } from './passenger.model';



import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-passenger',
  templateUrl: './passenger.component.html',
  styleUrls: ['./passenger.component.scss']
})
export class PassengerComponent implements OnInit {
  reactForm: FormGroup;

  constructor(private service: ApiServiceService, private notifyService: NotificationService) {

    this.service.getPassenger().subscribe((res) => {


      for (let i = 0; i < res.length; i++) {
        if (res[i].status == 1) {
          res[i].status = "Active"

        } else {
          res[i].status = "Not Active"

        }
      }
      this.data = res;
      console.log(res);
    }, (err) => {
      console.log(err);
    })

    this.reactForm = new FormGroup({

      'name': new FormControl('', [FormValidators.required]),
      'cardUniID': new FormControl('', [FormValidators.required]),
      'longitude': new FormControl('', [FormValidators.required]),
      'latitude': new FormControl('', [FormValidators.required]),
      'speed': new FormControl('', [FormValidators.required]),

    });

  }

  showToasterSuccess() {
    this.notifyService.showSuccess("Success !!", "Transportation.com")
  }

  showToasterError() {
    this.notifyService.showError("Faild ", "Transportation.com")
  }


  // passengerData = new FormGroup({
  //   name: new FormControl(''),
  //   cardUniID: new FormControl(''),
  //   speed: new FormControl(''),
  //   longitude: new FormControl(''),
  //   latitude: new FormControl(''),
  // });

  sendData() {
    console.log(this.reactForm.value);
    let name: string = this.reactForm.value.name;
    let cardUniID: string = this.reactForm.value.cardUniID;
    let longitude: string = this.reactForm.value.longitude;
    let latitude: string = this.reactForm.value.latitude;
    let speed = Number(this.reactForm.value.speed);
    let val = {
      name,
      cardUniID,
      longitude,
      latitude,
      speed,

    }
    console.log(val);

    this.service.addPassenger(val).subscribe((res) => {
      console.log(res);
      this.showToasterSuccess();
      this.reactForm.reset();
      // get data again after add
      this.service.getPassenger().subscribe((res) => {
        for (let i = 0; i < res.length; i++) {
          if (res[i].status == 1) {
            res[i].status = "Active"

          } else {
            res[i].status = "Not Active"

          }
        }
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
  public data: Object[];
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
    this.commands = [
      { type: 'Edit', buttonOption: { iconCss: ' e-icons e-edit', cssClass: 'e-flat' } },
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


  get name() { return this.reactForm.get('name'); }
  get cardUniID() { return this.reactForm.get('cardUniID') };
  get speed() { return this.reactForm.get('speed') };
  get latitude() { return this.reactForm.get('latitude') };
  get longitude() { return this.reactForm.get('longitude') };






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
          name: this.rowParse.name,
          cardUniID: this.rowParse.cardUniID,
          speed: Number(this.rowParse.speed),
          longitude: this.rowParse.longitude,
          latitude: this.rowParse.latitude,

        };
        let id: string = this.reactForm.value.name;
        let name: string = this.reactForm.value.name;
        let cardUniID: string = this.reactForm.value.cardUniID;
        let longitude: string = this.reactForm.value.longitude;
        let latitude: string = this.reactForm.value.latitude;
        let speed = Number(this.reactForm.value.speed);
        let val = {
          name,
          cardUniID,
          longitude,
          latitude,
          speed,

        }
      

        this.service.putPassenger(obj).subscribe((res) => {
          this.showToasterSuccess();
          this.reactForm.reset();
          console.log(res);

        }, (err) => {
          this.showToasterError()
          console.log(err);

        })
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
          name: this.rowParse.name,
          cardUniID: this.rowParse.cardUniID,
          speed: this.rowParse.speed,
          longitude: this.rowParse.longitude,
          latitude: this.rowParse.latitude,

        };

        this.service.DeletePassenger(obj).subscribe((res) => {
          this.showToasterSuccess();
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

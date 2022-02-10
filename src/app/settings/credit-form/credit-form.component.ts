import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FormValidators } from '@syncfusion/ej2-angular-inputs';
import { ApiServiceService } from 'src/app/services/api-service.service';

@Component({
  selector: 'app-credit-form',
  templateUrl: './credit-form.component.html',
  styleUrls: ['./credit-form.component.scss']
})
export class CreditFormComponent implements OnInit {
  reactForm: FormGroup;
  // { [key: string]: Object }
  public data = [
    { name: "hassan", cardUniID: 30 },
    { name: "hassan", cardUniID: 30 },
    { name: "hassan", cardUniID: 30 },

  ];
  // maps the appropriate column to fields property
  public fields: Object = { text: 'name', value: 'cardUniID' };
  //set the placeholder to DropDownList input
  public text: string = "User Name";

  constructor(private API: ApiServiceService) {
    this.reactForm = new FormGroup({

      'name': new FormControl('', [FormValidators.required]),
      'points': new FormControl('', [FormValidators.required]),

    });

    this.API.getPassenger().subscribe((res) => {
      console.log(res);
      this.data = res

    }, (err) => {
      console.log(err);
    })

  }
  add() {
    console.log(this.reactForm.value);
    const obj = {
      "id": 0,
      "timeStamp": "2022-02-03T12:13:15.770Z",
      "passangerCardUniID": this.reactForm.value.name,
      "addedBlance": this.reactForm.value.points
    }
    this.API.addPoints(obj).subscribe((res)=>{console.log(res);
    } , (err)=>{console.log(err);
    })

  }
  
  ngOnInit(): void {
    let formId: HTMLElement = <HTMLElement>document.getElementById('formId');
    document.getElementById('formId').addEventListener(
      'submit',
      (e: Event) => {
        e.preventDefault();
        if (this.reactForm.valid) {
          alert('Customer details added!');
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
  get points() { return this.reactForm.get('points'); }
  


}

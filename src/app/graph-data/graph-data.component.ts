import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { ApiServiceService } from '../services/api-service.service';
@Component({
  selector: 'app-graph-data',
  templateUrl: './graph-data.component.html',
  styleUrls: ['./graph-data.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GraphDataComponent implements OnInit {
  public headerText: Object = [
    { text: 'Route' },
    { text: 'Driver' },
    { text: 'Vehicle' },
    { text: 'Time' },
  ];



  constructor(
    private _service : ApiServiceService
  ) {}

  ngOnInit(): void {}
  

}

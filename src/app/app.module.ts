import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MenuAllModule,
  SidebarModule,
  ToolbarModule,
  TreeViewAllModule,
} from '@syncfusion/ej2-angular-navigations';
import {
  RadioButtonModule,
  ButtonModule,
  CheckBoxModule,
} from '@syncfusion/ej2-angular-buttons';
import {
  DropDownListAllModule,
  ListBoxComponent,
  ListBoxModule,
} from '@syncfusion/ej2-angular-dropdowns'; 
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

import { SearchService, ToolbarService } from '@syncfusion/ej2-angular-grids';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { ListViewAllModule } from '@syncfusion/ej2-angular-lists';
import { MappingComponent } from './mapping/mapping.component';
import { PlanningComponent } from './planning/planning.component';
import { MapsModule } from '@syncfusion/ej2-angular-maps';
import {
  FilterService,
  GridAllModule,
  GridModule,
  GroupService,
  PageService,
  SortService,
} from '@syncfusion/ej2-angular-grids';
import { HttpClientModule } from '@angular/common/http';
import { TripMonitorComponent } from './trip-monitor/trip-monitor.component';
import { TripMonitorActiveGridComponent } from './trip-monitor/trip-monitor-active-grid/trip-monitor-active-grid.component';
import { TripMonitorCompletedGridComponent } from './trip-monitor/trip-monitor-completed-grid/trip-monitor-completed-grid.component';
import { TripMonitorChartComponent } from './trip-monitor/trip-monitor-chart/trip-monitor-chart.component';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import {
  ChartAllModule,
  RangeNavigatorAllModule,
  AccumulationChartAllModule,
} from '@syncfusion/ej2-angular-charts';
import { TripAnalysisComponent } from './trip-analysis/trip-analysis.component';
import {
  CalendarModule,
  DatePickerAllModule,
} from '@syncfusion/ej2-angular-calendars';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MappingActiveTripsComponent } from './mapping/mapping-active-trips/mapping-active-trips.component';
import { MappingHistoricTripsComponent } from './mapping/mapping-historic-trips/mapping-historic-trips.component';
import { SettingsComponent } from './settings/settings.component';
import { RouteComponent } from './settings/route/route.component';
import { DriverComponent } from './settings/driver/driver.component';
import { PassengerComponent } from './settings/passenger/passenger.component';
import { VehicleComponent } from './settings/vehicle/vehicle.component';
import { CommonModule, DatePipe } from '@angular/common';
import { NumericTextBoxAllModule } from '@syncfusion/ej2-angular-inputs';
import { DialogModule } from '@syncfusion/ej2-angular-popups';
import { GraphDataComponent } from './graph-data/graph-data.component';
import { GraphDataTimeComponent } from './graph-data/graph-data-time/graph-data-time.component';
import { GraphDataBusComponent } from './graph-data/graph-data-bus/graph-data-bus.component';
import { GraphDataRouteComponent } from './graph-data/graph-data-route/graph-data-route.component';
import { GraphDataDriverComponent } from './graph-data/graph-data-driver/graph-data-driver.component';
import {
  NgxMatDatetimePickerModule,
  NgxMatTimepickerModule,
  NgxMatNativeDateModule,
} from '@angular-material-components/datetime-picker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { MapComponent } from './mapping/map/map.component';
import { HistoricalMapComponent } from './mapping-historic-trips/historical-map/historical-map.component';
import { PassangerMapComponent } from './trip-monitor/passanger-map/passanger-map.component';
import { PassMapComponent } from './palnning/pass-map/pass-map.component';


import { NgApexchartsModule } from "ng-apexcharts";
import { CreditComponent } from './credit/credit.component';
import { CreditFormComponent } from './settings/credit-form/credit-form.component';


@NgModule({
  declarations: [
    AppComponent,
    MappingComponent,
    PlanningComponent,
    TripMonitorComponent,
    TripMonitorActiveGridComponent,
    TripMonitorCompletedGridComponent,
    TripMonitorChartComponent,
    TripAnalysisComponent,
    MappingActiveTripsComponent,
    MappingHistoricTripsComponent,
    SettingsComponent,
    RouteComponent,
    DriverComponent,
    PassengerComponent,
    VehicleComponent,
    GraphDataComponent,
    GraphDataTimeComponent,
    GraphDataBusComponent,
    GraphDataRouteComponent,
    GraphDataDriverComponent,
    MapComponent,
    HistoricalMapComponent,
    PassangerMapComponent,
    PassMapComponent,
    CreditComponent,
    CreditFormComponent,
   
    
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    SidebarModule,
    RadioButtonModule,
    MenuAllModule,
    DropDownListModule,
    ButtonModule,
    TreeViewAllModule,
    ListViewAllModule,
    MapsModule,
    ListBoxModule,
    GridModule,
    TabModule,
    ChartAllModule,
    RangeNavigatorAllModule,
    AccumulationChartAllModule,
    CalendarModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    ToolbarModule,
    GridAllModule,
    BrowserModule,
    NumericTextBoxAllModule,
    DialogModule,
    DatePickerAllModule,
    DropDownListAllModule,
    ReactiveFormsModule,
    FormsModule,
    CheckBoxModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatNativeDateModule,
    BrowserAnimationsModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatButtonModule, 
    LeafletModule ,
    NgApexchartsModule
  ],
  providers: [PageService, SortService, FilterService, GroupService ,SearchService, ToolbarService,
    DatePipe
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {
  MapsTheme,
  MapsTooltip,
  DataLabel,
  Maps,
  Marker,
  ILoadEventArgs,
  NavigationLine,
  Annotations,
} from '@syncfusion/ej2-angular-maps';
import { MapAjax } from '@syncfusion/ej2-maps'; 
Maps.Inject(Marker, MapsTooltip, DataLabel, NavigationLine, Annotations);
@Component({
  selector: 'app-mapping',
  templateUrl: './mapping.component.html',
  styleUrls: ['./mapping.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class MappingComponent implements OnInit {
  public load = (args: ILoadEventArgs) => {
    let theme: string = location.hash.split('/')[1];
    theme = theme ? theme : 'Material';
    args.maps.theme = <MapsTheme>(
      (theme.charAt(0).toUpperCase() + theme.slice(1))
        .replace(/-dark/i, 'Dark')
        .replace(/contrast/i, 'Contrast')
    );
  };
  // custom code end
  public zoomSettings: object = {
    zoomFactor: 5,
    enable: false,
  };
  public titleSettings: object = {
    text: 'Flight route from Los Angeles to Mexico city',
    textStyle: {
      size: '16px',
    },
  };
  public centerPosition: object = {
    latitude: 27.0902,
    longitude: -105.7129,
  };
  public layers: object[] = [
    {
      layerType: 'OSM',
      markerSettings: [
        {
          visible: true,
          template:
            '<div><img src="./assets/maps/images/group.svg" style="height:15px;width:15px;"></img></div>',
          dataSource: [
            {
              name: 'Mexico City',
              latitude: 23.6445,
              longitude: -102.832,
            },
          ],
          tooltipSettings: {
            visible: true,
            valuePath: 'name',
          },
        },
        {
          visible: true,
          template:
            '<div><img src="./assets/maps/images/ballon.png" style="height:30px;width:20px;"></img></div>',
          dataSource: [
            {
              name: 'Mexico City',
              latitude: 24.2005,
              longitude: -102.832,
            },
          ],
          tooltipSettings: {
            visible: true,
            valuePath: 'name',
          },
        },
        {
          visible: true,
          template:
            '<div style= "font-weight:500; font-size: 13px; text-align: left">Mexico</div>',
          dataSource: [
            {
              name: 'Mexico City',
              latitude: 24.0005,
              longitude: -101.2,
            },
          ],
        },
        {
          visible: true,
          template:
            '<div><img src="./assets/maps/images/oval.svg" style="height:15px;width:15px;"></img></div>',
          dataSource: [
            {
              name: 'Los Angeles',
              latitude: 34.0522,
              longitude: -118.2437,
            },
          ],
          tooltipSettings: {
            visible: true,
            valuePath: 'name',
          },
        },
        {
          visible: true,
          template:
            '<div><div style="text-align: right; font-weight:500; font-size: 13px;">Los Angeles</br>' +
            'International Airport</div></div>',
          dataSource: [
            {
              name: 'Los Angeles City',
              latitude: 34.7,
              longitude: -121.5,
            },
          ],
        },
        {
          visible: true,
          template:
            '<div><img src="./assets/maps/images/map-tooltip.svg" style="height:50px;width:100px;"></img></div>',
          dataSource: [
            {
              latitude: 28.5,
              longitude: -110.4,
            },
          ],
        },
      ],
      navigationLineSettings: [
        {
          width: 8,
          visible: true,
          angle: -0.05,
          color: '#00ace6',
          latitude: [23.6445, 34.0522],
          longitude: [-102.832, -118.2437],
        },
      ],
    },
  ];
  constructor() {
    //code
    
  }

  ngOnInit(): void {}
}

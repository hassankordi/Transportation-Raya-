import {
  Component,
  ViewEncapsulation,
  Inject,
  ViewChild,
  OnInit,
} from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { Menu, MenuItemModel } from '@syncfusion/ej2-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { ApiServiceService } from './services/api-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @ViewChild('sidebarMenuInstance')
  public sidebarMenuInstance: SidebarComponent;
  public width: string = '185px';
  public mediaQuery: string = '(min-width: 600px)';
  public target: string = '.main-content';
  public dockSize: string = '50px';
  public enableDock: boolean = true;
  constructor(private API:ApiServiceService) 
  {

  
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.openClick();
      this.openClick();
    }, 50);
  }

  public menuItems: MenuItemModel[] = [
    {
      text: 'Mapping',
      iconCss: 'icon-globe icon',
      url: '#/mapping',
    },
    {
      text: 'Planning',
      iconCss: 'icon-eye icon',
      url: '#/planning',
    },
    {
      text: 'Trip monitor',
      iconCss: 'icon-eye icon',
      url: '#/trip-monitor',
    },
    {
      text: 'Graph Data',
      iconCss: 'icon-globe icon',
      url: '#/graph',
    },
    {
      text: 'Credits',
      iconCss: 'icon-eye icon',
      url: '#/credits',
    },
  ];
  public menuItems2: MenuItemModel[] = [
    {
      text: 'Settings',
      iconCss: 'fas fa-cog',
      url: '#/settings',
    },
   
  ];
  // open new tab
  newTabClick(): void {
    let URL = location.href.replace(location.search, '');
    document
      .getElementById('newTab')
      .setAttribute('href', URL.split('#')[0] + 'sidebar/sidebar-menu');
  }

  openClick() {
    this.sidebarMenuInstance.toggle();
  }
}

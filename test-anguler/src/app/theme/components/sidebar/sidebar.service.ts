import {Injectable} from '@angular/core';
import {menuItems} from '../../../app.menu';

@Injectable()
export class SidebarService {

  public getMenuItems():Array<Object> {
    return menuItems;
  }
 
}

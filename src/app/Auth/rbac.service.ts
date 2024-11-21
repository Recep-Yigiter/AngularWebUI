import { Inject, Injectable, inject } from '@angular/core';
import { Role, User } from './types';
import { RoleService } from '../core/services/repository/role.service';

@Injectable({
  providedIn: 'root'
})
export class RbacService {
  private _roles = new Map();
  private _authenticatedUser!: User;
  private RoleService=inject(RoleService)



  async setRoles() {
    const roleDatas = (await this.RoleService.list()).data.map(c => c.normalizedName);

    for (const role of roleDatas) {
      this._roles.set(role.normalizedName, ['Admin']);

    }

  }





  isGranted(roleOrPermission: string): boolean {

   let tokenData= JSON.parse(localStorage.getItem("tokenData"));
   if (tokenData) {
    return tokenData.roles.includes(roleOrPermission);

   }

  }



}

import {inject } from '@angular/core';
import {CanActivateFn} from '@angular/router';



import { RbacService } from '../rbac.service';
import { Roles } from '../types';

export const AdminGuard: CanActivateFn = (route, state) => {



  return inject(RbacService).isGranted(Roles.ADMIN);

}

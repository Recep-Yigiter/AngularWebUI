import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YonetimComponent } from './yonetim.component';
import { RouterModule } from '@angular/router';
import { RoleComponent } from './role/role.component';
import { UserComponent } from './user/user.component';



@NgModule({
  declarations: [
    YonetimComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(
      [
        {
          path: "",
          children: [
             { path: 'role', component: RoleComponent, loadChildren: () => import("../yonetim/role/role.module").then(m => m.RoleModule) },
             { path: 'user', component: UserComponent, loadChildren: () => import("../yonetim/user/user.module").then(m => m.UserModule) },
          ]
        },
        
      ]),
  ]
})
export class YonetimModule { }

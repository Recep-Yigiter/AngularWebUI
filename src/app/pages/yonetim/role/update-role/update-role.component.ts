import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'src/app/core/services/repository/role.service';

@Component({
  selector: 'app-update-role',
  templateUrl: './update-role.component.html',
  styleUrls: ['./update-role.component.scss'],
})
export class UpdateRoleComponent implements OnInit {
  @Input() data: any;

  constructor(
    private fb: FormBuilder,
    private RoleService: RoleService,
    public activeModal: NgbActiveModal
  ) {}
  async ngOnInit() {}

  public frm: FormGroup = this.fb.group({
    name: [null, [Validators.required, Validators.maxLength(16)]],
  
    description: [null, [Validators.required, Validators.maxLength(16)]],
  });
  get name() {
    return this.frm.get('name');
  }
  get description() {
    return this.frm.get('description');
  }

  Kaydet() {
    const createModel = {
      id: this.data.id,
      name: this.frm.value.ad ? this.frm.value.ad : this.data.ad,
      description: this.frm.value.kod ? this.frm.value.kod : this.data.kod,
    };
   
    this.RoleService.update(
      createModel,
      () => {
        this.activeModal.close(true);
      },
      (errorMessage) => {}
    );
  }

  cikis() {
    this.activeModal.close(false);
  }
}

import { DialogService } from './../../service/dialog.service';
import { DepartmentService } from './../../service/department.service';
import { ModalService } from 'src/app/service/modal.service';
import { Category } from './../../model/category';
import { Output } from '@angular/core';
import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from 'src/app/service/category.service';
import { MyMessage } from 'src/app/const/message';

@Component({
  selector: 'app-category-save',
  templateUrl: './category-save.component.html',
  styleUrls: ['./category-save.component.css']
})
export class CategorySaveComponent implements OnInit {

  @Input() inputs;
  @Output() outputs;
  category : Category;
  requestStatus: Number = 0;
  isEdit = false;

  constructor(
    private modalSer: ModalService,
    private cateSer : CategoryService,
    private dialogSer: DialogService
  ) { }

  ngOnInit() {
    if(this.inputs != undefined) {
      this.category = this.inputs;
      this.isEdit = true;
    }else {
      this.category = new Category();
    }
  }

  closeModal() {
    this.modalSer.destroy();
  }

  save() {
    if(this.isEdit) {
      this.cateSer.update(this.category).subscribe(result => {
        this.dialogSer.init(MyMessage.categoryTitle,MyMessage.categoryUpdate,undefined, () => {this.outputs(); this.closeModal()})
      },err => {
        this.dialogSer.init(MyMessage.errorTitle,MyMessage.error400Message,undefined,() => {this.closeModal()})
      })
    }else {
      this.cateSer.create(this.category).subscribe(result => {
        this.dialogSer.init(MyMessage.categoryTitle,MyMessage.categoryCreate,undefined, () => {this.outputs(); this.closeModal()})
      },err => {
        this.dialogSer.init(MyMessage.errorTitle,MyMessage.error400Message,undefined,() => {this.closeModal()})
      })
    }
  }

}

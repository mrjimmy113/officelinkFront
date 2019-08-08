import { Component, OnInit } from '@angular/core';
import { ModalService } from '../service/modal.service';
import { TeamService } from '../service/team.service';
import { TeamSaveComponent } from '../team-save/team-save.component';
import { Team } from '../model/team';
import { UltisService } from '../service/ultis.service';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { DialogService } from '../service/dialog.service';
import { MyMessage } from '../const/message';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  itemList = new Array<Team>();
  currentPage = 1;
  maxPage;
  searchTerm = "";
  requestStatus: Number;
  isSort = "";

  constructor(
    private modalSer: ModalService, 
    private ser: TeamService, 
    private ultisSer: UltisService,
    private dialogSer: DialogService,
    ) { }

  ngOnInit() {
    this.search("");
  }

  search(value) {
    this.ser.searchGetPage(value, 1).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  openCreate() {
    this.modalSer.init(TeamSaveComponent, [], () => this.loadPage(this.currentPage));
  }

  openEdit(item) {
    this.modalSer.init(TeamSaveComponent, item, () => this.loadPage(this.currentPage));
  }

  filter() {
    let newSearchTerm = this.searchTerm;
    setTimeout(() => {
      if (newSearchTerm == this.searchTerm) {
        this.search(this.searchTerm);
      }
    }, 300);
  }

  delete(team: Team) {
    this.dialogSer.init("Delete Team", MyMessage.confirmDeleteTeam, () =>
      this.ser.delete(team.id).subscribe(
        result => {
          this.requestStatus = result;
          if (this.requestStatus == 200) {
            this.dialogSer.init("Operation success", MyMessage.deleteTeam, undefined, undefined)
            if (this.itemList.length <= 1) {
              this.loadPage(this.currentPage - 1);
            }
            else {
              this.loadPage(this.currentPage);
            }
          }
        },
        error => {
          if (error.status == 409) {
            this.dialogSer.init("Operation fail", MyMessage.deleteTeamHasEmplsWarning, undefined, undefined)
          } else if (error.status = 400) {
            this.dialogSer.init("Operation fail", MyMessage.error400Message, undefined, undefined)
          }
        }
      ), undefined);
  }

  loadPage(pageNumber) {
    this.currentPage = pageNumber;
    this.ser.searchGetPage(this.searchTerm, pageNumber).subscribe(result => {
      this.maxPage = result.maxPage;
      this.itemList = result.objList;
    })
  }

  sort(property) {
    if (property == "departmentName") {
      if (this.isSort == property) {
        this.itemList.sort(this.sortTeamByDepartmentASC());
        this.isSort = "";
      } else {
        this.itemList.sort(this.sortTeamByDepartmentDSC());
        this.isSort = property;
      }
    } else {
      if (this.isSort == property) {
        this.itemList.sort(this.ultisSer.sortByPropertyNameDSC(property));
        this.isSort = "";
      } else {
        this.itemList.sort(this.ultisSer.sortByPropertyNameASC(property));
        this.isSort = property;
      }
    }
  }

  sortTeamByDepartmentASC() {
    return function (a, b) {
      if (a['department'].name < b['department'].name) {
        return -1;
      }
      if (a['department'].name > b['department'].name) {
        return 1;
      }
      return 0;
    }
  }

  sortTeamByDepartmentDSC() {
    return function (a, b) {
      if (a['department'].name < b['department'].name) {
        return 1;
      }
      if (a['department'].name > b['department'].name) {
        return -1;
      }
      return 0;
    }
  }

  detail(team: Team) {
    this.modalSer.init(TeamDetailComponent, team, []);
  }
}

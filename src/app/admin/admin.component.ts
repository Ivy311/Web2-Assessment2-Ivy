import {Component, OnInit} from '@angular/core';
import {RouterOutlet, RouterLink, Router} from '@angular/router';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf} from '@angular/common';
import {baseUrl} from '../../api/api';
import {HttpClient} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatInput} from '@angular/material/input';
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef, MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatFormField, MatLabel, MatOption, MatSelect, NgForOf, FormsModule, MatInput, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderCellDef, MatCellDef, MatHeaderRow, MatRow, MatRowDef, MatHeaderRowDef],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit{
  category: any = '';
  organizer: any = '';
  city: any = '';
  categoryOptions: any = [];
  organizerOptions: any = [];
  cityOptions: any = [];
  dataList: any = [];
  active: any = '';
  caption: string = '';
  activeOptions = [
    {
      label: 'Activated',
      value: 1
    },
    {
      label: 'Unactivated',
      value: 0
    }
  ];
  displayedColumns: string[] = ['INDEX', 'ORGANIZER', 'CATEGORY', 'CAPTION', 'TARGET_FUNDING', 'CURRENT_FUNDING', 'CITY', 'STATUS', 'ACTION'];
  constructor(private http: HttpClient, private router: Router) {
  }

  ngOnInit(): void {
    this.getAllCategory();
    this.getAllOrganizer();
    this.getAllCity();
    this.getFundraiserList();
  }

  // get category filter list
  getAllCategory() {
    this.http.get(baseUrl + 'api/getCategoryList').subscribe(res => {
      this.categoryOptions = res;
    });
  }
  // get organizer filter list
  getAllOrganizer() {
    this.http.get(baseUrl + 'api/getOrganizers').subscribe(res => {
      this.organizerOptions = res;
    });
  }
  // get city filter list
  getAllCity() {
    this.http.get(baseUrl + 'api/getCity').subscribe(res => {
      this.cityOptions = res;
    });
  }
  // get all data by filter item
  getFundraiserList() {
    this.dataList = [];
    this.http.get(baseUrl + 'api/admin/getDataList', {
      params: {
        time: new Date().getTime(),
        CATEGORY_ID: this.category,
        ORGANIZER: this.organizer,
        CITY: this.city,
        ACTIVE: this.active,
        CAPTION: this.caption
      }
    }).subscribe((res: any) => {
      for (let i = 0; i < res.length - 1; i++) {
        res[i].INDEX = i + 1;
      }
      this.dataList = res;
      console.log(this.dataList);
    });
  }
  resetData() {
    this.organizer = '';
    this.city = '';
    this.category = '';
    this.getFundraiserList();
  }
  goDetail(data?: any) {
    this.router.navigate(['admin', 'detail'], {
      queryParams: {
        fundraiser_id: data ? data.FUNDRAISER_ID : null
      }
    });
  }
  deleteHandler(data: any) {
    console.log(data);
    if (+data.CURRENT_FUNDING > 0) {
      alert('Existing donations cannot be deleted');
      return;
    }
    const flag = window.confirm('Do you want to delete it?');
    if (flag) {
      this.http.delete('api/admin/deleteFundraiser/' + data.FUNDRAISER_ID).subscribe(res => {
        alert(res);
        this.getFundraiserList();
      });
    }
  }
}

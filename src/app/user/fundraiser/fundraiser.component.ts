import {Component, OnInit} from '@angular/core';
import {Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {NgForOf} from '@angular/common';
import {HttpClient} from '@angular/common/http';
import {baseUrl} from '../../../api/api';
import {
  MatCell, MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow, MatRowDef,
  MatTable
} from '@angular/material/table';
import {MatInput} from '@angular/material/input';

@Component({
  selector: 'fundraiser',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatSelectModule, FormsModule, NgForOf, MatTable, MatHeaderCell, MatColumnDef, MatCell, MatHeaderRow, MatRow, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef, MatInput],
  templateUrl: './fundraiser.component.html',
  styleUrl: './fundraiser.component.scss'
})
export class FundraiserComponent implements OnInit{
  category: any = '';
  organizer: any = '';
  city: any = '';
  categoryOptions: any = [];
  organizerOptions: any = [];
  cityOptions: any = [];
  dataList: any = [];
  constructor(private router: Router, private http: HttpClient) {
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
    this.http.get(baseUrl + 'api/getFundraiserList', {
      params: {
        CATEGORY_ID: this.category,
        ORGANIZER: this.organizer,
        CITY: this.city
      }
    }).subscribe(res => {
      this.dataList = res;
    });
  }
  goDetail(item: any) {
    this.router.navigate(['user', 'detail'], {
      queryParams: {
        fundraiser_id: item.FUNDRAISER_ID
      }
    })
  }
  resetData() {
    this.organizer = '';
    this.city = '';
    this.category = '';
    this.getFundraiserList();
  }
  donation(data: any) {
    this.router.navigate(['user', 'donation'], {
      queryParams: {
        fundraiser_id: data.FUNDRAISER_ID
      }
    })
  }
}

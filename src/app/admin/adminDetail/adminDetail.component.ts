import {Component, OnInit} from '@angular/core';
import {RouterOutlet, RouterLink, Router, ActivatedRoute} from '@angular/router';
import {MatFormField, MatLabel} from '@angular/material/form-field';
import {MatOption} from '@angular/material/core';
import {MatSelect} from '@angular/material/select';
import {NgForOf, NgIf} from '@angular/common';
import {baseUrl} from '../../../api/api';
import {HttpClient} from '@angular/common/http';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {MatCheckbox} from '@angular/material/checkbox';
import {MatRadioButton, MatRadioGroup} from '@angular/material/radio';

@Component({
  selector: 'app-admin-detail',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatFormField, MatLabel, MatOption, MatSelect, NgForOf, FormsModule, MatInput, MatTable, MatColumnDef, MatHeaderCell, MatCell, MatHeaderCellDef, MatCellDef, MatHeaderRow, MatRow, MatRowDef, MatHeaderRowDef, MatCheckbox, MatRadioGroup, MatRadioButton, ReactiveFormsModule, NgIf],
  templateUrl: './adminDetail.component.html',
  styleUrl: './adminDetail.component.scss'
})
export class AdminDetailComponent implements OnInit{
  caption = '';
  captionValid = true;
  organizer = '';
  organizerValid = true;
  category = '';
  categoryValid = true;
  categoryOptions: any = [];
  city = '';
  cityValid = true;
  target: any = null;
  targetValid = true;
  targetNumValid = true;
  active = 1;
  activeOptions = [
    {
      label: 'Activated',
      value :1
    },
    {
      label: 'Unactivated',
      value: 0
    }
  ];
  fundraiserId = null;
  detailInfo: any = null;
 constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.initData();
      this.getAllCategory();
      this.fundraiserId = params.fundraiser_id;
      this.getDetail();
    })
  }

  initData() {
    this.caption = '';
    this.organizer = '';
    this.category = '';
    this.city = '';
    this.target = '';
    this.active = 1;
  }

  getDetail() {
   if (!!this.fundraiserId) {
     this.http.get(baseUrl + 'api/getDetail',{
       params: {
         FUNDRAISER_ID: this.fundraiserId
       }
     }).subscribe(res => {
       this.detailInfo = res;
       this.caption = this.detailInfo.CAPTION;
       this.organizer = this.detailInfo.ORGANIZER;
       this.category = this.detailInfo.CATEGORY_ID;
       this.city = this.detailInfo.CITY;
       this.target = this.detailInfo.TARGET_FUNDING;
       this.active = this.detailInfo.ACTIVE

     });
   }
  }

  // get category filter list
  getAllCategory() {
    this.http.get(baseUrl + 'api/getCategoryList').subscribe(res => {
      this.categoryOptions = res;
    });
  }

  goBack() {
   history.back();
  }
  validCaptionHandler() {
   this.captionValid = !!this.caption.length;
  }

  validOrganizerHandler() {
    this.organizerValid = !!this.organizer.length;
  }
  validCategoryHandler() {
   this.categoryValid = !!this.category;
  }
  validCityHandler() {
   this.cityValid = !!this.city;
  }
  validTargetHandler() {
   this.targetValid = !!this.target;
    const reg = new RegExp('^[0-9]+([.][0-9]{1,})?$', 'ig');
   this.targetNumValid = reg.test(this.target);
   if (this.target == 0) {
     this.targetNumValid = false;
   }
  }

  saveHandler() {
    this.validCaptionHandler();
    this.validCategoryHandler();
    this.validOrganizerHandler()
    this.validCityHandler();
    this.validTargetHandler()
    if (this.categoryValid && this.captionValid && this.organizerValid && this.cityValid && this.targetValid && this.targetNumValid) {
      if (this.fundraiserId) {
        this.http.put(baseUrl + 'api/admin/updateFundraiser/' + this.fundraiserId, {
          CAPTION: this.caption,
          ORGANIZER: this.organizer,
          CITY: this.city,
          TARGET_FUNDING: this.target,
          ACTIVE: +this.active,
          CATEGORY_ID: this.category
        }).subscribe(res => {
          console.log(res);
          alert('update successfully');
          this.goBack();
        });
      } else {
        this.http.post(baseUrl + 'api/admin/addFundraiser', {
          CAPTION: this.caption,
          ORGANIZER: this.organizer,
          CITY: this.city,
          TARGET_FUNDING: this.target,
          ACTIVE: +this.active,
          CATEGORY_ID: this.category
        }).subscribe(res => {
          alert('add successfully');
          this.goBack();
        });
      }
    }
  }
}

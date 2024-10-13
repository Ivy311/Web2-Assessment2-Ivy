import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterOutlet} from '@angular/router';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule} from '@angular/forms';
import {NgForOf, NgIf} from '@angular/common';
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
  selector: 'fundraiser-donation',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatSelectModule, FormsModule, NgForOf, MatTable, MatHeaderCell, MatColumnDef, MatCell, MatHeaderRow, MatRow, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef, MatInput, NgIf],
  templateUrl: './donation.component.html',
  styleUrl: './donation.component.scss'
})
export class DonationComponent implements OnInit{
  fundraiserId: any = '';
  detailInfo: any = {};
  amount: any = '';
  giver = '';
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.fundraiserId = params.fundraiser_id;
      this.getDetail();
    })
  }

  // get detail
  getDetail() {
    this.http.get(baseUrl + 'api/getDetail', {
      params: {
        time: new Date().getTime(),
        FUNDRAISER_ID: this.fundraiserId
      }
    }).subscribe(res => {
      this.detailInfo = res;
    });
  }
  donation() {
    if (!this.amount) {
      alert('Please enter the amount');
      return;
    }
    const reg = new RegExp('^[0-9]+([.][0-9]{1,})?$', 'ig');
    if (!reg.test(this.amount)){
      alert('Please enter a number that is greater than AUD 5.');
      return;
    }
    if(this.amount < 5) {
      alert(' the minimum of donation is 5 AUD.');
      return;
    }
    this.http.post(baseUrl + 'api/donation', {
      AMOUNT: this.amount,
      GIVER: this.giver,
      FUNDRAISER_ID: this.detailInfo.FUNDRAISER_ID
    }).subscribe(res => {
      alert(`Thank you for your donation` + (!!this.detailInfo.ORGANIZER ? ` to ${this.detailInfo.ORGANIZER}` : ''));
      history.back();
    });
  }
}

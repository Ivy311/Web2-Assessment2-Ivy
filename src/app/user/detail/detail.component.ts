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

@Component({
  selector: 'fundraiser-detail',
  standalone: true,
  imports: [RouterOutlet, RouterLink, MatSelectModule, FormsModule, NgForOf, MatTable, MatHeaderCell, MatColumnDef, MatCell, MatHeaderRow, MatRow, MatHeaderCellDef, MatCellDef, MatHeaderRowDef, MatRowDef, NgIf],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss'
})
export class DetailComponent implements OnInit{
  fundraiserId: any = '';
  detailInfo: any = {};
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
      this.detailInfo.donationList.reverse();
    });
  }
  donation() {
    this.router.navigate(['user', 'donation'], {
      queryParams: {
        fundraiser_id: this.fundraiserId
      }
    })
  }
}

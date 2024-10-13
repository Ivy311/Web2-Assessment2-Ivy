import {Component, OnInit} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'start-up',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './startUp.component.html',
  styleUrl: './startUp.component.scss'
})
export class StartUpComponent implements OnInit{
  progress: number = 0;
  timer: any = 0;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.startLoading();
  }

  startLoading() {
    this.timer = setInterval(() => {
      this.progress += Math.ceil(Math.random() * 30);
      if (this.progress >= 100) {
        this.router.navigateByUrl('/user/home');
        clearInterval(this.timer);
      }
    }, 500);
  }
}

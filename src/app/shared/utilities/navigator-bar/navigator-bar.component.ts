import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigator-bar',
  templateUrl: './navigator-bar.component.html',
  styleUrls: ['./navigator-bar.component.scss']
})
export class NavigatorBarComponent implements OnInit {
  progress: number = 0;
  interval: any;

  constructor() {}

  ngOnInit(): void {
    this.startProgress();
  }

  startProgress() {
    // 0'dan 100'e kadar ilerleme çubuğunu başlatıyoruz
    this.interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 10;  // Her 100 ms'de %2 ilerleme
      }
    }, 100);
  }

  ngOnDestroy(): void {
    // Bileşen yok olduğunda intervali temizliyoruz
    if (this.interval) {
      clearInterval(this.interval);
    }
  }
}
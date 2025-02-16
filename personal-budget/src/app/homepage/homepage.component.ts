import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Chart, ArcElement, Tooltip, Legend, PieController } from 'chart.js';
import { isPlatformBrowser } from '@angular/common';
import { ArticleComponent } from '../article/article.component';
import { BreadcrumbsComponent } from '../breadcrumbs/breadcrumbs.component';
import { D3ChartComponent } from '../d3-chart/d3-chart.component';

@Component({
  selector: 'pb-homepage',
  imports: [ArticleComponent,BreadcrumbsComponent,D3ChartComponent],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'] 
})
export class HomepageComponent implements AfterViewInit {
  
  public dataSource = {
    datasets: [
      {
        data: [] as number[],  
        backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19']
      }
    ],
    labels: [] as string[]
  };

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    Chart.register(ArcElement, Tooltip, Legend, PieController);
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      console.warn("Skipping chart creation: Running on the server.");
      return;
    }

    this.http.get('http://localhost:3000/budget').subscribe({
      next: (res: any) => {
        console.log("API Response: ", res);

        
        this.dataSource = {
          datasets: [{
            data: res.myBudget.map((item: any) => item.budget),
            backgroundColor: ['#ffcd56', '#ff6384', '#36a2eb', '#fd6b19']
          }],
          labels: res.myBudget.map((item: any) => item.title)
        };

        console.log("Updated dataSource: ", this.dataSource);

        this.createChart();
      },
      error: (err) => {
        console.error("API Error: ", err);
      }
    });
  }

  createChart() {
    if (!isPlatformBrowser(this.platformId)) return; 

    const ctx = document.getElementById("myChart") as HTMLCanvasElement;
    if (!ctx) {
      console.error("Canvas element not found"); 
      return;
    }

    console.log("Creating chart with data: ", this.dataSource); 

    new Chart(ctx, {
      type: 'pie',
      data: this.dataSource 
    });
  }
}

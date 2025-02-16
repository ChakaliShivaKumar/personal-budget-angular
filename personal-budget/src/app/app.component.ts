import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { HeroComponent } from './hero/hero.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AboutComponent } from './about/about.component';
import { LoginComponent } from './login/login.component';
import { P404Component } from './p404/p404.component';
import { FooterComponent } from './footer/footer.component';
import { ArticleComponent } from './article/article.component';
import { D3ChartComponent } from './d3-chart/d3-chart.component';

@Component({
  selector: 'pb-root',
  imports: [RouterOutlet,MenuComponent,HeroComponent,HomepageComponent, AboutComponent, LoginComponent,P404Component, FooterComponent, ArticleComponent,D3ChartComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'personal-budget';
}

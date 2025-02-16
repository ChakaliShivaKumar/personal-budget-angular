import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private apiUrl = 'http://localhost:3000/budget'; 
  private cachedData: { title: string; budget: number; }[] | null = null; 

  constructor(private http: HttpClient) { }

  getData(): Observable<{ title: string; budget: number; }[]> {
    if (this.cachedData) {
      return of(this.cachedData);
    }

    return this.http.get<{ myBudget: { title: string; budget: number; }[] }>(this.apiUrl)
      .pipe(
        map(response => {
          this.cachedData = response.myBudget;
          return this.cachedData;
        })
      );
  }
}
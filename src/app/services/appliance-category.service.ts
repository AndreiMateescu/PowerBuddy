import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApplianceCategory } from '../models/appliance-category.model';

@Injectable({
  providedIn: 'root'
})
export class ApplianceCategoryService {
  private baseUrl: string = 'applianceCategory';

  constructor(private http: HttpClient) { }

  public getApplianceCategories(): Observable<ApplianceCategory[]>{
    return this.http.get<ApplianceCategory[]>(`${environment.apiUrl}${this.baseUrl}`);
  }

  public getCategory(id: number): Observable<ApplianceCategory> {
    return this.http.get<ApplianceCategory>(
      `${environment.apiUrl}${this.baseUrl}/${id}`
    );
  }
}

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Appliance } from '../models/appliance.model';
import { PaginatedListResponse } from '../models/paginated-list-response.model';
import { QueryCriteria } from '../models/query-criteria.model';

@Injectable({ providedIn: 'root' })
export class ApplianceService {
  private baseUrl: string = 'appliance';
  constructor(private httpClient: HttpClient) {}

  public getAppliances(
    queryCriteria: QueryCriteria
  ): Observable<PaginatedListResponse<Appliance>> {
    const httpParams = this.getHttpParams(queryCriteria);
    return this.httpClient.get<PaginatedListResponse<Appliance>>(
      `${environment.apiUrl}${this.baseUrl}`,
      {
        headers: {
          ...this.acceptHeader,
        },
        params: httpParams,
      }
    );
  }

  public getAppliance(id: number): Observable<Appliance> {
    return this.httpClient.get<Appliance>(
      `${environment.apiUrl}${this.baseUrl}/${id}`,
      {
        headers: {
          ...this.acceptHeader,
        },
      }
    );
  }

  public addAppliance(appliance: Appliance): Observable<Appliance> {
    return this.httpClient.post<Appliance>(
      `${environment.apiUrl}${this.baseUrl}`,
      appliance,
      {
        headers: this.headers,
      }
    );
  }

  public updateAppliance(
    id: number,
    appliance: Appliance
  ): Observable<Appliance> {
    return this.httpClient.put<Appliance>(
      `${environment.apiUrl}${this.baseUrl}/${id}`,
      appliance,
      {
        headers: this.headers,
      }
    );
  }

  public updateApplianceStatus(
    id: number,
    status: boolean
  ): Observable<Appliance> {
    return this.httpClient.patch<Appliance>(
      `${environment.apiUrl}${this.baseUrl}/${id}`,
      { status },
      {
        headers: this.headers,
      }
    );
  }

  public deleteAppliance(id: number): Observable<void> {
    return this.httpClient.delete<void>(
      `${environment.apiUrl}${this.baseUrl}/${id}`
    );
  }

  private get headers() {
    return {
      ...this.contentTypeHeader,
      ...this.acceptHeader,
    };
  }

  private get contentTypeHeader() {
    return { 'Content-Type': 'application/json' };
  }

  private get acceptHeader() {
    return { Accept: 'application/json' };
  }

  private getHttpParams(queryCriteria: QueryCriteria): HttpParams {
    let params = new HttpParams();
    if (!queryCriteria) return params;

    for (const paramKey in queryCriteria) {
      const paramValue =
        queryCriteria[paramKey as keyof QueryCriteria]?.toString();
      if (paramKey && paramValue) params = params.append(paramKey, paramValue);
    }
    return params;
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetIssuesResponse, InfoResponse, Issue } from '../models/issues';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'any'
})
export class IssuesService {

  constructor(private http: HttpClient, private authService: AuthService) { }

  list(page = 1): Observable<GetIssuesResponse> {
    return this.http.get(environment.apiPath + 'issues/?page=' + page, {
      headers: this.authService.authHeaders,
      observe: 'response'
    }).pipe(map(response => {
      const headers = response.headers
      return {
        currentPage: parseInt(headers.get('Current-Page') || '1'),
        pageItems: parseInt(headers.get('Page-Items') || '0'),
        totalCount: parseInt(headers.get('Total-Count') || '0'),
        totalPages: parseInt(headers.get('Total-Pages') || '1'),
        data: response.body as Issue[]
      }
    }))
  }

  getOpenedIssues(page: number | null = null) {
    return this.http.get(environment.apiPath + 'issues?q[status_eq]=0' + (page !== null ? `&page=${page}` : ''), {
      headers: this.authService.authHeaders,
      observe: 'response'
    })
  }

  getClosedIssues(page: number | null = null) {
    return this.http.get(environment.apiPath + 'issues?q[status_eq]=1' + (page !== null ? `&page=${page}` : ''), {
      headers: this.authService.authHeaders,
      observe: 'response'
    })
  }

  aggregatedIssuesInfo(): Observable<InfoResponse> {
    return combineLatest(
      this.getOpenedIssues(),
      this.getClosedIssues()
    ).pipe(map(([openedResponse, closedResponse]) => {
      const opened = parseInt(openedResponse.headers.get('Total-Count') || '0')
      const closed = parseInt(closedResponse.headers.get('Total-Count') || '0')
      return {
        opened,
        closed,
        total: opened + closed
      }
    }))
  }
}

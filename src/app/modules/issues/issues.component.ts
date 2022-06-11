import { Component, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { GetIssuesResponse, InfoResponse } from 'src/app/models/issues';
import { IssuesService } from 'src/app/services/issues.service';

@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.scss']
})
export class IssuesComponent implements OnInit {
  listData: GetIssuesResponse | null = null
  stopListening = new Subject<void>()
  pages: number[] = []
  info: InfoResponse | null = null

  constructor(private issuesService: IssuesService) { }

  ngOnInit(): void {
    this.getList()
    this.issuesService.aggregatedIssuesInfo()
      .subscribe(resp => {
        this.info = resp
      })
  }

  private getList(page = 1) {
    this.issuesService.list(page).pipe(takeUntil(this.stopListening)).subscribe(data => {
      this.listData = data
      this.pages = this.genNumberList(data.totalPages || 1)
    })
  }

  private genNumberList(end: number) {
    const arr: number[] = []
    for (let i = 1; i <= end; i++) arr.push(i);
    return arr
  }

  changePage(page: number) {
    if (page === this.listData?.currentPage) return;
    this.stopListening.next();
    this.getList(page);
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IssuesRoutingModule } from './issues-routing.module';
import { IssuesComponent } from './issues.component';
import { IssuesService } from 'src/app/services/issues.service';


@NgModule({
  declarations: [
    IssuesComponent
  ],
  imports: [
    CommonModule,
    IssuesRoutingModule
  ],
  providers: [IssuesService]
})
export class IssuesModule { }

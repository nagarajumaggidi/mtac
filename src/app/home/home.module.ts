import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HelpComponent } from './help/help.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UsersComponent } from './users/users.component';
import { HttpClientModule } from '@angular/common/http';
import { EthenicgroupComponent } from './ethenicgroup/ethenicgroup.component';
import { StatusComponent } from './status/status.component';
import { SpecialeventComponent } from './specialevent/specialevent.component';
import { UserdetailsComponent } from './userdetails/userdetails.component';
import { ServicerequestComponent } from './servicerequest/servicerequest.component';
import { TestcodeComponent } from './testcode/testcode.component';
import { PostalcodeComponent } from './postalcode/postalcode.component';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import {NgxPaginationModule} from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ApplicationlistComponent } from './applicationlist/applicationlist.component';
import { RegisteredcandidateComponent } from './registeredcandidate/registeredcandidate.component';
import { AdministrativeuserComponent } from './administrativeuser/administrativeuser.component';
import { EmployementtypeComponent } from './employementtype/employementtype.component';
import { PositiontypeComponent } from './positiontype/positiontype.component';
import { PositionsComponent } from './positions/positions.component';
import { CategoryComponent } from './category/category.component';
import { FeestructureComponent } from './feestructure/feestructure.component';
import { DesignationComponent } from './designation/designation.component';
import { ApplicationComponent } from './application/application.component';
import { EmployeementinfoComponent } from './employeementinfo/employeementinfo.component';
import { VerifyComponent } from './verify/verify.component';
import { UserlistComponent } from './userlist/userlist.component';


@NgModule({
  declarations: [DashboardComponent, HelpComponent, UsersComponent, EthenicgroupComponent,StatusComponent,SpecialeventComponent, UserdetailsComponent, ServicerequestComponent, TestcodeComponent, PostalcodeComponent, ApplicationlistComponent, RegisteredcandidateComponent, AdministrativeuserComponent, EmployementtypeComponent, PositiontypeComponent, PositionsComponent, CategoryComponent, FeestructureComponent, DesignationComponent, ApplicationComponent, EmployeementinfoComponent, VerifyComponent, UserlistComponent],
  imports: [
    CommonModule, ReactiveFormsModule, FormsModule, HttpClientModule,Ng2SearchPipeModule,NgMultiSelectDropDownModule.forRoot(),NgxPaginationModule
  ]
})
export class HomeModule { }

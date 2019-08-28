import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-servicerequest',
  templateUrl: './servicerequest.component.html',
  styleUrls: ['./servicerequest.component.scss']
})
export class ServicerequestComponent implements OnInit {
  sponsorIdData: any=[];
  address: any;
  notificationEmail: any;
  notificationPhone: any;
  allServiceRequestData: any=[];
  userrole=sessionStorage.getItem('userRole');


  constructor(private dataservice:DataService) {
      this.getServiceRequestDetails();
   }
   getNotificationDetails(data){
     this.address=data.address;
     this.notificationEmail=data.notificationEmail;
     this.notificationPhone=data.notificationPhone;
   }

   getServiceRequestDetails(){
    if((sessionStorage.getItem('userRole')=='COMMISSIONERUSER') || (sessionStorage.getItem('userRole')=='ADMIN')){
    this.dataservice.getServiceRequestDetails(sessionStorage.getItem('sponsorId')).subscribe(response=>{
     this.sponsorIdData=response.resultData;
    })
  }
    if((sessionStorage.getItem('userRole')=='SUPPORTUSER') || (sessionStorage.getItem('userRole')=='SUPERADMIN')){
      this.dataservice.getAllServiceRequestDetails().subscribe(response=>{
        this.sponsorIdData=response.resultData;
    })
  }
  }

   ngOnInit() {
  }
  
}

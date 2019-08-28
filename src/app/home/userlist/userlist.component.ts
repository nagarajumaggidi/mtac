import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.scss']
})
export class UserlistComponent implements OnInit {

  applicationId: any;
  getUserListId: any;
  localuserdata: any;

  constructor(private dataservice: DataService, private router: Router) { }

  ngOnInit() {
    this.idBasedApiCall();

    this.localuserdata = JSON.parse(localStorage.getItem('userinformation'))
     console.log(this.localuserdata)
  }

  idBasedApiCall(){
    debugger;
    // requestobj['positionId'] = localStorage.getItem('applyid');
    // requestobj['userId'] = sessionStorage.getItem('userId');
    if(localStorage.getItem('positionId') != null && sessionStorage.getItem('userId') != null){
      this.appicationid();
    }
    if(localStorage.getItem('positionId') == null && sessionStorage.getItem('userId') != null){
      this.UserListById();
    }
  }

  appicationid() {
    let requestobj = {};
    requestobj['positionId'] = localStorage.getItem('positionId');
    requestobj['userId'] = sessionStorage.getItem('userId');
    this.dataservice.getuserlistByIds(requestobj).subscribe(res => {

      this.applicationId = res.resultData;

      console.log(this.applicationId);
    });
  }



  UserListById() {
    debugger;
    const id = sessionStorage.getItem('userId');
    this.dataservice.getUserListById(id).subscribe(res => {

      this.getUserListId = res.resultData;

      console.log(this.getUserListId);
    })
  }

  existingApp(appId){
      alert(appId)
    this.router.navigate(['/dashboard'],{queryParams: { idApp : appId }});
  }

}

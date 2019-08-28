import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, EmailValidator, FormArray, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-userdetails',
  templateUrl: './userdetails.component.html',
  styleUrls: ['./userdetails.component.scss']
})
export class UserdetailsComponent implements OnInit {
  profileForm: FormGroup;
  userDetails: any;
  username: any;
  firsname: any;
  lastname: any;
  phone: any;
  email: any;

  constructor(private dataservice:DataService,private fb:FormBuilder) {
    this.getusersByid();
   }
getusersByid(){
this.dataservice.getuserByid(sessionStorage.getItem('sponsorId')).subscribe(data=>{
  this.userDetails=data.resultData;
  
})
}
save(formData:any){
  formData.sponsorId=sessionStorage.getItem('sponsorId');
  formData.role="COMMISSIONERUSER"
  this.dataservice.postUsers(formData).subscribe(data=>{
    this.getusersByid();
  })
}
  ngOnInit() {
    this.profileForm=this.fb.group({
      'firstName':[null,Validators.required],
      'lastName':[null,Validators.required],
      'emailId':['',Validators.compose([Validators.required,Validators.email])],
      'mobileNum':['',Validators.compose([Validators.required,Validators.pattern('[6-9]\\d{9}')])],
      'userName':[null,Validators.required],
       })
  }


}

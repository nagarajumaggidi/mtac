
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, EmailValidator, FormArray, AbstractControl } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
 
  data: Object;
  profileForm: FormGroup;
  pid: number
  pfname: string;
  plname: string;
  pemail: string;
  prole:any;

  pmobileno:string;
  puserName:string;
  upassWord:string;
  updata: any;
  updatfrm: boolean = false;
  addfrm: boolean= false;
  sponserUsers:any;
  psponsorId: any;
  

  constructor(private http:HttpClient, private fb:FormBuilder,
     private auth: AuthService, private dataservice:DataService) { 
 

   
  }

  ngOnInit() {
       this.getUser();
      this.profileForm=this.fb.group({
        'firstName':[null,Validators.required],
        'lastName':[null,Validators.required],
        'emailId':['',Validators.compose([Validators.required,Validators.email])],
        'role':[null,Validators.required],
        'mobileNum':['',Validators.compose([Validators.required,Validators.pattern('[6-9]\\d{9}')])],
        'userName':[null,Validators.required],
        'sponsorId':[null],
        'id':[null],
        'status':[null]
        
         })
  }
  
 getUser() {
  
    this.dataservice.getUsersData().subscribe(data => {
      this.data = data.resultData;
    })
  }
  addUsers(profileForm){
    profileForm.reset();
    this.updatfrm = false;
    this.addfrm= true;
  }

  save(profileForm){
  
      this.dataservice.postUsers(profileForm.value).subscribe(data=>{
        console.log("adding data",data);
        profileForm.reset();
        this.getUser();
      })
  }
  changeUser(){
    this.dataservice.getSponserUser().subscribe(data => {
      this.sponserUsers = data.resultData;
    })
  }
  editForm(data){
    console.log("hfdhf",data.id)
    this.updatfrm= true;
    this.addfrm= false;
    this.profileForm.patchValue({
      'mobileNum':data.mobileNum,
      'role':data.roles[0],
      'emailId':data.emailId,
      'sponsorId':data.sponsorId,
      'firstName':data.firstName,
      'lastName':data.lastName,
      'userName':data.username,
      'id':data.id,
      'status':data.status
     
      })
  }
  
  deleteData(id) {
    this.dataservice.deleteUsers(id).subscribe(data => {
      console.log("deleting data",data)
      this.getUser();
    })
  }

  updateValue(profileForm) {
    var dt = { 
      id: profileForm.id,
      role:profileForm.role,
      firstName: profileForm.firstName,
       lastName: profileForm.lastName, 
       emailId: profileForm.emailId,
       userName: profileForm.userName,
       mobileNum: profileForm.mobileNum,
       sponsorId: profileForm.sponsorId,
       status: profileForm.status
       }
       console.log(dt);
   this.dataservice.updateUsers(profileForm.value).subscribe(data => {
     
      this.getUser();
    })
    profileForm.reset();
  }
  
}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, EmailValidator, FormArray, AbstractControl } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-registeredcandidate',
  templateUrl: './registeredcandidate.component.html',
  styleUrls: ['./registeredcandidate.component.scss']
})
export class RegisteredcandidateComponent implements OnInit {

  data: Object;
  profileForm: FormGroup;
  pid: number;
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
  anotherobj: any;
  obj1: any;
  obj2: any;
  registerActiveData: any
  

  constructor(private http:HttpClient, private fb:FormBuilder,
     private auth: AuthService, private dataservice: DataService) { 
 

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
    const formObj = {
        "pageNumber" : 0,
        "pageSize" : 10
      }
    this.dataservice.getRegisteredList(formObj).subscribe(res => {
      this.data = res.responseDataList;
      console.log(this.data);
    })
  }


  registerActiveStatus(data){
    debugger;
    let deleteobj={};
    deleteobj['id']= data.id;
    deleteobj['updatedBy']=sessionStorage.getItem('userId');
    if (data.status === "Active") {
      status = "Inactive"
    } else {
      status = "Active";
    }
    deleteobj['status'] = status;
    this.dataservice.registerStatus(deleteobj).subscribe(data => {
      console.log(data);
      this.getUser();
    })
  }
}

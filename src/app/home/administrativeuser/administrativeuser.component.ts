import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, EmailValidator, FormArray, AbstractControl } from '@angular/forms';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-administrativeuser',
  templateUrl: './administrativeuser.component.html',
  styleUrls: ['./administrativeuser.component.scss']
})
export class AdministrativeuserComponent implements OnInit {

  myform : FormGroup;

  constructor(private http:HttpClient, private fb:FormBuilder,
    private auth: AuthService, private dataservice: DataService) {
      
     }
   
get f() 
  { 
    return this.myform.controls;
  }

  ngOnInit() {
    
    this.myform =  this.fb.group({

      email : ["",[Validators.required, Validators.minLength(6), 
      Validators.maxLength(25), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],

      password : ["",[Validators.required, Validators.minLength(6), 
        Validators.maxLength(25), Validators.pattern("^[a-zA-Z0-9]*$")]],
        
     
    
    });
    this.getAdminUsers();
  }
//---------------------For Model pop-up-------------------------
addModel(myform)
{
  myform.reset();
}


  //---------------------getAdminUsers------------------------------
  adminUser:any;
  admininfo:any;
  createuser: any;
  statusData: any

  getAdminUsers()
  {
    this.dataservice.getAdminUsers().subscribe(res  =>{
   this.adminUser = res.responseDataList;
   console.log(this.adminUser);
  //  this.admininfo= this.adminUser.responseDataList;
  //   console.log(this.admininfo);
    })
  }

  
 //---------------------createUser------------------------------------
  createUser(addForm){
    debugger;
    addForm['role'] = "admin";
    this.dataservice.createUser(addForm).subscribe(data => {
      this.createuser = data;
      this.getAdminUsers();
    })
   
  }

  statusAdministrative(data) {
    debugger;
    let positionobj= {};
    positionobj['id'] = data.id;
    positionobj['updatedBy'] = sessionStorage.getItem('userId');
    if(data.status === "Active"){
    status = "Inactive"
    }else{
    status = "Active";
    }
    positionobj['status'] = status;
    this.dataservice.registerStatus(positionobj).subscribe(data => {
    this.statusData=data;
    console.log(this.statusData)
    this.getAdminUsers();
    });
    }
  


}

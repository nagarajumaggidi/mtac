import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, EmailValidator, FormArray, AbstractControl } from '@angular/forms';
import { ThrowStmt } from '@angular/compiler';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-positiontype',
  templateUrl: './positiontype.component.html',
  styleUrls: ['./positiontype.component.scss']
})
export class PositiontypeComponent implements OnInit {


  updatfrm: boolean = false;
  addfrm: boolean= false;
  datas:any;
  anotherdatas:any;
  updateData: any;
  updateDateById: any;
  positionTypeForm: FormGroup;
  addforms: FormGroup;
  position2:boolean = true;
  positiondata: any;
  position1:boolean = true;
  anotherobj={};
  lastupdated:any;
  obj1:any;
  obj2:any;
  postionType: string;

  constructor(private http:HttpClient, private fb:FormBuilder,
    private auth: AuthService, private dataservice:DataService) { }
   

  ngOnInit() 
  {

      this.addforms=this.fb.group({
      'positionType':['',Validators.required],
      })
    
      this.positionTypeForm=this.fb.group({
      'positionTypeName':['',Validators.required],
      })

       this.getUser();
  }


  addEmployeementType(myForm) {
    myForm.reset();
  }
   getUser(){
      this.dataservice.getPositionType().subscribe(data => {
      this.datas = data.resultData;
      console.log(this.datas);
    })
   }



  editPositionType(id)
  {
    this.updatfrm= true;
    this.addfrm= false;
    this.dataservice.getPositionTypeById(id).subscribe(data => {
    this.updateData = data.resultData;

    this.positionTypeForm.setValue({
      'positionTypeName': this.updateData.positionTypeName
    });
    
  })
  }


  updateEvent(updateDataById) {
    updateDataById['id'] = this.updateData.id;
    updateDataById['lastUpdatedBy'] = sessionStorage.getItem('userId');
    console.log(updateDataById);
    this.dataservice.updatePositionTypeById(updateDataById).subscribe(data => {
    this.updateDateById = data;
    this.getUser();
    console.log(this.updateDateById);
    })

  }



  activedata(data){
    let  positionobj= {};
    positionobj['id'] = data.id;
    positionobj['lastUpdatedBy'] = sessionStorage.getItem('userId');
     if(data.status === "Active"){
        status = "Inactive"
     }else{
        status = "Active";
     }
    positionobj['status'] = status;
     this.dataservice.actionPositionType(positionobj).subscribe(data => {
     this.positiondata=data;
     if(this.positiondata.errorCode=='OK')
     {
      this.getUser();
     }
     });
     
  }

  addata(positiontype)
  {
    let requestobj={};
    requestobj['positionTypeName']=positiontype;
    requestobj['lastUpdatedBy'] = sessionStorage.getItem('userId');
    this.dataservice.sendpositiondata(requestobj).subscribe(data => {
    this.datas = data;
    this.getUser();
    this.postionType = '';
    })
  }

  
  

} 


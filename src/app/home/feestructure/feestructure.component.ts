import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, EmailValidator, FormArray, AbstractControl } from '@angular/forms';
import { debugOutputAstAsTypeScript } from '@angular/compiler';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-feestructure',
  templateUrl: './feestructure.component.html',
  styleUrls: ['./feestructure.component.scss']
})
export class FeestructureComponent implements OnInit {

  
  feeStructureFrom: FormGroup;
  getfee: any;
  datas: any;
  categoryList: any;
  getIdValue: any;
  gendername: any;
  feeAmount: number;
  positionTypeId: any;
  categoryTypeId: any;
  postfeestructure: any;
  getfeestructurebyid:any;
  updateFeeStructureData: any;
  dataAccess: any;
  anotherobj: any;
  obj1: any;
  obj2: any;
  feestatus: any;
  statusData: any;
  gender: any = [
    {
      id: 1,
      value: "Male",
    },
    {
      id: 2,
      value: "Female",
    },
    {
      id: 3,
      value: "Others",
    }
  ]
  
  constructor(private http:HttpClient, private fb:FormBuilder, private dataservice:DataService) { }

    get f() 
  { 
    return this.feeStructureFrom.controls;
  }
  ngOnInit() {
    this.feeStructureFrom=this.fb.group({
      'categoryId':[null,Validators.required],
      'positionTypeId':[null,Validators.required],
      'gender':[null,Validators.required],
      'feeAmount':[null,Validators.required]
      })
      console.log(this.gender);
      this.getfeestructure();
      this.getUser();
      this.categoryget();
  }
  getpositionTypeId(args){
    this.positionTypeId = args.target.value;  
    console.log(this.positionTypeId);
  }
  getcategoryTypeId(args){
    this.categoryTypeId = args.target.value;  
    console.log(this.categoryTypeId);
  }
  getgendername(args){
    this.gendername = args.target.value;  
    console.log(this.gendername);
  }

  categoryget(){
    this.dataservice.getcategeorydata().subscribe(data=>{
      this.categoryList=data.resultData;
      console.log(this.categoryList);
    })
  }

  getUser(){
    this.dataservice.getPositionType().subscribe(data => {
    this.datas = data.resultData;
 })
}

  getfeestructure(){
    this.dataservice.getFeeStructure().subscribe(data => {
      this.getfee = data.resultData;
      console.log(this.getfee);
    })
  }

  createfeestructure(){
     var requestObj = {
        "gender" : this.gendername,
        "feeAmount" : this.feeAmount,
        "lastUpdatedBy" : sessionStorage.getItem('userId'),
        "positionTypeId" : this.positionTypeId,
        "categoryId" : this.categoryTypeId,
      }
      this.dataservice.createFeeStructure(requestObj).subscribe(data => {
        this.postfeestructure = data.resultData;
     
        this.getfeestructure();
      })
  }

  editfeestructure(id){
    this.dataservice.getFeeStructureById(id).subscribe(data => {
      this.getfeestructurebyid = data;
        this.dataAccess = this.getfeestructurebyid['resultData']
      console.log(this.getfeestructurebyid);
      this.feeStructureFrom.patchValue({
      'categoryId': this.dataAccess.categoryId,
      'positionTypeId':this.dataAccess.positionTypeId,
      'gender':this.dataAccess.gender,
      'feeAmount':this.dataAccess.feeAmount
      })
    })
  }

  updateFeeStructureById(updateFeeStructure){
    debugger;
    updateFeeStructure['id'] = this.dataAccess.id;
    updateFeeStructure['lastUpdatedBy'] = sessionStorage.getItem('userId');
    this.dataservice.updateFeeStructureById(updateFeeStructure).subscribe(data => {
      this.updateFeeStructureData = data;
      this.getfeestructure();
      console.log(this.updateFeeStructureData)
    })
  }

  feeSturctureStatus(data){
    let deleteobj={};
    deleteobj['id']=data.id;
    deleteobj['lastUpdatedBy']=sessionStorage.getItem('userId');
    if (data.feeStatus === "Active") {
      status = "Inactive"
    } else {
      status = "Active";
    }
    deleteobj['feeStatus'] = status;
    this.dataservice.stautsFeeStructure(deleteobj).subscribe(data => {
      this.statusData=data;
        if(this.statusData.errorCode=='OK')
        {
          this.getfeestructure();
        }
      
    })
    }
    addEmployeementType(position) {
      position.reset();
    }


}

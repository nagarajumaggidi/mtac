import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {AuthService } from '../../services/auth.service'
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, EmailValidator, FormArray, AbstractControl } from '@angular/forms';
import { DataService } from '../../services/data.service';
@Component({
  selector: 'app-positions',
  templateUrl: './positions.component.html',
  styleUrls: ['./positions.component.scss']
})
export class PositionsComponent implements OnInit {

  positionlist: any;
  positionsFrom:FormGroup;
  positionlist1: any;
  positionCodes: any;
  updateposition: any;
  positionTypeName: any
  positionType: any
  advtNumber: any
  eligibilityCriteria: any
  regStartDate: any
  regEndDate: any
  positionsCreate: any;
  datas:any;
  countryValue: any
  getDetailsById: any;
  positionsById: any;
  constructor( private http:HttpClient,private auth: AuthService, private dataservice: DataService,private fb:FormBuilder) { }

  ngOnInit() {
    this.getposition();
    this.getUser();
    this.positionsFrom=this.fb.group({
      'positionName':[null,Validators.required],
      'positionTypeId':[null,Validators.required],
      'advtNumber':[null,Validators.required],
      'eligibilityCriteria':[null,Validators.required],
      'regStartDate':[null,Validators.required],
      'regEndDate':[null,Validators.required],
      'positionCode': [null, Validators.required]
      })
      
  }
 
  getSelectedValueId(args){
    this.countryValue = args.target.value;  
    console.log(this.countryValue);
  }
  getUser(){
    this.dataservice.getPositionType().subscribe(data => {
    this.datas = data.resultData;
 })
}
  
  getposition(){
      this.dataservice.getpositions().subscribe(data => {
      this.positionlist = data.resultData;
      console.log(this.positionlist);
   })
  }
  createPositions(){
    var requestObj = {
      "positionName": this.positionTypeName,
      "positionTypeId":this.countryValue,
      "advtNumber":this.advtNumber,
      "eligibilityCriteria":this.eligibilityCriteria,
      "regStartDate":this.regStartDate,
      "regEndDate":this.regEndDate,
      "positionCode":this.positionCodes,
      "lastUpdatedBy": sessionStorage.getItem('userId'),
      
    }
    console.log(requestObj);
    this.dataservice.createPositions(requestObj).subscribe(data => {
      this.positionsCreate = data;
      this.getposition();
      console.log(this.positionsCreate);
    })
  }
  editPositions(id){
    this.dataservice.getPositionsById(id).subscribe(data => {
      this.getDetailsById = data.resultData;

      console.log(this.getDetailsById);
      this.positionsFrom.patchValue({
      "positionName": this.getDetailsById.positionName,
      "positionTypeId":this.getDetailsById.positionTypeId,
      "advtNumber":this.getDetailsById.advtNumber,
      "eligibilityCriteria":this.getDetailsById.eligibilityCriteria,
      "regStartDate":this.getDetailsById.regStartDate,
      "regEndDate":this.getDetailsById.regEndDate,
      "positionCode": this.getDetailsById.positionCode
      })
    })
  }

  updatePositions(updatePositionById){
    updatePositionById['id'] = this.getDetailsById.id;
    updatePositionById['lastUpdatedBy'] = sessionStorage.getItem('userId');
    this.dataservice.updatePositionsById(updatePositionById).subscribe(data => {
      this.positionsById = data;
      this.getposition();
      console.log(this.positionsById);
    })
  }

  statusPositions(formdata) {
    let deleteobj={};
    deleteobj['id']=formdata.id;
    deleteobj['lastUpdatedBy']=sessionStorage.getItem('userId');
    if (formdata.status === "Active") {
      status = "Inactive"
    } else {
      status = "Active";
    }
    deleteobj['status'] = status;
    this.dataservice.actionPositions(deleteobj).subscribe(data => {
      console.log(data);
      this.getposition();
    })
  }
   addEmployeementType(position) {
    position.reset();
   }
 
}


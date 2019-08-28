import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-employementtype',
  templateUrl: './employementtype.component.html',
  styleUrls: ['./employementtype.component.scss']
})
export class EmployementtypeComponent implements OnInit {

  employeeList: any;
  createEmployment: any;
  getemployeeeById: any;
  employmentUpdate: any;
  EmploymentTypeForm:FormGroup;
  employeementType: string;
  anotherobj: any;
  obj1: any;
  obj2: any;
  statusData: any
  myForm: any;


  constructor( private http:HttpClient, private fb:FormBuilder, private dataservice: DataService) { }

  ngOnInit() {
    this.getemployeee()
    this.EmploymentTypeForm=this.fb.group({
      'employmentName':[null,Validators.required],
      })
  }
  getemployeee(){
    this.dataservice.getemployementdata().subscribe(data => {
      this.employeeList = data.resultData;
      console.log(this.employeeList);
  
    })
  }

  createEmployee(employeementType){
    var requestObj = {};
    requestObj['employmentName'] = employeementType;
    requestObj['lastUpdatedBy'] = sessionStorage.getItem('userId');
    this.dataservice.addEmployementType(requestObj).subscribe(data => {
      this.createEmployment = data;
      console.log(this.createEmployment);
      // this.employeementType = '';
      this.getemployeee()

    })
  //  this.myForm.reset()
 
  }
  addEmployeementType(myForm) {
    myForm.reset();
  }
  editEmploymentType(id){
    this.dataservice.getEmploymentById(id).subscribe(data => {
      this.getemployeeeById = data.resultData;
      this.EmploymentTypeForm.setValue({
        'employmentName': this.getemployeeeById.employmentName
      })
    })
  }

  updateEmployeement(updateEmploymentById){
    updateEmploymentById['id'] = this.getemployeeeById.id;
    updateEmploymentById['lastUpdatedBy'] = sessionStorage.getItem('userId');
    this.dataservice.updateEmployementById(updateEmploymentById).subscribe(data => {
      this.employmentUpdate = data;
      this.getemployeee();
      console.log(this.employmentUpdate);
    })
  }
 
  statusEmployement(data) {
        let positionobj= {};
        positionobj['id'] = data.id;
        positionobj['lastUpdatedBy'] = sessionStorage.getItem('userId');
        if(data.status === "Active"){
        status = "Inactive"
        }else{
        status = "Active";
        }
        positionobj['status'] = status;
        this.dataservice.EmployementStatus(positionobj).subscribe(data => {
        this.statusData=data;
        this.getemployeee();
        });
        }
}


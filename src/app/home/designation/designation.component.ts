import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrls: ['./designation.component.scss']
})
export class DesignationComponent implements OnInit {

  
  designationList: any;
  specialEventForm:FormGroup;
  createdesignation:FormGroup;
  designationlist1: any;

  constructor( private http:HttpClient, private dataservice: DataService,private fb:FormBuilder) { }

  ngOnInit() {


    this.designationget();

    this.specialEventForm=this.fb.group({
      'designationname':[null,Validators.required],
      'id':[null,Validators.required],
      })

      this.createdesignation=this.fb.group({
        'designationnames':[null,Validators.required],
       })
        
  }

designationget(){
  this.dataservice.getdesignationdata().subscribe(data =>{
    this.designationList=data.resultData;
    console.log(this.designationList);
  })
}


editSpecialevent(emp){
  console.log(emp);
  this.specialEventForm.setValue({
    'designationname': emp.designationName,
    'id': emp.id
  });
}


updateEvent(emp){
  let updateobj={};
  updateobj['id'] = emp.id;
  updateobj['designationName'] = emp.designationname;
  updateobj['lastUpdatedBy'] = sessionStorage.getItem('userId');
  console.log(updateobj);
  this.dataservice.upddatedesignation(updateobj).subscribe(data =>{
  
   this.designationget();
  })
}

create(formdata)
{
  let createdby={};
  createdby['designationName'] = formdata.designationnames;
  createdby['lastUpdatedBy'] = sessionStorage.getItem('userId');
  this.dataservice.createdesignationdata(createdby).subscribe(data => {
    this.designationget();
  })
}

deletedesignation(formdata) {
  let deleteobj={};
  deleteobj['id']=formdata.id;
  deleteobj['lastUpdatedBy']=sessionStorage.getItem('userId');
  if (formdata.status === "Active") {
    status = "Inactive"
  } else {
    status = "Active";
  }
  deleteobj['status'] = status;
  this.dataservice.deletedesignation(deleteobj).subscribe(data => {
    this.designationget();
  })
}
addEmployeementType(createdesignation) {
  createdesignation.reset();
}

}

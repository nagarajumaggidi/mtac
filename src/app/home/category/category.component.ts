import { Component, OnInit } from '@angular/core';
import { createNgModuleFactory } from '@angular/core/src/view';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  categoryList: any;
  specialEventForm: FormGroup;
  createcategory:FormGroup;
  categeorylist: any;
  categoryid:any;
  formdata: any;
  categoryname: string;

  constructor(private http:HttpClient,  private dataservice: DataService,private fb:FormBuilder) { }

  ngOnInit() {

    this.categoryget()

    this.specialEventForm=this.fb.group({
      'eventName':[null,Validators.required],
      'id':[null,Validators.required]
      })

    this.createcategory=this.fb.group({
        'categoryname':[null,Validators.required]
    })


  }


categoryget(){
  this.dataservice.getcategeorydata().subscribe(data=>{
    this.categoryList=data.resultData;
    console.log(this.categoryList);
  })
}

getcategeory(emp){
   
   let requestobj={};
   requestobj['id']=emp.id;
   requestobj['categoryName']=emp.categoryName;
   
   this.specialEventForm.setValue({
    'eventName':emp.categoryName,
      'id':emp.id
    })
   
  
}

updateEvent(updatedata)
{
   let anotherobj={};
   anotherobj['id']=updatedata.id;
   anotherobj['categoryName']=updatedata.eventName;
   anotherobj['lastUpdatedBy']=sessionStorage.getItem('userId');
   this.dataservice.categoryupdate(anotherobj).subscribe(res => {
       this.categoryget();
   });
}

deleteSpecialEvent(formdata) {

  let deleteobj={};
  deleteobj['id']=formdata.id;
  deleteobj['lastUpdatedBy']=sessionStorage.getItem('userId');
  deleteobj['status'] = "Inactive";
  if (formdata.status === "Active") {
    status = "Inactive"
  } else {
    status = "Active";
  }
  deleteobj['status'] = status;
  this.dataservice.deletcategory(deleteobj).subscribe(data => {
    this.categoryget();
  })
}



saveEvent(formdata)
{
  let senddata={};
  senddata['categoryName']=formdata.categoryname;
  senddata['lastUpdatedBy']=sessionStorage.getItem('userId');
  this.dataservice.createcategory(senddata).subscribe(res => {
    // this.categoryname="";
  this.categoryget()
  });

}
addEmployeementType(createcategory) {
  createcategory.reset();
}


}

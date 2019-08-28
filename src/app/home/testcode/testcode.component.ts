import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import {FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-testcode',
  templateUrl: './testcode.component.html',
  styleUrls: ['./testcode.component.scss']
})
export class TestcodeComponent implements OnInit {
  testCodeData: any;
  testCodeForm:FormGroup;

  constructor(private dataservice:DataService,private fb:FormBuilder) {
    this. getAllTestCodeDetails();
   }
  creattestDetails(formData:any){
    $(document).ready(function () {
      $('#myModal').modal('hide');
      });

    this.dataservice.createTestDetails(formData).subscribe(data=>{
      this. getAllTestCodeDetails();
      
    })

    formData.reset();
  }
  getAllTestCodeDetails(){
 this.dataservice.getAllTestCodeDetails().subscribe(response=>{
   this.testCodeData=response.resultData;
 
 })
  }
  updateTestCode(testName,testCode,description,id,defaultTest){
    var obj={testCode:testCode,description:description,testName:testName,id:id,defalut:defaultTest};
    this.dataservice.updateTestCodeDetails(obj).subscribe(data=>{
      this. getAllTestCodeDetails();
      $('#StudentModal').modal('hide');
    })
  }


  ngOnInit() {
    this.testCodeForm=this.fb.group({
      'testName':[null,Validators.required],
      'testCode':[null,Validators.required],
      'description':[null,Validators.required],
       'defalut':[null,Validators.required]
      })
  }

}

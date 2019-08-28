import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import {FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms';
declare var $: any;

@Component({
  selector: 'app-ethenicgroup',
  templateUrl: './ethenicgroup.component.html',
  styleUrls: ['./ethenicgroup.component.scss']
})
export class EthenicgroupComponent implements OnInit {
  ethenicData:any=[];
  ethenicForm:FormGroup;
  constructor(private dataService:DataService,private fb:FormBuilder) { 
    this.getAllEthenic()
  }
 
  createEthenic(formData:any){
    $('#myModal').modal('hide');
    this.dataService.setEthenic(formData).subscribe(data=>{
      this.getAllEthenic();
    })
  }
  getAllEthenic(){
    this.dataService.getEthenic().subscribe(data=>{
      this.ethenicData=data.resultData;
      console.log("Ethnic Data", this.ethenicData);
    })
  }
  updateEthenicData(item){
    delete item ['isEditable2'];
    this.dataService.updateEthenicData(item).subscribe(data=>{
     
    })
  }
  ngOnInit() {
    this.ethenicForm=this.fb.group({
      'ethnicType':[null,Validators.required],
      'ethnicName':[null,Validators.required],
      })
  }
}

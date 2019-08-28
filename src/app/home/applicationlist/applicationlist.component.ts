import { Component, OnInit, ComponentFactoryResolver } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-applicationlist',
  templateUrl: './applicationlist.component.html',
  styleUrls: ['./applicationlist.component.scss']
})
export class ApplicationlistComponent implements OnInit {
  productForm : FormGroup;
  designationList: any;
  empForm: FormGroup;
  applicationlist:any= [];
  statusData: any;
  spread: any;
  excelIO: any;
  searchapplication: any;
  applicationlists:any;
  empform: any;
  positionlist:[];

  constructor(private fb: FormBuilder,private router: Router,private dataservice:DataService) {}

  ngOnInit() {
    
    this.getapplicationdata();
    this.getposition();
    this.empform=this.fb.group({
      'positions':['',Validators.required],
      'registerdate':['',Validators.required]
    })
    this.createExcel();
  
  }
  
  getapplicationdata(){
    
    this.dataservice.getapplication().subscribe(data=>{
     
    this.applicationlist=data.resultData.demographicInfo;
    console.log('hello',this.applicationlist);
    })
  }

  getposition(){
    this.dataservice.getpositions().subscribe(data => {
    this.positionlist = data.resultData;
    console.log(this.positionlist);
   })
  }
 
  showData(requestobj){
  console.log(requestobj);
   this.dataservice.searchapplication(requestobj.registerdate,requestobj.positions).subscribe(data=>{
    this.applicationlist=data.resultData.demographicInfo;
    console.log(this.applicationlist);
   })
   }

   createExcel(){
     this.dataservice.excelDownload().subscribe( res => {
       console.log(res);
     })
   }

}

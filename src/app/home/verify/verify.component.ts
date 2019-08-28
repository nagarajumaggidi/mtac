import { FormBuilder } from '@angular/forms';
import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Router, ActivatedRoute } from "@angular/router";
import { ThrowStmt } from '@angular/compiler';


@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  b: string;
  d: string;
  DemoArr: any;
  DemographicArr: any = [];
  resobj:any;
  resObj:any;
  refernce:any;
  qualification: any;
  experience:any;
  achivements: any;
  certificates:any;
  certificatesdata:any=[];
  photoimage:any;
  signatureimage: any;
  id:any;
  idVerify:any
  //router: any;

  constructor(private dataservice: DataService, private fb: FormBuilder, private sanitizer: DomSanitizer, private router: Router,private route:ActivatedRoute) { }
  
  // myform: FormGroup;

  ngOnInit() {

    this.idVerify = this.route.snapshot.queryParamMap.get("idApp");
    console.log(this.idVerify);
    this.getDemographicDetails();

    this.employeedata();
    this.printPreviewPdf();

    
  }


  getDemographicDetails() {
    debugger;
    console.log(this.idVerify);
    this.dataservice.getDemographic(this.idVerify).subscribe(data => {
    debugger;
      console.log(data);

      this.resobj = data['resultData'];
      
      this.DemoArr = this.DemographicArr.push(this.resobj)

      console.log('DemographicArr:', this.resobj);

      this.b = 'data:image/jpeg;base64,' + this.resobj.aadharImage;

      this.d = 'data:image/jpeg;base64,' + this.resobj.exServiceImage;

    })
    

  }


  employeedata()
  {

    this.dataservice.getemployeedata(this.idVerify).subscribe(res=>
    {

      console.log(res);
      this.resObj = res['resultData'];
     
      this.refernce=res['resultData'].references;
      this.qualification = res['resultData'].qualificationsArrayMapper.educationalQualificationsMapper;
      this.experience=res['resultData'].experiencedetails;
      this.achivements=res['resultData'].achievements;
      this.certificates=res['resultData'].certificates;
      this.photoimage=res['resultData'].photoImage;
      this.signatureimage=res['resultData'].signatureImage
    })

  
  }

  printPreviewPdf(){
    debugger;
    this.dataservice.previewPdf(this.idVerify).subscribe(res => {
      console.log(res);
    })
  }

  gotoHeroes() {
    this.router.navigate(['/dashboard']);
  }

  getdemographic()
  {
    this.router.navigate(['/empinfo']);
  }
   

  transform() 
  {
    var c = this.sanitizer.bypassSecurityTrustResourceUrl(this.b);
    return c;
  }

  exserviceimg()
  {
    var e = this.sanitizer.bypassSecurityTrustResourceUrl(this.d);
    return e;
  }

}

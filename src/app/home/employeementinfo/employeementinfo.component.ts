import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray } from '@angular/forms';
import { DataService } from './../../services/data.service';
// import { FormatInputPathObject } from 'path';
import { DomSanitizer } from '@angular/platform-browser';
import { StaticSymbolCache } from '@angular/compiler';
import { throwError } from 'rxjs';



@Component({
  selector: 'app-employeementinfo',
  templateUrl: './employeementinfo.component.html',
  styleUrls: ['./employeementinfo.component.scss']
})
export class EmployeementinfoComponent implements OnInit {

  public reference = [];
  public educationalqualification = [];
  designationList: any;
  base64textString: any;
  base64secondimage: string;
  Category: any;
  employeementlist: any;
  base64thirdimage: string;
  applicationid: any;
  applicationNo: any;
  id: any;
  filedata = [];
  resobj: any;
  referencedata:any;
  arr:any;
  educationalimage: any;
  ImageData:any;
  anotherImageData:any;
  imgSignatureImage: any;
  signImg: any;
  imagedatas:any;
  image:any;
 


  constructor(private fb: FormBuilder, private dataservice: DataService, private router: Router, private route: ActivatedRoute,private sanitizer: DomSanitizer) { this.showSelected = false; }
  myform: FormGroup;


  ngOnInit() {

    this.myform = this.fb.group({

      presentEmployment: ["", [Validators.required]],
      NameofEmp: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      Employment: ["", [Validators.required,]],
      PayandGrade: ["", [Validators.required]],
      DateOfIncrement: ["", [Validators.required,]],
      presentEmployer: ["", [Validators.required,]],
      BasicPay: ["", [Validators.required,]],
      NoticePeriod: ["", [Validators.required,]],
      disqualified: ["", [Validators.required,]],
      dismissed: ["", [Validators.required,]],
      Criminalcase: ["", [Validators.required,]],
      chargesheet: ["", [Validators.required,]],
      chargesheeted: ["", [Validators.required,]],
      convicted: ["", [Validators.required,]],
      convicteddetails: ["", [Validators.required,]],

      reference: this.fb.array([this.createData()]),
      qualification: this.fb.array([this.qualification()]),
      experiencedetails: this.fb.array([this.addTotalExperience()]),
      achievements: this.fb.array([this.addPrizes()]),
      certificates: this.fb.array([this.addcertificate()]),
      AdditionalInformation: ["", [Validators.required,]],
      place: ["", [Validators.required,]],
      date: ["", [Validators.required,]]

    });


    this.designationget();

    this.getcategorydetails();

    this.employeeget();

    this.appicationid();

    this.id = this.route.snapshot.queryParamMap.get('idApp');
    console.log(this.id);

    // this.id = localStorage.getItem('applicationid');

    this.employeedata();


  }

  getcategorydetails() {
    this.dataservice.getcategeorydata().subscribe(data => {
      this.Category = data.resultData;
    })
  }

  // addReferenceFormGroup(): FormGroup {
  //   return this.fb.group({
  //     referenceName: ['', Validators.required],
  //     occupation: ['', Validators.required],
  //     Address: ['', Validators.required],
  //     Email: ["", [Validators.required,]]
  //   });
  // }

  qualification(): FormGroup {
    return this.fb.group({
      qualification: ["", [Validators.required]],
      subjects: ["", [Validators.required]],
      board: ["", [Validators.required]],
      yearPassing: ["", [Validators.required]],
      classOfDivision: ["", [Validators.required]],
      maxMarks: ["", [Validators.required]],
      obtinedMarks: ["", [Validators.required]],
      percentage: ["", [Validators.required]],
      distinction: ["", [Validators.required]],
      certificate:[""]
    });
  }

  // addSkillButtonClick():void {
  //   (<FormArray>this.myform.get('reference')).push(this.addReferenceFormGroup());
  // }

  addqualification(): void {

    (<FormArray>this.myform.get('qualification')).push(this.qualification());
  }


  createData(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', Validators.required]
    })
  }


  /* total experience start */


  addmoretotal()
  {
    (<FormArray>this.myform.get('experiencedetails')).push(this.addTotalExperience());
  }


  addTotalExperience(): FormGroup {
    return this.fb.group({
      nameOfEmployer: ["", [Validators.required]],
      designation: ["", [Validators.required]],
      employmentType: ["", [Validators.required]],
      pay: ["", [Validators.required]],
      numberOfYears: ["", [Validators.required]],
    });
  }

  removetotalexperience(add) {
    (<FormArray>this.myform.get('experiencedetails')).removeAt(add);
  }



  /* total experience end */


  /* prize start */


  addmoreprizes() {
    (<FormArray>this.myform.get('achievements')).push(this.addPrizes());
  }


  addPrizes(): FormGroup {
    return this.fb.group({
      achievementDetails: ["", [Validators.required]]
    });
  }

  removeprize(add) {
    (<FormArray>this.myform.get('achievements')).removeAt(add);
  }


  /* prize end */

  /* certificate start */

  addmorecertificate() {
    (<FormArray>this.myform.get('certificates')).push(this.addcertificate());
  }


  addcertificate(): FormGroup {

    return this.fb.group({

      certificateName: ["", [Validators.required]],
      certificateImage: [""]
      // this.base64textString
    });
  }

  removecertificate(add) {
    (<FormArray>this.myform.get('certificates')).removeAt(add);
  }


  /* certificate end */


  remove(add) {
    (<FormArray>this.myform.get('reference')).removeAt(add);
  }


  removequalification(add) {
    (<FormArray>this.myform.get('qualification')).removeAt(add);
  }



  ////////////////////////////////////////////

  //  get Exams(){
  //   return this.productForm.get('exam_points') as FormArray;
  // }
  // addMoreExam(){
  //   this.Exams.push(this.fb.group({point:''}));
  // }

  // //////////////////////////////////////////////////

  // get Reference(){
  //   return this.productForm.get('ref_points') as FormArray;
  // }
  // // addReference(){
  // //   this.Reference.push(this.fb.group({points:''}));
  // // }



  ////////////////////////////////////////////


  isvalid: boolean = true;
  changevalue(valid) {
    this.isvalid = valid;
  }

  ////////////////////////////////////////////  

  set: boolean = true;
  setradio(valid) {
    this.set = valid;
  }

  ////////////////////////////////////////////

  value: boolean = true;
  setvalue(valid) {
    this.value = valid;
  }

  ////////////////////////////////////////////

  public imagePath_sign;
  imgURL_sign: any;
  public message_sign: string;

  sign_method(event) {

    var sign = event.target.files;
    var file = sign[0];

    if (sign && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoadeders.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoadeders(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64thirdimage = btoa(binaryString);
  }



  ////////////////////////////////////////////

  public imagePath_image;
  imgURL_image: any;
  public message_image: string;


  image_method(event) {

    var img = event.target.files;
    var file = img[0];

    if (img && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoadeds.bind(this);
      reader.readAsBinaryString(file);
    }
  }

  _handleReaderLoadeds(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64secondimage = btoa(binaryString);
  }

  //////////////////////////////////////////////////// 

  // designation

  designationget() {
    this.dataservice.getdesignationdata().subscribe(data => {
      this.designationList = data.resultData;
      console.log(this.designationList);
    })
  }


  employeeget() {
    this.dataservice.getemployementdata().subscribe(data => {
      this.employeementlist = data.resultData;
      console.log(this.employeementlist);
    })
  }



  submit() {



    // this.reference.push({
    //    reference:this.myform.get('reference').value,
    //     address:this.myform.get('Address').value,
    //     email:this.myform.get('Email').value
    // });

    // this.educationalqualification.push({

    //     qualification: this.myform.get('qualifications').value,
    //     subjects:this.myform.get('group').value,
    //     board:this.myform.get('University').value,
    //     yearPassing:this.myform.get('YearofPassing').value,
    //     classOfDivision: this.myform.get('division').value,
    //     maxMarks:this.myform.get('cgpa').value,
    //     obtinedMarks: this.myform.get('cgpaobtained').value,
    //     percentage:this.myform.get('percentage').value,
    //     distinction:this.myform.get('distinction').value,
    //     certificate:this.base64textString

    // });


    if(this.myform.get('certificates').value && this.myform.get('certificates').value.length)
    {
    this.myform.get('certificates').value.forEach((element, i=0) => {
      this.filedata.forEach((file ,j=0)=> {
        if(i==j){
          element.certificateImage = file;
        }
      });
     });
    }

    if(this.myform.get('qualification').value && this.myform.get('qualification').value.length)
    {
    this.myform.get('qualification').value.forEach((element, i=0) => {
      this.filedata.forEach((file ,j=0)=> {
        if(i==j){
          element.certificate = file;
        }
      });
     });
    }


     let requestobj = {};
     requestobj['userId'] = sessionStorage.getItem('userId');
     requestobj['applicationNo'] = this.id;
     requestobj['presentEmployment'] = this.myform.get('presentEmployment').value;
     requestobj['nameOfEmployer'] = this.myform.get('NameofEmp').value,
     requestobj['designationTypeId'] = this.myform.get('designation').value,
     requestobj['employmentTypeId'] = this.myform.get('Employment').value,
     requestobj['pay'] = this.myform.get('PayandGrade').value,
     requestobj['dateOfNextIncrement'] = this.myform.get('DateOfIncrement').value,
     requestobj['permissionFromPresentEmployer'] = this.myform.get('presentEmployer').value,
     requestobj['basicPayAcceptable'] = this.myform.get('BasicPay').value,
     requestobj['noticePeriod'] = this.myform.get('NoticePeriod').value,
     requestobj['disqualifiedInExam'] = this.myform.get('disqualified').value,
     requestobj['dismissed'] = this.myform.get('dismissed').value,
     requestobj['criminalCaseRegistered'] = this.myform.get('Criminalcase').value,
     requestobj['chargeSheeted'] = this.myform.get('chargesheet').value,
     requestobj['chargeSheetDetails'] = this.myform.get('chargesheeted').value,
     requestobj['convictedByCourt'] = this.myform.get('convicted').value,
     requestobj['convictedByCourtDetails'] = this.myform.get('convicteddetails').value,
     requestobj['additionalInfo'] = this.myform.get('AdditionalInformation').value;
     requestobj['photoImage'] = this.base64secondimage;
     requestobj['signatureImage'] = this.base64thirdimage;
     requestobj['references'] = this.myform.get('reference').value,
     requestobj['qualificationsArrayMapper'] = { educationalQualificationsMapper: this.myform.get('qualification').value };
     requestobj['experiencedetails'] = this.myform.get('experiencedetails').value,
     requestobj['achievements'] = this.myform.get('achievements').value,
     requestobj['certificates'] = this.myform.get('certificates').value; 
     requestobj['city'] = this.myform.get('place').value;
     requestobj['date'] = this.myform.get('date').value;


    // requestobj['userId'] = sessionStorage.getItem('userId');
    // requestobj['qualification'] = this.myform.get('qualification').value;
    // requestobj['totalExperience'] = this.myform.get('totalexperience').value;
    // requestobj['prizesAndMedals'] = this.myform.get('prize').value;
    // requestobj['certificate'] = this.myform.get('certificates').value; 
    // requestobj['place'] = this.myform.get('place').value;
    // requestobj['date'] = this.myform.get('date').value;
    // requestobj['image']=this.myform.get('imageInput').value;


    console.log(requestobj);
    console.log(this.id);
    this.dataservice.employeeinfo(requestobj).subscribe(res => {
        alert("Registered successfully");
        this.router.navigate(['/verify'],{queryParams : { idApp: this.id }});
    });


  }



  /*get employee data start */

 


  setExperiencedetails(skillSets):FormArray
  {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        nameOfEmployer:s.nameOfEmployer,
        designation:s.designation,
        employmentType:s.employmentType,
        pay:s.pay,
        numberOfYears:s.numberOfYears
      }));
    });
    return formArray;
  }

  setAchievenments(skillSets):FormArray
  {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        achievementDetails:s.achievementDetails,
      }));
    });
    return formArray;
  }

  setCertificates(skillSets):FormArray
  {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        certificateName:s.certificateName,
      }));
    });
    return formArray;
  }



  setExistingSkills(skillSets): FormArray 
  {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        name:s.name,
        position:s.position,
        address:s.address,
        email:s.email
      }));
    });
    return formArray;
  }







  setqualification(skillSets): FormArray 
  {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      // this.educationalimage='data:image/jpeg;base64,' + s.certificate;
      this.educationalimage= s.certificate;
      console.log(this.educationalimage);
      formArray.push(this.fb.group({
        qualification:s.qualification,
        subjects:s.subjects,
        board:s.board,
        yearPassing:s.yearPassing,
        classOfDivision:s.classOfDivision,
        maxMarks:s.maxMarks,
        obtinedMarks:s.obtinedMarks,
        percentage:s.percentage,
        distinction:s.distinction,
        certificate:s.certificate
       }));
      
       this.imagedatas = this.sanitizer.bypassSecurityTrustResourceUrl(s.certificate);
    });
    console.log(formArray.value)
    return formArray;
  }


  employeedata()
  {


    this.dataservice.getemployeedata(this.id).subscribe(res=>
    {
      this.resobj = res['resultData'];
      // this.referencedata=this.resobj.references

  
      this.educationalimage=this.resobj.photoImage;
      this.imgSignatureImage = this.resobj.signatureImage;

      this.ImageData = this.sanitizer.bypassSecurityTrustResourceUrl(this.educationalimage);
      // this.anotherImageData= this.ImageData.changingThisBreaksApplicationSecurity;

      this.signImg = this.sanitizer.bypassSecurityTrustResourceUrl(this.imgSignatureImage);
    
      console.log(this.ImageData);

      this.myform.patchValue({

        'presentEmployment': this.resobj.presentEmployment,
        'NameofEmp': this.resobj.nameOfEmployer,
        'designation': this.resobj.designationTypeId,
        'Employment':this.resobj.employmentTypeId,
        'PayandGrade': this.resobj.pay,
        'DateOfIncrement': this.resobj.dateOfNextIncrement,
        'presentEmployer':this.resobj.permissionFromPresentEmployer,
        'BasicPay': this.resobj.basicPayAcceptable,
        'NoticePeriod': this.resobj.noticePeriod,
        'disqualified': this.resobj.disqualifiedInExam,
        'dismissed':this.resobj.dismissed,
        'Criminalcase': this.resobj.criminalCaseRegistered,
        'chargesheet':this.resobj.chargeSheeted,
        'chargesheeted':this.resobj.chargeSheetDetails,
        'convicted': this.resobj.convictedByCourt,
        'convicteddetails': this.resobj.convictedByCourtDetails,
        'AdditionalInformation': this.resobj.additionalInfo,
        'place': this.resobj.city,
        'date':this.resobj.date

      });

      

      this.myform.setControl('reference', this.setExistingSkills(this.resobj.references));
      this.myform.setControl('qualification',this.setqualification(this.resobj.qualificationsArrayMapper.educationalQualificationsMapper));
      this.myform.setControl('experiencedetails', this.setExperiencedetails(this.resobj.experiencedetails));
      this.myform.setControl('achievements', this.setAchievenments(this.resobj.achievements));
      this.myform.setControl('certificates', this.setCertificates(this.resobj.certificates));

    })

  
  }
   

  transform() 
  {
  
    var c = this.sanitizer.bypassSecurityTrustResourceUrl(this.educationalimage);
    return c;
  }

  /* get employee data end */



  showSelected: boolean;


  appicationid() {

    let requestobj = {};
    requestobj['positionId'] = localStorage.getItem('positionId');
    requestobj['userId'] = sessionStorage.getItem('userId');
    this.dataservice.getuserlistByIds(requestobj).subscribe(res => {
      this.applicationNo = res.resultData;
      console.log(res);
    });
  }



  ToggleButton() {
    this.showSelected = !this.showSelected;
  }

  addmore(): void {
    (<FormArray>this.myform.get('reference')).push(this.createData());
  }


  handleFileSelect(i, evt, index) {
 
    var files = evt.target.files;
    var file = files[0];
  
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  _handleReaderLoaded(readerEvt) 
  {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    //this.filedata.push({i:this.base64textString});
    this.filedata.push(this.base64textString);
    console.log(this.filedata);
  }




  // let file = $event.target.files[0]; // <--- File Object for future use.
  // this.myform.controls['imageInput'].setValue(file ? file.name : ''); // <-- Set Value for Validation


}



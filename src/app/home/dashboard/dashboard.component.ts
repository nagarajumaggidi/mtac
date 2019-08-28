import { DataService } from './../../services/data.service';
import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import swal from 'sweetalert';
import { FormGroup, FormControl, Validators, ValidatorFn, FormBuilder, EmailValidator, FormArray, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  role: string;
  myform: FormGroup;
  Category: any;
  states: any;
  stateValue: boolean
  gender: any[] = ['male', 'female', 'transgender'];

  martial: any[] =
  [
      { matrial: 'married', send: 'true' },
      { matrial: 'unmarried', send: 'false' }
  ];

  selectedLink: string;

  presAddr: string;
  permAddr: string;
  fileName = '';
  valuecheck: boolean = false;
  services: boolean = false;

  public address = [];
  present: any = "present addresss";
  permenent: any = "permenent addresss";
  requestobj: string | Blob;
  base64textString: String = "";
  base64textStrings: String = "";
  abc: string;
  baseString: String;
  base64Image: string;
  b: any;
  d: string;
  maritial: any;
  maritialValue: boolean;
  applicationNo: any;
  applicationid: any;
  get_id: any;
  getposition: any;
  getuserName: any;
  localuserdata: any;
  getUserListId: any;
  appid:any;
  demographicid:any;
  save:boolean=true;
  update:boolean=false;
  idDashboard: any;
  possitionAppliedFor: any;



  constructor(private DataService: DataService, private fb: FormBuilder, private dataservice: DataService, private sanitizer: DomSanitizer,private router:Router, private route: ActivatedRoute) {

    this.role = sessionStorage.getItem('userRole');
    this.getcategorydetails()
    this.get_id = localStorage.getItem('applyid');
    this.getposition = localStorage.getItem('applno')
    this.getuserName = localStorage.getItem('userName');

  }


  ngOnInit() {

    this.transform();
    this.exserviceimg();
   

    this.myform = this.fb.group({
      

      categoryAsperHaryana: ["", [Validators.required,]],
      fullName: ["", [Validators.required]],
      fatherName: ["", [Validators.required,]],
      motherName: ["", [Validators.required,]],
      domicile: ["", [Validators.required]],
      otherDomicileDetails: ["", [Validators.required,]],

      street: ["", [Validators.required,]],
      addressline: ["", [Validators.required,]],
      city: ["", [Validators.required,]],
      state: ["", [Validators.required,]],
      postal: ["", [Validators.required,]],

      streetper: ["", [Validators.required,]],
      addressper: ["", [Validators.required,]],
      cityper: ["", [Validators.required,]],
      stateper: ["", [Validators.required,]],
      postalper: ["", [Validators.required,]],

      mobileNumber: ["", [Validators.required,]],
      email: ["", [Validators.required,]],
      dob: ["", [Validators.required,]],
      gender: ["", [Validators.required,]],
      age: ["", [Validators.required,]],
      PlaceofBirth: ["", [Validators.required,]],
      AadharNumber: ["", [Validators.required,]],
      uploadaadhar: ["", [Validators.required,]],

      Nationality: ["", [Validators.required,]],
      MartialStatus: ["", [Validators.required,]],
      moreLivingSpouses: ["", [Validators.required,]],
      category: ["", [Validators.required,]],
      Exservices: ["", [Validators.required,]],
      exService: ["", [Validators.required,]]
      
    });

    

     //this.firstcodelength = this.DataService.testcodes.resultData['testCodes'];
     this.localuserdata = JSON.parse(localStorage.getItem('userinformation'))
     console.log(this.localuserdata)
    
    this.idBasedApiCall();

    this.idDashboard = this.route.snapshot.queryParamMap.get("idApp");
       
    if(this.idDashboard){
      this.appid = this.idDashboard
        this.getDemographicDetails();
       }

  }


  idBasedApiCall(){
    debugger;
    // requestobj['positionId'] = localStorage.getItem('applyid');
    // requestobj['userId'] = sessionStorage.getItem('userId');
    if(localStorage.getItem('positionId') != null && sessionStorage.getItem('userId') != null){
      this.appicationid();
    }
    if(localStorage.getItem('positionId') == null && sessionStorage.getItem('userId') != null){
      this.UserListById();
    }
  }

  getcategorydetails() {
    this.dataservice.getcategeorydata().subscribe(data => {
      this.Category = data.resultData;
      console.log(this.Category)
    })

  }


  setNav(args) {
    this.maritial = args.target.value;

    if (this.maritial == "married") {
      this.maritialValue = true;
    }
    if (this.maritial == "unmarried") {
      this.maritialValue = false;
    }
  }

  ///////////////////////////////////////////////

  selectState: any[] =
  [
      { state: 'Haryana', send: false },
      { state: 'Others', send: true }

  ];

  setStates(args) {

    this.states = args.target.value;
  
    if (this.states == "Others") {
      this.stateValue = true;
    }
    if (this.states == "Haryana") {
      this.stateValue = false;
    }
   }



  updateAddr(e) {

    if(e.target.checked){
      this.myform.patchValue({
        'streetper': this.myform.get('street').value,
        'addressper': this.myform.get('addressline').value,
        'cityper': this.myform.get('city').value,
        'stateper': this.myform.get('state').value,
        'postalper': this.myform.get('postal').value
      });  
    }
    if(e.target.checked == false)
    {
      this.myform.patchValue({
        'streetper': [''],
        'addressper': [''],
        'cityper': [''],
        'stateper': [''],
        'postalper':['']
      });  
    }
    
  }


  /////////////get Demographic//////////////////////////////////


  resobj: any;

  getDemographicDetails() {

    console.log();


    this.dataservice.getDemographic(this.idDashboard).subscribe(data => {
      this.save = false;
      this.update = true;
    
      this.resobj = data['resultData'];

      this.b = 'data:image/jpeg;base64,' + this.resobj.aadharImage;

      this.d = 'data:image/jpeg;base64,' + this.resobj.exServiceImage;

      this.myform.patchValue({

        'categoryAsperHaryana': this.resobj.categoryAsperHaryana,
        'fullName': this.resobj.fullName,
        'fatherName': this.resobj.fatherName,
        'motherName': this.resobj.motherName,
        'domicile': this.resobj.domicile,
        'otherDomicileDetails': this.resobj.otherDomicileDetails,

        'street': this.resobj.addresses[0].streetAddress,
        'addressline': this.resobj.addresses[0].addressLine2,
        'city': this.resobj.addresses[0].city,
        'state': this.resobj.addresses[0].state,
        'postal': this.resobj.addresses[0].zipCode,


        'streetper': this.resobj.addresses[1].streetAddress,
        'addressper': this.resobj.addresses[1].addressLine2,
        'cityper': this.resobj.addresses[1].city,
        'stateper': this.resobj.addresses[1].state,
        'postalper': this.resobj.addresses[1].zipCode,

        'mobileNumber': this.resobj.mobileNumber,
        'email': this.resobj.emailId,
        'dob': this.resobj.dob,
        'gender': this.resobj.gender,
        'age': this.resobj.currentAge,
        'PlaceofBirth': this.resobj.placeOfBirth,
        'AadharNumber': this.resobj.aadharNumber,
        'uploadaadhar': this.resobj.b,

        'MartialStatus': this.resobj.maritalStatus,
        'moreLivingSpouses': this.resobj.moreLivingSpouses,
        'Nationality': this.resobj.nationality,
        'category': this.resobj.categoryId,
        'Exservices': this.resobj.exServiceMan,
        'exService': this.resobj.d

      })
      this.possitionAppliedFor = this.resobj.possitionAppliedFor;
      console.log('resObj :',this.resobj)

    })
    
  }


  ////////////////save Demographic/////////////

  saveDemographic() {
    
    this.address.push(
      {
        streetAddress: this.myform.get('street').value,
        addressLine2: this.myform.get('addressline').value,
        city: this.myform.get('city').value,
        state: this.myform.get('state').value,
        zipCode: this.myform.get('postal').value,
        addressType: this.present
      },
      {
        streetAddress: this.myform.get('streetper').value,
        addressLine2: this.myform.get('addressper').value,
        city: this.myform.get('cityper').value,
        state: this.myform.get('stateper').value,
        zipCode: this.myform.get('postalper').value,
        addressType: this.permenent
      },
    );
  
     let requestobj={};
    
      requestobj['categoryAsperHaryana'] = this.myform.get('categoryAsperHaryana').value,
      requestobj['fullName'] = this.myform.get('fullName').value,
      requestobj['fatherName'] = this.myform.get('fatherName').value,
      requestobj['motherName'] = this.myform.get('motherName').value,
      requestobj['domicile'] = this.myform.get('domicile').value,
      requestobj['otherDomicileDetails'] = this.myform.get('otherDomicileDetails').value,


      requestobj['addresses'] = this.address,

      requestobj['mobileNumber'] = this.myform.get('mobileNumber').value,
      requestobj['emailId'] = this.myform.get('email').value,
      requestobj['dob'] = this.myform.get('dob').value,
      requestobj['gender'] = this.myform.get('gender').value,
      requestobj['currentAge'] = this.myform.get('age').value,
      requestobj['placeOfBirth'] = this.myform.get('PlaceofBirth').value,
      requestobj['aadharNumber'] = this.myform.get('AadharNumber').value,
      requestobj['aadharImage'] = this.base64textString;

      requestobj['maritalStatus'] = this.myform.get('MartialStatus').value,
      requestobj['moreLivingSpouses'] = this.myform.get('moreLivingSpouses').value,
      requestobj['nationality'] = this.myform.get('Nationality').value,
      requestobj['categoryId'] = this.myform.get('category').value,
      requestobj['exServiceMan'] = this.myform.get('Exservices').value,
      requestobj['exServiceImage'] = this.base64textStrings;
      requestobj['applicationNo'] = this.appid;
      requestobj['userId'] = sessionStorage.getItem('userId');
      requestobj['possitionId'] = localStorage.getItem('positionId');


     console.log('save demographic req obj:', requestobj);

      this.dataservice.demographicApp(requestobj).subscribe(res => {
      this.router.navigate(['/empinfo'],{queryParams:{idApp:this.appid}});
      this.demographicid=res.resultData;
      console.log(this.demographicid);
      this.save=false;
      this.update=true;
      });


  }


  // update demographic start


  updateDemographic() {
    debugger;
    
    this.address.push(
      {
        streetAddress: this.myform.get('street').value,
        addressLine2: this.myform.get('addressline').value,
        city: this.myform.get('city').value,
        state: this.myform.get('state').value,
        zipCode: this.myform.get('postal').value,
        addressType: this.present
      },
      {
        streetAddress: this.myform.get('streetper').value,
        addressLine2: this.myform.get('addressper').value,
        city: this.myform.get('cityper').value,
        state: this.myform.get('stateper').value,
        zipCode: this.myform.get('postalper').value,
        addressType: this.permenent
      },
    );

    let requestobj = {};

      requestobj['categoryAsperHaryana'] = this.myform.get('categoryAsperHaryana').value,
      requestobj['fullName'] = this.myform.get('fullName').value,
      requestobj['fatherName'] = this.myform.get('fatherName').value,
      requestobj['motherName'] = this.myform.get('motherName').value,
      requestobj['domicile'] = this.myform.get('domicile').value,
      requestobj['otherDomicileDetails'] = this.myform.get('otherDomicileDetails').value,


      requestobj['addresses'] = this.address,

      requestobj['mobileNumber'] = this.myform.get('mobileNumber').value,
      requestobj['emailId'] = this.myform.get('email').value,
      requestobj['dob'] = this.myform.get('dob').value,
      requestobj['gender'] = this.myform.get('gender').value,
      requestobj['currentAge'] = this.myform.get('age').value,
      requestobj['placeOfBirth'] = this.myform.get('PlaceofBirth').value,
      requestobj['aadharNumber'] = this.myform.get('AadharNumber').value,
      requestobj['aadharImage'] = this.base64textString;

      requestobj['maritalStatus'] = this.myform.get('MartialStatus').value,
      requestobj['moreLivingSpouses'] = this.myform.get('moreLivingSpouses').value,
      requestobj['nationality'] = this.myform.get('Nationality').value,
      requestobj['categoryId'] = this.myform.get('category').value,
      requestobj['exServiceMan'] = this.myform.get('Exservices').value,
      requestobj['exServiceImage'] = this.base64textStrings;
      requestobj['applicationNo'] = this.idDashboard;
      requestobj['userId'] = sessionStorage.getItem('userId');
      requestobj['possitionId'] = this.resobj.possitionId;
      requestobj['id']=this.resobj.id;


      console.log('update demographic req obj:====>>>>>>', requestobj);
   
      this.dataservice.updatedemographicApp(requestobj).subscribe(res => {
      this.router.navigate(['/empinfo'],{queryParams:{idApp:this.appid}});
      alert("updated");
      });
      

  }


// update demographic end




  valuechecked(valid) {
    this.valuecheck = valid;
  }

  // exservices(valid)
  // { 
  // this.services=!valid;
  // }


  onFileChanges(event) {
    let exservice = <File>event.target.files[0]; // <--- File Object for future use.
  }


  onFileChange(event) {
    let uploadaadhar = <File>event.target.files[0]; // <--- File Object for future use. 
  }


  handleFileSelect(evt) {

    var files = evt.target.files;
    console.log("this is files"+files)
    var file = files[0];
    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textString = btoa(binaryString);
    }


  appicationid() {
    debugger;
    let requestobj = {};
    requestobj['positionId'] = localStorage.getItem('positionId');
    requestobj['userId'] = sessionStorage.getItem('userId');
    this.dataservice.getuserlistByIds(requestobj).subscribe(res => {
      this.applicationid = res.result;
      this.applicationNo = res.resultData;
      this.possitionAppliedFor = res.resultData.positionName
      console.log(res);
      this.appid= this.applicationNo.applicationNumber;
    });
  }



  exservice(evt) {

    var files = evt.target.files;
    var file = files[0];

    if (files && file) {
      var reader = new FileReader();
      reader.onload = this._handleReaderLoadeds.bind(this);
      reader.readAsBinaryString(file);
    }

  }

  _handleReaderLoadeds(readerEvt) {
    var binaryString = readerEvt.target.result;
    this.base64textStrings = btoa(binaryString);
    console.log(this.base64textStrings);


  }

  transform() {
    var c = this.sanitizer.bypassSecurityTrustResourceUrl(this.b);
      return c;
  }

  exserviceimg() {
    var e = this.sanitizer.bypassSecurityTrustResourceUrl(this.d);
    return e;
  }

  /////////////////ex serviceman radio/////////////////////////////////
  setradio(e: string): void {

    this.selectedLink = e;

  }

  isSelected(name: string): boolean {

    if (!this.selectedLink) {
      return false;
    }

    return (this.selectedLink === name);
  }

  UserListById() {
    const id = sessionStorage.getItem('userId');
    this.dataservice.getUserListById(id).subscribe(res => {

      this.getUserListId = res.resultData;
      // this.appid = res.resultData[0].applicationNo;

      // localStorage.setItem('applicationid',this.appid)
      
      // if(this.applicationid != 'null' && this.getUserListId >0 ){
      //   this.userStatus = true;
      //  }
      // // if(this.getUserListId.length > 1){
      // //   this.userStatus = true;
      // // }else{
      // //   this.userStatus = false;
      // // }

      console.log(this.getUserListId);

      this.getDemographicDetails();

    })
  }





}

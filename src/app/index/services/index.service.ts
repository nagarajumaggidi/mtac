import { Injectable } from '@angular/core';
import { HttpClient,HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import swal from 'sweetalert';





@Injectable({
  providedIn: 'root'
})
export class IndexService {


  host_url="http://192.168.1.137:8088/recruitment/";

  server=this.host_url+'rest/endUsers/validateAgeAndPostCode';
  sends=this.host_url+'rest/endUsers/validateGenderAndEthnicGroup';
  fourth=this.host_url+'rest/ethnicGroups/getAllEthnics';

  
 /*sends='http://192.168.7.144:8080/samplingkit/rest/endUsers/validateGenderAndEthnicGroup';
  fourth='http://192.168.7.144:8080/samplingkit/rest/ethnicGroups/getAllEthnics'; */

  errorData: {};

  age:any;
  some:any;
  pass_data:Array<any>=[];
  user={};
  logindata={};
  persondata={};
  seconddata={};
  thirddata:any=[];
  fourthdata={};
  datas: Object;
  some1: any;
  value:any;
  thirdone: string;
  message1: any;
  addressid: string;
  address:any;
  tests: string;
  testcodes: any;
  persondetails={};
  testerror:boolean=false;
  checkpostal={};
  err:string='internal server error';
  commissioner:boolean;


  /* imtac variable start */



  /* imtac variable end */

 
  constructor(private http:HttpClient,private router:Router) { }

  

  sendone(user)
  {
      console.log(user);
      return this.http.post(this.sends,user).subscribe(res=> {
      //this.testname=res.resultData.testCodes[0].testName
      this.testcodes=res;
      console.log(this.testcodes);
      if(res['message']=="Success")
      {
      this.value=res['resultData'].sponsorId;
      sessionStorage.setItem('sponsorId',this.value);
      this.router.navigate(['test']);
      }
      else
      {
         this.router.navigate(['not']);
      }
      },err =>
      {
        this.router.navigate(['internal']);
      });

  }

  another(data)
  {

      this.thirdone=this.host_url+'rest/endUsers/create/'+sessionStorage.getItem('sponsorId');
      console.log(data);
       // var obj={EthnicGroupId:sessionStorage.getItem('ethenicGroupId')}
      data.ethnicGroupId=sessionStorage.getItem('ethenicGroupId')
      return this.http.post(this.thirdone,data).subscribe(res => {
      this.message1=res['message'];
      sessionStorage.setItem('message',this.message1);
      this.some=res['status'];
      if(this.some=="Success")
      {
        this.router.navigate(['final']);
        localStorage.clear();
        this.getAllComponents(localStorage,"component");

      }
      },err =>
      {
        this.router.navigate(['internal']);
      });
      
  }

  anothers(data)
  {
      return this.http.post(this.thirdone,data).subscribe(res => {
      this.some=res['status'];
      if(this.some=="Success")
      {
        this.router.navigate(['result']);
      }
      },err=>
      {
        this.router.navigate(['internal']);
      });
      
  }

  
  anothers1(data)
  {  
      console.log(data);
      return this.http.post(this.thirdone,data).subscribe(res => {
      this.some=res['status'];}
      );
      
  }


  getethnic():Observable<any>
  {
    return this.http.get(this.fourth);
  }

  getOrderDetails(orderId):Observable<any>
  {
    return this.http.get(this.host_url+'rest/endUsers/endUser/'+orderId);
  }

  getTestResult(code):Observable<any>
  {
    return this.http.get(this.host_url+'rest/testResult/'+code);
  } 


  lookup():Observable<any>
  {
      this.addressid=sessionStorage.getItem('age');
      this.address='https://api.getAddress.io/find/'+this.addressid+'/?api-key=x5CPOTrNhkKPq_1PxN6A_w18921';
      return this.http.get(this.address);
  }

  // Get recuriment list
  getRecrutment():Observable<any>{
    return this.http.get( this.host_url+'rest/positions/activepositions');
    }



   /* get the local storage start */

   getAllComponents(obj,string):void{
    let i=0;
    for(let key in obj){
      if(key.startsWith(string)){
        localStorage.removeItem(key);
      }
     }
   }

 /* get the localstorage end */

 

 /* imtac start */

 register(data):Observable<any>
 {
    return this.http.post(this.host_url+'rest/user/createUser',data);
 }

 
 /* imtac end */



}

import { HttpClient } from '@angular/common/http';
import { IndexService } from './services/index.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import swal from 'sweetalert';
import { DataService } from '../services/data.service';
declare const Captcha: any;
declare const ValidCaptcha: any;


declare var $: any;


@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  loginform: FormGroup;
  registerform: FormGroup;
  loginActionActive = false;
  registerdisabled:boolean=false;
  spin:boolean=false;
  recrutmentData: any;
  createdby: boolean=false;
  emailInput:any;
  res:any;
  roleNagivation: any;
  applicationid: any;
  getUserListId: any;
  Url="http://192.168.1.137:8088/recruitment/rest/user/forgotPassword/"




  constructor(private authService: AuthService, private routerNavigate: Router, private fb: FormBuilder, private index: IndexService,private http:HttpClient, private dataservice: DataService) { }


  LoginAction(formData: any) {
    if (this.authService.loginAction(formData)) {
      this.loginActionActive = true;
      this.loginform.reset();
    }
  }

  navigateToDashboard() {
    if (this.loginActionActive) {
      debugger;
      this.roleNagivation = sessionStorage.getItem('userRole')
      if (this.roleNagivation == 'USER') {
        let requestobj = {};
        requestobj['positionId'] = localStorage.getItem('positionId');
        requestobj['userId'] = sessionStorage.getItem('userId');
        if (localStorage.getItem('positionId') != null && sessionStorage.getItem('userId') != null) {
          this.dataservice.getuserlistByIds(requestobj).subscribe(res => {
            this.applicationid = res;
            if (this.applicationid.errorMessage == "Application already exists") {
              swal("Already applied for this position", "Please Login...!!!!").then((value) => {
                this.routerNavigate.navigate(['login'])
                $("#loginModal").hide();
                localStorage.clear();
                sessionStorage.clear();
              });
            }
            if (this.applicationid.errorMessage == 'Application not exists') {
              this.routerNavigate.navigate(['dashboard']);
            }
          });
        }
        if (localStorage.getItem('positionId') == null && sessionStorage.getItem('userId') != null) {
          const id = sessionStorage.getItem('userId');
          this.dataservice.getUserListById(id).subscribe(res => {

            this.getUserListId = res.resultData;
            this.routerNavigate.navigate(['userList']);
            console.log(this.getUserListId);

          })
        }

      }
      if (this.roleNagivation == 'ADMIN') {
        this.routerNavigate.navigate(['registered']);
      }
    }
  }

  ngOnInit() {
 
    this.loginform = this.fb.group({
      'email': [null, Validators.required],
      'password': [null,  [Validators.required,Validators.pattern("^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$")]],
    })
    this.getRecurimentList();
    

    this.registerform = this.fb.group({
      'candidateName': [null, Validators.required],
      'aadharNumber': [null, Validators.required],
      'email': ["", [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      'mobileNumber': [null, Validators.required],
      'dob': [null, Validators.required],
      'password': [null, Validators.required],
      // 'confirmPassword': [null, Validators.required]
      // }, 
      // { 
      // validator: matchingPasswords('password', 'confirmPassword')
    })
    
    this.authService.logindata.subscribe(data => {
      this.navigateToDashboard();
    });

 

    $(document).ready(function () {

      $('.login').click(function () {
        $("#loginModal").toggle();
      });

      $('.login').click(function () {
        $("#loginModal").show();
        $('#sign').show();
      });

      $('#sign').click(function () {
        $("#loginModal").hide();
        $('#sign').hide();
      });


      $('#signup').click(function () {
        $("#reigsterModal").toggle();
        $('#sign1').show();
      });

      $('#sign1').click(function () {
        $("#reigsterModal").hide();
        $(this).hide();
      });

      $('#openRegModal1').click(function () {
        $("#reigsterModal,#sign1").show();
        $("#loginModal,#sign").hide();
      });

      $('#openRegModal').click(function () {
        $("#reigsterModal,#sign1").hide();
        $("#loginModal,#sign").show();
      });
    });

    this.onClickCaptcha();
  }
  onClickCaptcha() {
    Captcha()
  }
  ValidCaptcha1(){
ValidCaptcha()
}
  


  viewResult() {
    this.routerNavigate.navigate(['viewresults']);
  }

  register(formdata) {

    this.registerdisabled=true;
    this.spin=true;

    let requestobj = {
      'role': 'user'
    }

    requestobj = { ...formdata, ...requestobj };

    return this.index.register(requestobj).subscribe(res => {

      this.registerdisabled=false;
      this.spin=false;
      debugger;
     if (res['statusCode'] == 200) {
        swal("Registered Successfully!", "Thank you", "success");
        $("#reigsterModal").hide();
      }
      else if (res['statusCode'] == 226) {
        swal("Email id and aadhar already exists");
        
      }
     },
      err => {
        if (err.status == 500) {
          swal("Internal server error");
        }
    })

   

  }

  getRecurimentList(){
    this.index.getRecrutment().subscribe(data => {
      this.recrutmentData = data.resultData;
      console.log(this.recrutmentData);
  })

}

onClick(list) {
 
  $("#loginModal").show();
  $('#sign').show();
  const id = localStorage.setItem('positionId', list.id);
  const applno = localStorage.setItem("applno", list.positionName);
  console.log(list);

}

forget()
{
  this.createdby= true;
}


forgotPassword123() {

  alert();
  this.http.get(this.Url+this.emailInput).subscribe((data)=>{
  this.res=data;
  if(this.res.responseMessage == "Password Sent to Your Email."){
  swal(this.res.responseMessage, "","success");
  }
  });
  this.createdby = false;
}


backToLogin()
{
  this.createdby = false;
}

LoginPage() {
    this.routerNavigate.navigate(['loginpageaction']);
}




}

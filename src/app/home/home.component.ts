import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
declare var $: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  role:any;
  username: string;
  appid: any;
  getUserListId:any;
  positionId: any;
  
  constructor(private authService: AuthService, private routerNavigate: Router, private dataservice: DataService) {
    this.role=sessionStorage.getItem('userRole');
    this.username=sessionStorage.getItem('username');
    this.positionId = localStorage.getItem('positionId');
  }

  logoutAction() {

    localStorage.clear();
    sessionStorage.clear();
    
    if (this.authService.logOutAction()) {
      this.routerNavigate.navigate(['login'])
    }
  }

  

  ngOnInit() {

    $(document).ready(function () {
      $(".push_menu").click(function () {
        $(".wrapper").toggleClass("active");
      });


      (function () {
        "use strict";

        var treeviewMenu = $('.app-menu');

        // Toggle Sidebar
        $('[data-toggle="sidebar"]').click(function (event) {
          event.preventDefault();
          $('.app').toggleClass('sidenav-toggled');
        });

        // Activate sidebar treeview toggle
        $("[data-toggle='treeview']").click(function (event) {
          event.preventDefault();
          if (!$(this).parent().hasClass('is-expanded')) {
            treeviewMenu.find("[data-toggle='treeview']").parent().removeClass('is-expanded');
          }
          $(this).parent().toggleClass('is-expanded');
        });

        // Set initial active toggle
        $("[data-toggle='treeview.'].is-expanded").parent().toggleClass('is-expanded');

        //Activate bootstrip tooltips
        $("[data-toggle='tooltip']").tooltip();

      })();

    });

    // this.UserListById();
  }


  // UserListById() {
  
  //   const id = sessionStorage.getItem('userId');;
  //   this.dataservice.getUserListById(id).subscribe(res => {

  //     this.getUserListId = res.resultData;
  //     this.appid = res.resultData[0].applicationNo;
      
  //     console.log(this.getUserListId);

  //   })
  // }

}

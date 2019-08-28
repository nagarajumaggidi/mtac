import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';
import { Router, ActivatedRoute } from '@angular/router';
import {FormControl,FormGroup,Validators,FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-specialevent',
  templateUrl: './specialevent.component.html',
  styleUrls: ['./specialevent.component.scss']
})
export class SpecialeventComponent implements OnInit {
  specialEventForm:FormGroup;
  updatfrm : boolean= false;
  addfrm: boolean= false;
  data: NgForm;
  eventData: any;
  peventName:any;
  id: number;
  eventId: any;

  constructor(private dataservice:DataService, public router: Router, 
    private route: ActivatedRoute,private fb:FormBuilder) { 
   
    this.route.params.subscribe(params => {
      this.id = +params['id'];
      console.log("Id: ", this.id);
    });
  }

  ngOnInit() {
    this.specialEventForm=this.fb.group({
      'eventName':[null,Validators.required],
      'id':[]
      })

    this.getAllspecialEvent()
  }
  add(specialEventForm){
    //regForm.reset();
    this.addfrm= true;
    this.updatfrm= false;
    specialEventForm.reset();
    
  }
  // Save Special Event
  saveEvent(specialEventForm){
    this.dataservice.postspecialEvent(specialEventForm.value).subscribe((res)=>{
      this.getAllspecialEvent();
      specialEventForm.reset();
    })
  }

  //Update Special Event
 updateEvent(specialEventForm){
  specialEventForm.id=this.eventId;
  // var dt = { id:this.data['id'], eventName: this.peventName}
   this.dataservice.updateEvents(specialEventForm.value).subscribe((res)=>{
     console.log(res);
     specialEventForm.reset();
     this.getAllspecialEvent();
   })
 }
// Get all Special Event
  getAllspecialEvent(){
    if (this.id !=0) {
      this.dataservice.getSpecialEvent().subscribe((res)=>{
      // console.log("getting data",res)
      this.eventData = res.resultData
      console.log("getting data",res.resultData)
    })
    }
    
  }
  // Get all Special Event By Id

  getEventById(id){
    this.dataservice.getSpecialEventById(id).subscribe((res)=>{
      // this.id = res.resultData.id;
      console.log("getting data gfgfd",res)
    })
  }
  editSpecialevent(data){
    this.eventId=data.id;
     this.updatfrm= true;
     this.addfrm= false;
     this.specialEventForm.setValue({
      'eventName':data.eventName,
      'id':data.id
     })
   //  this.data =data
    // this.id = this.data['id'];
   //  this.peventName = data['eventName'];
    

   }

   //Delete Special event

  deleteSpecialEvent(id){
    debugger;
    this.dataservice.deleteEvent(id).subscribe((res)=>{
      console.log("deleted status",res);
      this.getAllspecialEvent();
    })
  }
 
}

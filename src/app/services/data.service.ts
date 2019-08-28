import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DataService {

  host_url="http://192.168.1.137:8088/recruitment/";

  
  constructor(private http: HttpClient) { }


  demographicApp(formData):Observable<any>
  {
     return this.http.post(this.host_url+'rest/demographicinfo/saveDemographicInfo',formData)
  }

 
  updatedemographicApp(formdata):Observable<any>
  {
    return this.http.put(this.host_url+'rest/demographicinfo/updateDemographicInfo',formdata)
  }

  previewPdf(id){
    return this.http.get(this.host_url+'rest/demographicinfo/generateAndAndDownPdfFile/'+id);
  }

  excelDownload(){
    return this.http.get(this.host_url+'rest/demographicinfo/excelDownload')
  }
   


  getRegisteredList(formObj) : Observable<any> {
    return this.http.post(this.host_url+'rest/admin/usersList',formObj);
  }
  //recruitment/rest/admin/updateUserStatus
  registerStatus(formObj) : Observable<any> {
    return this.http.post(this.host_url+'rest/admin/updateUserStatus', formObj);
  }

  //Positions Type

  getPositionType(): Observable<any>{
    return this.http.get(this.host_url+'rest/positiontypes');
  }

  getPositionTypeById(id): Observable<any>{
    return this.http.get(this.host_url+'rest/positiontypes/' +id);
  }

  updatePositionTypeById(formData): Observable<any>{
    return this.http.put(this.host_url+'rest/positiontypes/updatePositionType', formData);
  }
  
  sendpositiondata(formData): Observable<any>
  {
    return this.http.post(this.host_url+'rest/positiontypes/createPositionType', formData);
  }

  actionPositionType(positiondata): Observable<any>
  {
     return this.http.post(this.host_url+'rest/positiontypes/deletePositionType',positiondata);
  }




  //Administrator Users 

  getAdminUsers():Observable<any>{
  return this.http.get(this.host_url+'rest/admin/adminsList');
  }
  createUser(addFrom):Observable<any>{
  return this.http.post(this.host_url+'rest/user/createUser', addFrom);
  }
// position type

getpositions():Observable<any>{
  return this.http.get(this.host_url+'rest/positions');
}
createPositions(formData): Observable<any>{
  return this.http.post(this.host_url+'rest/positions/createPositon', formData)
}
getPositionsById(id): Observable<any> {
  return this.http.get(this.host_url+'rest/positions/' +id);
}
updatePositionsById(formData): Observable<any> {
  return this.http.put(this.host_url+'rest/positions/updatePosition', formData)
}
actionPositions(formData): Observable<any> {
  return this.http.post(this.host_url+'rest/positions/deletePosition',formData)
}

      
//category start

  getcategeorydata():Observable<any>{
    return this.http.get(this.host_url+'rest/category');
  }
  
  categoryupdate(formdata):Observable<any>{
    return this.http.put(this.host_url+'rest/category/updateCategory',formdata);
  }
  
  createcategory(formdata):Observable<any>{
    return this.http.post(this.host_url+'rest/category/createCategory',formdata);
  }
  
  deletcategory(formdata):Observable<any>
  {
    return this.http.post(this.host_url+'rest/category/deleteCategory',formdata);
  }

  //category end


  //designation start

   
//designation start

getdesignationdata():Observable<any>{
  return this.http.get(this.host_url+'rest/desingation');
}

createdesignationdata(formdata):Observable<any>{
  return this.http.post(this.host_url+'rest/desingation/createDesignation/',formdata);
}


upddatedesignation(formdata)
{
  return this.http.put(this.host_url+'rest/desingation/updateDesignation/',formdata);
}

editdesignationdata(formdata)
{
  return this.http.put(this.host_url+'rest/desingation/updateDesignation/',formdata);
}

deletedesignation(formdata)
{
  return this.http.post(this.host_url+'rest/desingation/deleteDesignation',formdata);
}

//designation end

  //designation End



  // Employment Type

  getemployementdata():Observable<any>{
    return this.http.get(this.host_url+'rest/employmenttypes');
  }
  addEmployementType(formData): Observable<any> {
    return this.http.post(this.host_url+'rest/employmenttypes/createEmploymentType', formData);
  }
  getEmploymentById(id): Observable<any>{
    return this.http.get(this.host_url+'rest/employmenttypes/' +id);
  }
  updateEmployementById(formData): Observable<any> {
    return this.http.put(this.host_url+'rest/employmenttypes/updateEmploymentType', formData);
  }
  EmployementStatus(formData): Observable<any> {
    return this.http.post(this.host_url+'rest/employmenttypes/deleteEmploymentType', formData);
  }

  // Fee structure

  getFeeStructure() : Observable<any> {
    return this.http.get(this.host_url+'rest/feeStructure');
  }
  createFeeStructure(formData) : Observable<any> {
    return this.http.post(this.host_url+'rest/feeStructure/insertFeeDetails', formData)
  }
  getFeeStructureById(id){
    return this.http.get(this.host_url+'rest/feeStructure/'+id);
  }
  updateFeeStructureById(formData){
     return this.http.put(this.host_url+'rest/feeStructure/updateFeeDetails', formData);
  }
  stautsFeeStructure(formData) : Observable<any>{
    return this.http.post(this.host_url+'rest/feeStructure/deleteFeeDetails', formData);
  }

  getUsersData(): Observable<any> {
    return this.http.get(this.host_url+'rest/SponsorUser/getAllSponsorUsers');
  }


   //get application id

   getapplication():Observable<any>{
    return this.http.get(this.host_url+'rest/demographicinfo/getApplications');
  }

  getapplicationid(id): Observable<any> 
  {
    return this.http.get(this.host_url+'rest/positions/applicationSeq/'+id);
  }

  getuserlistByIds(formdata): Observable<any> 
  {
    return this.http.post(this.host_url+'rest/positions/applicationSeq',formdata);
  }
  getUserListById(id): Observable<any> {
    return this.http.get(this.host_url+'rest/demographicinfo/getDemographicInfoByUserId/'+id);
  }


  employeecreate(formdata)
   {
   return this.http.post(this.host_url+'rest/employmentInfo/saveEmploymentInfo',formdata);
   }

  employeeinfo(formdata)
   {
    return this.http.post(this.host_url+'rest/employmentInfo/saveEmploymentInfo',formdata);
   }

   getemployeedata(id)
   {
      return this.http.get(this.host_url+'rest/employmentInfo/getEmploymentInfoById/'+id);
   }

   //application start

  searchapplication(date,id):Observable<any>{
    return this.http.get(this.host_url+'rest/demographicinfo/searchApplications?date='+date+'&position='+id);
  }

  //application end

  //get verify component start

   getDemographic(id)
   {
      return this.http.get(this.host_url+'rest/demographicinfo/getDemographicInfo/'+id)  
   }


   //get verify component end


  //another project

  
  getSponserUser():Observable<any>{
    return this.http.get(this.host_url+"rest/sponsor/showAllSponsors");
  }
  // Post user
  postUsers(data):Observable<any>{

    return this.http.post(this.host_url+"rest/SponsorUser/createUser",data);

  }
// add contact
adduserContact(contactdata):Observable<any>{
  return this.http.post(this.host_url+"rest/sponsoraddress/create",contactdata);
}


 // Delet User
  deleteUsers(id):Observable<any>{
    return this.http.delete(this.host_url+'rest/SponsorUser/deleteSponsorUser'+"/"+ id);
  }
  updateUsers(data):Observable<any>{

    return this.http.put(this.host_url+"rest/SponsorUser/updateSponsorUser",data);

  }
  createSponsorDetails(sponsorData):Observable<any>{
    return this.http.post(this.host_url+"rest/sponsor/createSponsor",sponsorData);
  }
  setEthenic(ethenicData):Observable<any>{

    return this.http.post(this.host_url+"rest/ethnicGroups/save",ethenicData);
  }
  getEthenic():Observable<any>{
    return this.http.get(this.host_url+"rest/ethnicGroups/getAllEthnics");
  }
  //All status 

  getStatusData():Observable<any>{

    return this.http.get(this.host_url+"rest/Status/getAllStatus");

  }
  getSponsorsList():Observable<any>{

    return this.http.get(this.host_url+"rest/sponsor/showAllSponsors ");

  }

  // Post Status

  postStatus(data):Observable<any>{
    return this.http.post(this.host_url+"rest/Status/createStatus",data);
  }

  //Delete Status

  deleteStatus(id):Observable<any>{
    return this.http.delete(this.host_url+'rest/Status/getStatusById'+"/"+ id);
  }

  //Edit Status

  // editStatusData(data,id):Observable<any>{

  //   return this.http.put(rest/Status/updateStatus' +"/"+ id );

  // }

 

  //All SpecialEvent 

  getSpecialEvent():Observable<any>{
    return this.http.get(this.host_url+"rest/SpecialEvent/getSpecialEvents");
  }

  // Get SpecialEvent by Id

  getSpecialEventById(id):Observable<any>{
    return this.http.get(this.host_url+"rest/SpecialEvent/getSpecialEventById" +'/'+ id);
  }

  // Post SpecialEvent

  postspecialEvent(data):Observable<any>{
    return this.http.post(this.host_url+"rest/SpecialEvent/createSpecialEvent",data);
  }

 

  //Update SpecialEvent

  updateEvents(data):Observable<any>{
    return this.http.put(this.host_url+'rest/SpecialEvent/updateSpecialEvent',data);
  }

  //Delete SpecialEvent
  deleteEvent(id):Observable<any>{
    return this.http.delete(this.host_url+'rest/SpecialEvent/deleteSpecialEvent'+"/"+ id);
  }



//sponsors details
getAddressDetails(id):Observable<any>{
  return this.http.get(this.host_url+'rest/sponsor/addresses/'+id);
}
getRulesDetails(id):Observable<any>{
  //return this.http.get(this.host_url+'rest/sponsor/rules/'+id);
  return this.http.get(this.host_url+'rest/rules/'+id);
}
getTestCodeDetails(id):Observable<any>{
  return this.http.get(this.host_url+'rest/sponsor/testCodes/'+id);
}

getServiceRequestDetails(sponsorId):Observable<any>{
  return this.http.get(this.host_url+'rest/endUsers/'+sponsorId);
}
getAllServiceRequestDetails():Observable<any>{
  return this.http.get(this.host_url+'rest/endUsers/getAll');
}

createTestDetails(testCodeData){
  return this.http.post(this.host_url+"rest/testCode/createTest",testCodeData);
}
getAllTestCodeDetails():Observable<any>{
  return this.http.get(this.host_url+'rest/testCode/getAllTestCodes'); 

}
updateTestCodeDetails(testCodeData):Observable<any>{
  return this.http.put(this.host_url+'rest/testCode/updateTestCode',testCodeData);

}
getMultiplepostCode():Observable<any>{
  return this.http.get(this.host_url+'rest/PostalCode/getAllPostalCodes');

}
createRuleDetails(ruledata):Observable<any>{
  return this.http.post(this.host_url+"rest/rules/createRuleListMapper",ruledata);
}

 //Get All Postalcode 
 getAllPostalcode():Observable<any>{

  return this.http.get(this.host_url+"rest/PostalCode/getAllPostalCodes");
}
// Post Postalcode
postPostalcode(data):Observable<any>{

  return this.http.post(this.host_url+"rest/PostalCode/createPostalCode",data);
}

//Update Postalcode
updatePostalcode(data):Observable<any>{

  return this.http.put(this.host_url+'rest/PostalCode/updatePostalCode',data);

}

// add contact by Id
adduserContactbyid(contactdata):Observable<any>{
  return this.http.post(this.host_url+"rest/sponsoraddress/create",contactdata);
}


//Delete Postalcode

deletePostalcode(id):Observable<any>{

  return this.http.delete(this.host_url+'rest/PostalCode/deletePostalCode'+"/"+ id);

}
getPostCodeList(id):Observable<any>{

  return this.http.get(this.host_url+'rest/sponsor/postCodes/'+id);

}



updateSelectedPostalCode(postCode,sponsorId):Observable<any>{

  return this.http.put(this.host_url+'rest/sponsor/postCodes/update/'+sponsorId,postCode);

}
updateSelectedAddress(sponsorAddress):Observable<any>{

  return this.http.put(this.host_url+'rest/sponsor/addresses/update',sponsorAddress)  

}


//update ethenic

editEthenicData():Observable<any>{

  return this.http.get(this.host_url+'rest/ethnicGroups/getAllEthnicMapper') 

}
editTestListData():Observable<any>{

  return this.http.get(this.host_url+'rest/testCode/getAllTestCodesMapper') 

}


updateEthenicData(ethinicData):Observable<any>{

  return this.http.put(this.host_url+'rest/ethnicGroups/update',ethinicData) 

}
getSponsorbyId(id):Observable<any>{

  return this.http.get(this.host_url+'rest/sponsor/sponsorDetails/'+id) 

}
getuserByid(id):Observable<any>{

  return this.http.get(this.host_url+'rest/SponsorUser/getAllUsersBySponsorId/'+id) 

}
updateSelectedRule(data):Observable<any>{

  //return this.http.put(this.host_url+'rest/sponsor/rules/update',data) 
  //return this.http.put(this.host_url+'rest/rules/update',data) 
  return this.http.put(this.host_url+"rest/rules/update",data);
}
getSponsorUpdate(id):Observable<any>{

  return this.http.get(this.host_url+'rest/sponsor/sponsorWithPostalCode/'+id)

}
updateSponsorDetails(data,id):Observable<any>{

  return this.http.put(this.host_url+'rest/sponsor/sponsorWithPostalCode/'+id,data) 

}
updateStatus(data,id):Observable<any>{
  return this.http.put(this.host_url+'rest/Status/updateStatus/'+id,data) 
}
getDashboardData(sponsorId):Observable<any>{
  return this.http.get(this.host_url+'rest/sponsor/sponsorOrder/'+sponsorId);

}
getDashboardDataALl():Observable<any>{
  return this.http.get(this.host_url+'rest/sponsor/sponsorOrder/all');
  //return this.http.get('http://192.168.1.137:8080/rest/sponsor/sponsorOrder/all');

}
getsponsorDashboardspentList(sponsorId):Observable<any>{
  return this.http.get(this.host_url+'rest/spnsorspents/'+sponsorId);

}
getSuperAdminspendlist():Observable<any>{
  return this.http.get(this.host_url+'rest/spnsorspents/budget/');
}

//Dashboard reports
getreports():Observable<any>{
  return this.http.get(this.host_url+'rest/endUsers/requestsForTheLastMonth');
}
getreportsTests():Observable<any>{
  return this.http.get(this.host_url+'rest/endUsers/testRequestsForTheLastMonth');
}


}



import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "@angular/fire/auth";
import { Database,set,ref,onValue } from '@angular/fire/database';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public auth: Auth,public database:Database) { }

  ngOnInit(): void {
  }
  ab = "";
  registerUser(value:any){

    const starCountRef = ref(this.database, 'users/' + value.email);
    onValue(starCountRef, (snapshot) => {
     const db = snapshot.val();  
  this.ab = db.email
 
     }); 
  
      
     if (  value.email == null || value.email == "" || value.password == null || value.password == "" 
      ||  value.username == null || value.username == ""
      ){
      alert('Fill the form ');
     }else{
      if(this.ab == value.email){
       alert('user email already exist!'); 
      }
  
        
      else {
       
    set(ref(this.database, 'users/' + value.email), {
        
        email: value.email,
        username: value.username,
        password: value.password
  
  
       }); 
       alert('account created!');
 
      }
     }
  }

}

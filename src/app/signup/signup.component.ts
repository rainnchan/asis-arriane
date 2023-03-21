import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "@angular/fire/auth";
import { Database,set,ref,onValue,update } from '@angular/fire/database';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public database:Database) { }
  data = "";
  name = "";
   delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  async Login(value: any){
    
 
    const starCountRef = ref(this.database, 'users/' + value.email1);
    onValue(starCountRef, (snapshot) => {
     const as = snapshot.val();   
  
this.data = as.password;
     console.log( as.password)
    
   });
   await this.delay(1000);
   if (  value.email1 == null || value.email1 == "" || value.password1 == null || value.password1 == "" 
   
   ){
    alert('Fill the form ');
   }else{
  if (this.data == value.password1){
      const date = new Date();
      update(ref(this.database, 'users/' + value.email1),{
        last_login:date
      });
      sessionStorage.setItem('email',value.email1)
      alert('login!');
      
     }else{
   
  
      alert('wrong credential!');
      return;
     }
}
  }
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

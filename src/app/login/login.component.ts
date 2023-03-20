import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "@angular/fire/auth";
import { Database,set,ref, update, onValue } from '@angular/fire/database';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public auth: Auth,public database:Database) { }

  ngOnInit(): void {
  }
data = ""
  registerUser(value: any){
   const starCountRef = ref(this.database, 'users/' + value.email);
   onValue(starCountRef, (snapshot) => {
const db = snapshot.val();
this.data = db.password;  
console.log(this.data)
   });
   if (this.data == value.password){
    const date = new Date();
    update(ref(this.database, 'users/' + value.email),{
      last_login:date
    });

   }else{
    alert('wrong credential!');
   }

  }

}

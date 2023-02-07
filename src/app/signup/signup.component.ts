import { Component, OnInit } from '@angular/core';
import { Auth, createUserWithEmailAndPassword,signInWithEmailAndPassword  } from "@angular/fire/auth";
import { Database,set,ref } from '@angular/fire/database';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public auth: Auth,public database:Database) { }

  ngOnInit(): void {
  }
  registerUser(value: any){

    createUserWithEmailAndPassword(this.auth, value.email, value.password)
      .then((userCredential) => {
        // Signed in 

        const user = userCredential.user;

        set(ref(this.database,'users/' + user.uid), {
          username:value.username,
          email:value.email,
          password:value.password,
        })
alert('user created');

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
        alert(errorMessage);
      });
  }

}

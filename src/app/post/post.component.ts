import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {  AngularFireDatabase } from '@angular/fire/compat/database';
import { Database,remove,ref,update, onValue, set} from '@angular/fire/database';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  data = false;
  email = sessionStorage.getItem('email');
  account!: Observable<any[]>;
  constructor(public database: Database, private FireDb: AngularFireDatabase) {
  this.account = FireDb.list('/post').valueChanges();
   const starCountRef = ref(this.database, 'users/' + this.email);
   onValue(starCountRef, (snapshot) => {
   const db = snapshot.val();
   this.data = db.admin;  
   console.log(this.data)
     });
      }
  
      del(value: any){
        remove(ref(this.database, 'post/' + value));
        alert('Deleted Successfully')
      }
  ngOnInit(): void {
  }

uid = "";
    postna(value:any){
      console.log ("gumana")
      this.uid = "post" +Math.floor(100000 + Math.random() * 900000);       
      set(ref(this.database, 'post/' + this.uid), {   


          name: value.name,
          post: value.post,
          id: this.uid
         }); 
         alert('Posted!');
        }
       }

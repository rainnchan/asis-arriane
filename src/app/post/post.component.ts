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
  account!: Observable<any[]>;
  constructor(public database: Database, private FireDb: AngularFireDatabase) {
  this.account = FireDb.list('/post').valueChanges();}

  ngOnInit(): void {
  }


    postna(value:any){

        
      set(ref(this.database, 'post/' + value.name), {   
          name: value.name,
          post: value.post
         }); 
         alert('Posted!');
        }
       }

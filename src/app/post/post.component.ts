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

        addComment(value:any){

          this.uid = "comment" +Math.floor(100000 + Math.random() * 900000);
          set(ref(this.database, 'post/'+value.id+'/comment/'+ this.uid), {
            name: value.name1,
            comment: value.post1,
            id: this.uid,
            postid: value.id
          });
     console.log(value.id)
        }

        comments!: Observable<any[]>;
        currentpost = "";
        modeC=false;
        modeR=false;
        likers = "";
        getComment(post:any){
          this.comments = this.FireDb.list('/post/'+post+'/comment/').valueChanges();
          this.currentpost = post;
          this.modeC=true;
          this.modeR=false;
          console.log("hello")
          const starCountRef1 = ref(this.database, 'post/'+this.currentpost+'/like/'+ this.email);
          onValue(starCountRef1, (snapshot) => {
           const db1 = snapshot.val();  
        this.likers = db1.name;
              console.log(this.likers) 
        
           }); 
       
        }
        currentcomment="";
        rep(reply:any){
          this.uid = "reply" +Math.floor(100000 + Math.random() * 900000);
          set(ref(this.database, 'post/'+this.currentpost+'/comment/'+this.currentcomment+'/reply/'+this.uid), {   
              name: reply.name1,
              reply: reply.post1,
              id: this.uid,
              postid: this.currentpost,
              commentid: this.currentcomment,         

             }); 

    
         
            this.modeC=true;
            this.modeR=false;

        }
        reply!: Observable<any[]>;
        getReply(reply:any){
           this.currentcomment=reply 
          this.reply = this.FireDb.list('/post/'+this.currentpost+'/comment/'+this.currentcomment+'/reply').valueChanges();
   console.log("tesr")
     
         this.modeR=true;
         this.modeC=false;
         
      }
      likecounter=0;
      like(value:any){
        if(value == 0 || value == undefined || value == null){
        update(ref(this.database, 'post/'+this.currentpost),{
          likes:1
          } );
          set(ref(this.database, 'post/'+ this.currentpost +'/like/'+ this.email), {   
            name: this.email
           }); 
    }else{
      this.likecounter = value + 1;
      update(ref(this.database, 'post/' + this.currentpost),{
        likes:this.likecounter
        } );
        set(ref(this.database, 'post/'+ this.currentpost +'/like/'+ this.email), {   
          name: this.email
         }); 
    }
 }
 //unliking a post
 unlike(value:any){
   remove(ref(this.database, '/post/'+ this.currentpost +'/like/'+ this.email));
   this.likecounter = value - 1;
   update(ref(this.database, 'post/' + this.currentpost),{
     likes:this.likecounter
     } );
     this.likers=""
 }
       }

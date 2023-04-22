import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
export class CommentSectionComponent implements OnInit {

  constructor() { }
  comments = [
    { author: 'John', text: 'This is a great post!' },
    { author: 'Mary', text: 'Thanks for sharing this.' }
  ];

  newComment = { author: '', text: '' };

addComment() {
  this.comments.push(this.newComment);
  this.newComment = { author: '', text: '' };
}

  ngOnInit(): void {
    
  }

}

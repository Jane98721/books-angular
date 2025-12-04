import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { ActivatedRoute, Router} from '@angular/router';
import { BookService } from '../books/books.service';
import { Book } from '../books/books.service'


@Component({
  selector: 'app-create-books',
  standalone: true, 
  imports: [FormsModule, CommonModule],
  templateUrl: './create-books.html',
  styleUrl: './create-books.css',
})

export class CreateBooks implements OnInit {

  router = inject(Router) 
  bookService = inject(BookService) 
  route = inject(ActivatedRoute) 

  newTitle: string = '';
  newAuthor: string = '';
  newPublished: string ='';

  editMode = false; 
  editingBookId: number | null = null

  ngOnInit(){
  this.route.queryParams.subscribe(params => { 
    const id = params ['id'];
    if(id) {
      this.editMode = true;
      this.editingBookId = Number(id)

      const book = this.bookService.getCurrentBooks().find(b => b.id === this.editingBookId);
        if(book) {
        this.newTitle = book.title;
        this.newAuthor = book.author;
        this.newPublished = book.publishedYear.toString();
      }
    } 
  });
}
  saveBook(){
     const book: Book = {
      id: this.editingBookId! ?? 0,
      title: this.newTitle,
      author: this.newAuthor,
      publishedYear: Number(this.newPublished)
      };
      
      if(this.editMode  && this.editingBookId){
      this.bookService.updateBook(this.editingBookId!, {
        title: this.newTitle,
        author: this.newAuthor,
        publishedYear: Number(this.newPublished)
      }).subscribe({
        next: updatedBook => {
        console.log('Book updated successfully', updatedBook);
        this.router.navigate(['/books']);
      },
      error: err => console.error('Update failed', err)
      });
    } else {
      this.bookService.addBook(book).subscribe({
      next: newBook => {
        console.log("Added new book", newBook)
        this.router.navigate(['/books']);
      },
      error: err => console.error('Add failed', err)
    });
    }
  }
}
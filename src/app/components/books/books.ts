import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BookService } from './books.service';
import { CommonModule, NgFor } from '@angular/common';
import { Book } from '../books/books.service'

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './books.html',
})

export class Books implements OnInit {

  books: Book[] = [];

  private router = inject(Router)
  private bookService = inject(BookService)
  private cd = inject(ChangeDetectorRef)

  ngOnInit(){
   this.bookService.books$.subscribe(books => {
   this.books = [...books];
   this.cd.detectChanges()
   });
   this.bookService.loadBooks();
  }

   createBook(){
    this.router.navigate(['/create-books'])
  }

  editBook(id:number){
    this.router.navigate(['/create-books'], {queryParams:{id}})
  }

  deleteBook(id:number){
    this.bookService.deleteBook(id).subscribe({
      next: () => {
        this.books = [...this.books.filter(b => b.id !== id)];
        this.cd.detectChanges()
        console.log('Book deleted successfully');
      },
      error: err => console.error('Delete failed', err)
    });
  }
}
import { Injectable } from '@angular/core';
import { BookItem } from '../../model/book-item.interce';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Book{
  id:number,
  title: string,
  author: string,
  publishedYear: number
}

@Injectable({
  providedIn: 'root'
})

export class BookService {

  baseUrl = 'https://user-api-app-g2bmh6ddd6dgg5e0.swedencentral-01.azurewebsites.net/api/books';

  private booksSubject = new BehaviorSubject<Book[]>([]);
  books$ = this.booksSubject.asObservable();
  
  constructor(private http: HttpClient) {}

  private getAuthHeaders(){
    const token = localStorage.getItem('token');
    return {
      headers: new HttpHeaders({
        Authorization: `Bearer ${token}`
      })
    }
  }

  loadBooks(){
    this.http.get<Book[]>(this.baseUrl, this.getAuthHeaders())
    .subscribe(books => this.booksSubject.next(books));
  }

  addBook(book: Book) : Observable <Book> {
    return this.http.post<Book>(this.baseUrl, book, this.getAuthHeaders())
    .pipe(
      tap(newBook => {
        const currentBooks = this.booksSubject.getValue();
        this.booksSubject.next([...currentBooks, newBook])
      })
    )
  }

  updateBook(id: number, book: Omit<Book, 'id'>) : Observable <Book> {
    return this.http.put<Book>(`${this.baseUrl}/${id}`, book,  this.getAuthHeaders())
    .pipe(
      tap(updatedBook => {
        if(!updatedBook) return;
        const currentBooks = this.booksSubject.getValue();
        this.booksSubject.next(currentBooks.map(b => b.id === updatedBook.id ? updatedBook :b))
      })
    )
  }

   deleteBook(id:number) : Observable <void> {
    return this.http.delete<void> (`${this.baseUrl}/${id}`,  this.getAuthHeaders())
    .pipe(
      tap(() => {
       console.log('Deleting book with id:', id);
       const currentBooks = this.booksSubject.getValue();
       console.log('Current books before deletion:', currentBooks);
       this.booksSubject.next(currentBooks.filter(b => b.id !== id));
       console.log('Books after deletion:', this.booksSubject.getValue());
      }), 
    );
  }

    

   getCurrentBooks(): Book[] {
    return this.booksSubject.getValue();
  }
}
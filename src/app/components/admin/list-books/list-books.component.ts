import { Component, OnInit } from '@angular/core';
import { BookInterface } from './../../../models/book';
import { DataApiService } from './../../../services/data-api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService) { }
  private books: BookInterface[];

  ngOnInit() {
    this.getListBooks();
  }

  getListBooks() {
    this.dataApi.getAllBooks()
    .subscribe(books => {
      this.books = books;
    });
  }

  onDeletebook(idBook: string): void {
    console.log('DELETE BOOK', idBook);
    const confirmacion = confirm('Are you sure?');
    if(confirmacion) this.dataApi.deleteBook(idBook);
  }

  onPreUpdateBook(book: BookInterface) {
    this.dataApi.selectedBook = Object.assign({}, book)
  }

}

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
  private books = [];

  ngOnInit() {
    this.getListBooks();
  }

  getListBooks() {
    this.dataApi.getAllBooks().subscribe(books => {
      this.books = books;
    });
  }

  OnDeletebook() {
    console.log('DELETE BOOK');
    
  }

}

import { Component, OnInit } from '@angular/core';
import { BookInterface } from './../../../models/book';
import { DataApiService } from './../../../services/data-api.service';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { UserInterface } from '../../../models/user';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.css']
})
export class ListBooksComponent implements OnInit {

  constructor(private dataApi: DataApiService, private authService: AuthService) { }
  private books: BookInterface[];
  public isAdmin: any = null;
  public userUid: string = null;

  ngOnInit() {
    this.getListBooks();
    this.getCurrentUser();
  }

  getCurrentUser() {
    this.authService.isAuth().subscribe(auth => {
      if(auth) {
        this.userUid = auth.uid;
        this.authService.isUserAdmin(this.userUid).subscribe(userRole => {
          this.isAdmin = Object.assign({}, userRole.roles).hasOwnProperty('admin');
          // this.isAdmin = true;
          // this.isAdmin = this.isAdmin.hasOwnProperty('admin');
        })
      }
    })
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
    this.dataApi.selectedBook = Object.assign({}, book);
  }

}

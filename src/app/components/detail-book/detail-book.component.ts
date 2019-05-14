import { Component, OnInit } from '@angular/core';
import { DataApiService } from './../../services/data-api.service';
import { BookInterface } from './../../models/book';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-detail-book',
  templateUrl: './detail-book.component.html',
  styleUrls: ['./detail-book.component.css']
})
export class DetailBookComponent implements OnInit {

  constructor(private dataApi: DataApiService, private route: ActivatedRoute) { }
  public book: BookInterface = {};

  ngOnInit() {
    const idBook = this.route.snapshot.params['id'];
    this.getDetails(idBook);
  }

  getDetails(id: string): void {
    this.dataApi.getOneBook(id).subscribe(book => {
      this.book = book;
    });
  }

}

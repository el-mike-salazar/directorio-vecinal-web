import { Component, OnInit } from '@angular/core';
import $ from "jquery";
import * as jQuery from 'jquery';


@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./api.component.css']
})
export class ApiComponent implements OnInit {

  constructor() { }

  ngOnInit() {

    jQuery('#titulo').text('Hola mundo');
  }

}

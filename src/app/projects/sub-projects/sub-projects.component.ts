import { Component, OnInit, Input } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sub-projects',
  templateUrl: './sub-projects.component.html',
  styleUrls: ['./sub-projects.component.css']
})
export class SubProjectsComponent implements OnInit {
  @Input()
  subthumbs: any[] = []

  @Input()
  thumbnails: any[];

  constructor(private router: Router) {
  }

  ngOnInit() {
  }

}

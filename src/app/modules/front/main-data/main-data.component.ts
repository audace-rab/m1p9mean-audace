import { Component, OnInit , Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-main-data',
  templateUrl: './main-data.component.html',
  styleUrls: ['./main-data.component.scss']
})
export class MainDataComponent implements OnInit {
  @Output() newItemEvent = new EventEmitter<string>();
  
  searchText = "";
  
  constructor() { }
  
  ngOnInit() {
  }
  
  addNewItem() {
    this.newItemEvent.emit(this.searchText);
  }
  
}

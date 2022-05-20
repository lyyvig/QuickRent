import { ColorService } from './../../../services/color.service';
import { Color } from './../../../models/color';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  dataLoaded = false;
  colors:Color[] = []
  currentColor?:Color;

  constructor(private colorService:ColorService) { }

  ngOnInit(): void {
    this.getColors();
  }

  getColors(){
    this.colorService.getColors().subscribe(result => {
      if(result.success){
        this.colors = result.data;
        this.dataLoaded = true;
      }
    })
  }

  setCurrentColor(color: Color) {
    this.currentColor = color;
  }

  getCurrentColorClass(color: Color) {
    if (color == this.currentColor) {
      return "list-group-item active";
    }
    return "list-group-item";
  }

  setAllColor() {
    this.currentColor = undefined;

  }

  getAllColorClass(){
    if(!this.currentColor){
      return "list-group-item active text-center";
    }
    return "list-group-item text-center";
  }

}

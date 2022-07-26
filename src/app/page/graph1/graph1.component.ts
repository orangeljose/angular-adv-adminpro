import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})
export class Graph1Component implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public valores1:number[] = [10,20,70];
  public valores3:number[] = [0,50,50];
  public valores4:number[] = [20,75,5];   
  public colores2: string[] = ['red','purple','gray'];
  public colores3: string[] = ['#009FEE','green','yellow'];
  public colores4: string[] = ['#FFB414','#68577E6','#009FEE']; 
  public etiquetas1: string[] = ['hola','chao','yey'];   


}

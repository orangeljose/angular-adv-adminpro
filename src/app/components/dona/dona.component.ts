import { Component, Input, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent implements OnInit{
  // Doughnut
  @Input('title') titulo: string =  'Sin titulo';
  @Input('labels') doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  @Input('colors') colores: string[] = ['red','green','blue'];
  @Input('values') valores: number[] = [ 350, 450, 100 ];

  public doughnutChartData: ChartData<'doughnut'> | undefined ;
  public doughnutChartType: ChartType = 'doughnut';

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.doughnutChartLabels,
      datasets: [
        { data: this.valores,
          backgroundColor: this.colores},
      ],      
    };
    
  }

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}

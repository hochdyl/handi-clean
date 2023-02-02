/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable object-shorthand */
/* eslint-disable @typescript-eslint/member-ordering */
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { tap } from 'rxjs/operators';
import { Statistic } from 'src/app/core/models/statistic';
import { LoadingService } from 'src/app/core/services/alerts/loading/loading.service';
import { StatisticService } from 'src/app/core/services/api/statistic/statistic.service';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.page.html',
  styleUrls: ['./statistics.page.scss'],
})
export class StatisticsPage implements OnInit {


  @ViewChild('barCanvas') private barCanvas: ElementRef;
  @ViewChild('lineCanvas') private lineCanvas: ElementRef;

  barChart: any;
  lineChart: any;

  statistics: Statistic[] = [];
  labelsDate = [];
  dataBar = [];
  dataLine = [];

  averageError = '0';
  averageTime = '0';

  gameName;

  constructor(
    private loadingService: LoadingService,
    private statisticService: StatisticService,
    private route: ActivatedRoute,
  ) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.loadingService.simpleLoader('Veuillez patientez...');
    const childId = +this.route.snapshot.paramMap.get('childId');
    const gameId = +this.route.snapshot.paramMap.get('gameId');
    this.statisticService.get(childId)
      .pipe(
        tap((statistic) => {
          this.statistics = statistic;
          this.gameName = statistic[0].game.name;
          this.statistics = statistic.filter(s => s.game_id === gameId);
          this.statistics.forEach(element => {
            this.dataBar.push(element.nb_errors);
            this.dataLine.push(element.time);
            const date = element.created_at.substring(0, element.created_at.length - 9);
            this.labelsDate.push(date);
          });
          if (this.dataBar.length>0 || this.dataLine.length>0) {
            this.averageError = this.arrayAverage(this.dataBar).toFixed(2);
            this.averageTime = this.arrayAverage(this.dataLine).toFixed(2);
          }
          this.barChartMethod(this.labelsDate, this.dataBar);
          this.lineChartMethod(this.labelsDate, this.dataLine);

        })
      )
      .subscribe(() => {
        setTimeout(() => this.loadingService.dismissLoader(), 500);
      });
  }

  barChartMethod(labels: any[], data: any[]) {
    this.barChart = new Chart(this.barCanvas.nativeElement, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: "Nombre d'erreur",
          data: data,
          backgroundColor: [
            'rgba(177, 131, 250, 0.2)',
          ],
          borderColor: [
            'rgba(159,103,249,1)',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  lineChartMethod(labels: any[], data: any[]) {
    this.lineChart = new Chart(this.lineCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Temps (s)',
            fill: false,
            //lineTension: 0.1,
            backgroundColor: 'rgba(177, 131, 250, 0.2)',
            borderColor: 'rgba(159,103,249,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(159,103,249,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(159,103,249,1)',
            pointHoverBorderColor: 'rgba(159,103,249,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: data,
            spanGaps: false,
          }
        ]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  arrayAverage(array: number[]) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
      sum = sum + array[i++];
    }
    return sum / array.length;
  }
}



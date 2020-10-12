//================ importing all the required components ===================
import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from "../../../app.config";
import { DashboardService } from './dashboard.service';
//============== defining dashboard component ===================
@Component({
    selector: 'dashBoard',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./dashboard.component.scss'],
    templateUrl: './dashboard.component.html',
    providers: [DashboardService]
})

//=============== exporting custom dashboard component ==============
export class DashBoardComponent {
    public config: any;
    public configFn: any;
    type: any = 'week';
    dArray: any = [];
    pArray: any = [];
    lable: any = [];
    chartType = 1;
    charDuration = 'week';
    name: any;
    public lineChartType: string = 'line';
    public lineChartLegend: boolean = true;
    public lineChartLabels: string[];
    public lineChartData: Array<any>;
    public lineChartColors: any[];
    public lineChartOptions: any;

    public chartData = [
        { name: 'GUEST', count: 0, class: 'primary', icon: 'user' },
        { name: 'REGISTERED USERS', count: 0, class: 'danger', icon: 'users' },
        { name: 'POSTS', count: 0, class: 'warning', icon: 'picture-o' },
        { name: 'POST VIEWS', count: 0, class: 'success', icon: 'eye' },
        { name: 'FAVOURITE', count: 0, class: 'warning', icon: 'cart-arrow-down' },
        { name: 'OFFERS MADE', count: 0, class: 'primary', icon: 'tasks' },
        { name: 'OFFERS ACCEPTED', count: 0, class: 'success', icon: 'thumbs-up' },
        { name: 'MARKED AS SOLD', count: 0, class: 'danger', icon: 'fa fa-scribd' }
    ];


    constructor(private _appConfig: AppConfig, private _service: DashboardService) {
        this.config = this._appConfig.config;
        this.configFn = this._appConfig;
    }
    ngOnInit() {
        this._service.gotoGetCount().subscribe(
            result => {
                for (let i = 0, len = result.length; i < len; i++)
                    this.chartData[i]['count'] = result[i];
            }
        )
        this._service.getChartData(this.charDuration).subscribe(
            result => {
                this.name = 'USER';
                result.count.forEach(element => {
                    this.pArray.push(element);
                });
                result.day.forEach(d => {
                    this.lable.push(d);
                });

                this.genrateChart();
            }
        )
        // this._service.getPostData(this.type).subscribe(
        //     result => {
        //         result.count.forEach(element => {
        //             this.pArray.push(element);
        //         });
        //         // result.day.forEach(d => {
        //         //     this.lable.push(d);
        //         // });

        //         this.genrateChart();
        //     }
        // )
        this.genrateChart();

    }

    genrateChart() {
        //--- Line Chart ---
        this.lineChartLabels = this.lable;
        this.lineChartData = [
            // { data: [0, 2, 0, 4, 1, 4, 7], label: 'GUEST USER' },
            // { data: this.dArray, label: 'REGISTERED USER' },
            { data: this.pArray, label: this.name }
        ];
        this.lineChartColors = [
            // {
            //     borderWidth: 2,
            //     backgroundColor: this.configFn.rgba(this.config.colors.success, 0.5),
            //     borderColor: this.config.colors.success,
            //     pointBorderColor: this.config.colors.default,
            //     pointHoverBorderColor: this.config.colors.success,
            //     pointHoverBackgroundColor: this.config.colors.default,
            //     hoverBackgroundColor: this.config.colors.success
            // },
            // {
            //     borderWidth: 2,
            //     backgroundColor: this.configFn.rgba(this.config.colors.warning, 0.5),
            //     borderColor: this.config.colors.warning,
            //     pointBorderColor: this.config.colors.default,
            //     pointHoverBorderColor: this.config.colors.warning,
            //     pointHoverBackgroundColor: this.config.colors.default,
            //     hoverBackgroundColor: this.config.colors.warning
            // },
            {
                borderWidth: 2,
                backgroundColor: this.configFn.rgba(this.config.colors.primary, 0.5),
                borderColor: this.config.colors.primary,
                pointBorderColor: this.config.colors.default,
                pointHoverBorderColor: this.config.colors.primary,
                pointHoverBackgroundColor: this.config.colors.default,
                hoverBackgroundColor: this.config.colors.primary
            }
        ];
        this.lineChartOptions = {
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: this.configFn.rgba(this.config.colors.gray, 0.7),
                        beginAtZero: true
                    },
                    gridLines: {
                        display: true,
                        zeroLineColor: this.configFn.rgba(this.config.colors.gray, 0.5),
                        zeroLineWidth: 1,
                        color: this.configFn.rgba(this.config.colors.gray, 0.1)
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: this.configFn.rgba(this.config.colors.gray, 0.7)
                    },
                    gridLines: {
                        display: true,
                        zeroLineColor: this.configFn.rgba(this.config.colors.gray, 0.5),
                        zeroLineWidth: 1,
                        color: this.configFn.rgba(this.config.colors.gray, 0.1)
                    }
                }]
            },
            legend: {
                labels: {
                    fontColor: this.configFn.rgba(this.config.colors.gray, 0.9),
                }
            },
            tooltips: {
                enabled: true,
                backgroundColor: this.configFn.rgba(this.config.colors.main, 0.7)
            }
        }
    }
    goBtn() {
        // console.log("type", this.chartType);
        // console.log("duration", this.charDuration);
        if (this.chartType == 1) {
            this._service.getChartData(this.charDuration).subscribe(
                res => {
                    this.pArray = [];
                    this.lable = [];
                    this.name = 'USER';
                    res.count.forEach(element => {
                        this.pArray.push(element);
                    });
                    res.day.forEach(d => {
                        this.lable.push(d);
                    });
                    this.genrateChart();
                }
            )
        } else if (this.chartType == 2) {
            this._service.getPostData(this.charDuration).subscribe(
                res => {
                    this.pArray = [];
                    this.lable = [];
                    this.name = 'POSTS';
                    res.count.forEach(element => {
                        this.pArray.push(element);
                    });
                    res.day.forEach(d => {
                        this.lable.push(d);
                    });
                    this.genrateChart();
                }
            )
        }

    }

    public chartClicked(e: any): void {
        // console.log(e);
    }

    public chartHovered(e: any): void {
        // console.log(e);
    }

}

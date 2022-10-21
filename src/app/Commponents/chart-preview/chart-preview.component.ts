
import { HttpClient } from '@angular/common/http';
import { Component, ViewChild, OnInit, AfterViewInit, ElementRef,AfterViewChecked, ViewChildren, QueryList } from '@angular/core';
import { FormControl } from '@angular/forms';
import { users } from 'src/app/users.model';


@Component({
  selector: 'app-chart-preview',
  templateUrl: './chart-preview.component.html',
  styleUrls: ['./chart-preview.component.scss']
})





export class ChartPreviewComponent implements OnInit, AfterViewInit {
  @ViewChild('chartContainer') chart!: ElementRef;
  @ViewChildren('chartContainer') charts!: QueryList<ElementRef>;
  modeControl:FormControl = new FormControl(false)

  orgChart!: OrgChart
  chartCopy!:any;

  ngOnInit(): void {
    this.modeControl.valueChanges.subscribe((val)=>{
     console.log(val);
this.reload()
    })
  }
  reload(){
    console.log('reload');

    this.orgChart.update({});
    this.orgChart.draw();

  }
  constructor() { }





  preview() {
    console.log(Array.from(this.chart.nativeElement.children).filter(
      (item:any)=>item.getAttribute("data-ctrl-menu")===''));
    (OrgChart as any).pdfPrevUI.show(this.orgChart, {
      format: "A4",
      header: 'My Header',
      footer: 'My Footer. Page {current-page} of {total-pages}'
  });

}


  ngAfterViewInit(): void {
this.loadChart();
console.log(this.charts.first.nativeElement);

this.charts.changes.subscribe((val)=>{
  console.log(this.chart,val.first);

})



  }

loadChart(){
  this.orgChart = new OrgChart(this.chart.nativeElement, {
    template: "olivia",
    mode: this.modeControl.value?'dark':'light',
    layout: OrgChart.mixed,
    mouseScrool: OrgChart.none,
    menu: {

      pdfPreview:{text:'PDF Preview',onClick:(event: any)=>this.preview()},
      pdf: { text: "Export PDF" },
      png: { text: "Export PNG" },
      svg: { text: "Export SVG" },
      csv: { text: "Export CSV" }
    },
    nodeMenu: {
      pdf: { text: "Export PDF" },
      png: { text: "Export PNG" },
      svg: { text: "Export SVG" }
    },
    nodeBinding: {
      field_0: "name",
      field_1: "title",
      img_0: "img"
    }
  });





  this.orgChart.load(users);
  console.log(this.orgChart);
  this.chartCopy = {...this.orgChart};

  const replacerFunc = () => {
    const visited = new WeakSet();
    return (key: any, value: any) => {
      if (typeof value === "object" && value !== null) {
        if (visited.has(value)) {
          return;
        }
        visited.add(value);
      }
      return value;
    };
  };


  localStorage.setItem('chart',JSON.stringify(this.chartCopy, replacerFunc()));
  console.log(this.chartCopy);

}
}

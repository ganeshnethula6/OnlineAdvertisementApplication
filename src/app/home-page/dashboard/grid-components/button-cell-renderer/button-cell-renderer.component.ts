import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-button-cell-renderer',
  templateUrl: './button-cell-renderer.component.html',
  styleUrls: ['./button-cell-renderer.component.css']
})
export class ButtonCellRendererComponent implements OnDestroy,ICellRendererAngularComp {

  refresh(params?: any): boolean {
    return true;
  }
  private params: any;
private label!: string;


  agInit(params: any): void {
    this.params = params;
    this.label=this.params.label||null;
  }

  btnClickedHandler() {
    if (this.params.onClick instanceof Function) {
      // put anything into params u want pass into parents component
      const params = {
       // event: $event,
        rowData: this.params.node.data
        // ...something
      }
      this.params.onClick(this.params);
  }
}

  ngOnDestroy() {
    // no need to remove the button click handler
    // https://stackoverflow.com/questions/49083993/does-angular-automatically-remove-template-event-listeners
  }
}

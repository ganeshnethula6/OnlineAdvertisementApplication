import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';

@Component({
  selector: 'app-hyperlink-cell-renderer',
  templateUrl: './hyperlink-cell-renderer.component.html',
  styleUrls: ['./hyperlink-cell-renderer.component.css']
})
export class HyperlinkCellRendererComponent implements ICellRendererAngularComp,OnDestroy {

    params: any;
    agInit(params: any): void {
        this.params = params;
    }

    refresh(params: any): boolean {
        return false;
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

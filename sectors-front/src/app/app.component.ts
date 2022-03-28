import { Component, OnInit } from '@angular/core';
import { SectorsHttpService } from './services/sectors.http.service';
import { SectorNode, toSectorNode } from './components/sector-tree-group/sector-tree/sector-tree.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  nodes: SectorNode[] = [];

  constructor(private readonly service: SectorsHttpService) { }

  ngOnInit() {
    this.reloadSectors();
  }

  onUpdated(): void {
    this.reloadSectors();
  }

  private reloadSectors(): void {
    this.service.getSectors()
      .subscribe(sectors => this.nodes = sectors.map(s => toSectorNode(s)));
  }
}

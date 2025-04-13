import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { StableService, Stable } from '@starstable-wiki/shared/api';

@Component({
  selector: 'app-stable-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stable-overview.component.html',
  styleUrls: ['./stable-overview.component.css'],
})
export class StableOverviewComponent {
  stables: Stable[] = [];

  constructor(private stableService: StableService) {
    this.stableService.getStables().subscribe((data) => (this.stables = data));
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Stable } from 'libs/shared/api/src/lib/models/stable.interface';  // Import the Stable model
import { StableService } from 'libs/shared/api/src/lib/services/stable.service';  // Import the StableService

@Component({
  selector: 'app-stable-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stable-overview.component.html',
  styleUrls: ['./stable-overview.component.css'],
})
export class StableOverviewComponent implements OnInit {
  stables: Stable[] = [];  // Array to hold stables

  constructor(private stableService: StableService) {
    this.stableService.getStables().subscribe((data) => (this.stables = data));  // Fetch stables from the service
  }

  ngOnInit(): void {}
}

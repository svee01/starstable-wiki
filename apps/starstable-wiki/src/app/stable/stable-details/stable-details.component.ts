import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Stable } from 'libs/shared/api/src/lib/models/stable.interface';  // Import the Stable model
import { StableService } from 'libs/shared/api/src/lib/services/stable.service';  // Import the StableService

@Component({
  selector: 'app-stable-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './stable-details.component.html',
  styleUrls: ['./stable-details.component.css'],
})
export class StableDetailsComponent implements OnInit {
  stable!: Stable;  // Define the stable object
  stables: Stable[] = [];  // List of stables (optional, if you're fetching a list)

  constructor(private route: ActivatedRoute,
    private stableService: StableService  // Inject StableService to interact with the backend
  ) {}

  ngOnInit(): void {
    const stableId = this.route.snapshot.paramMap.get('id');  // Get stable ID from URL
    if (stableId !== null) {
      this.stableService.getStableById(stableId).subscribe((data) => {
        this.stable = data;  // Assign the fetched stable data
      });
    } else {
      console.error('Stable ID is null');  // Handle the case where stableId is null
    }
  }
}

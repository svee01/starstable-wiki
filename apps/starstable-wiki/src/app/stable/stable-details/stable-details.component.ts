import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { StableService, Stable } from '@starstable-wiki/shared/api';

@Component({
  selector: 'app-stable-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './stable-details.component.html',
  styleUrls: ['./stable-details.component.css'],
})
export class StableDetailsComponent implements OnInit {
  stable!: Stable;
  stables: Stable[] = [];

  constructor(private route: ActivatedRoute,
    private stableService: StableService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const stableId = this.route.snapshot.paramMap.get('id');
    if (stableId !== null) {
      this.stableService.getStableById(stableId).subscribe((data) => {
        this.stable = data;
      });
    } else {
      console.error('Stable ID is null');
    }
  }
  
  onDelete(): void {
    if (this.stable && this.stable._id) {
      const confirmDelete = confirm(
        `Are you sure you want to delete the stable "${this.stable.name}"?`
      );
      if (confirmDelete) {
        this.stableService.deleteStable(this.stable._id).subscribe(() => {
          alert('Stable deleted successfully.');
          this.router.navigate(['/stables']);
        });
      }
    }
  }  
}

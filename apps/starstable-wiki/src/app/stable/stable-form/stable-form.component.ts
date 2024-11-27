import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Stable } from 'libs/shared/api/src/lib/models/stable.interface';  // Import the Stable model
import { StableService } from 'libs/shared/api/src/lib/services/stable.service';  // Import the StableService
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-stable-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],  // Add HttpClientModule here
  templateUrl: './stable-form.component.html',
  styleUrls: ['./stable-form.component.css'],
})
export class StableFormComponent implements OnInit {
  stable: Stable = { id: '', name: '', location: '' };  // Stable object

  constructor(
    private stableService: StableService,  // Inject the StableService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.stableService.getStableById(id).subscribe((data) => (this.stable = data));  // Fetch the stable data by ID if it exists
    }
  }

  onSubmit(): void {
    if (this.stable.id) {
      this.stableService.updateStable(this.stable.id, this.stable).subscribe(() => {
        this.router.navigate(['/stables']);
      });
    } else {
      this.stableService.createStable(this.stable).subscribe(() => {
        console.log(this.stable);
        this.router.navigate(['/stables']);
      });
    }
  }
}

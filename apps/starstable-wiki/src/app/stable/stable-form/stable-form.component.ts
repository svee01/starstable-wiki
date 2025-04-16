import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreateStableDto, Stable, StableService } from '@starstable-wiki/shared/api';

@Component({
  selector: 'app-stable-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './stable-form.component.html',
  styleUrls: ['./stable-form.component.css'],
})
export class StableFormComponent implements OnInit {
  stable: Stable = { _id: '', name: '', location: '' };

  constructor(
    private stableService: StableService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.stableService.getStableById(id).subscribe((data) => (this.stable = data));
    }
  }

  onSubmit(): void {
    const stableDto: CreateStableDto = {
      name: this.stable.name,
      location: this.stable.location,
    };

    if (this.stable._id) {
      this.stableService.updateStable(this.stable._id, stableDto).subscribe(() => {
        this.router.navigate(['/stables']);
      });
    } else {
      this.stableService.createStable(stableDto).subscribe(() => {
        this.router.navigate(['/stables']);
      });
    }
  }
}
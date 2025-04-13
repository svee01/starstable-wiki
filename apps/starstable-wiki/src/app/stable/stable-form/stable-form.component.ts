import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StableService, Stable } from '@starstable-wiki/shared/api';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    if (this.stable._id) {
      this.stableService.updateStable(this.stable).subscribe(() => {
        this.router.navigate(['/stables']);
      });
    } else {
      this.stableService.createStable(this.stable).subscribe(() => {
        this.router.navigate(['/stables']);
      });
    }
  }  
}

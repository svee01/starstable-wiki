import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HorseService, Horse } from '@starstable-wiki/shared/api';

@Component({
  selector: 'app-horse-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './horse-details.component.html',
  styleUrls: ['./horse-details.component.css'],
})
export class HorseDetailsComponent implements OnInit {
  horse!: Horse;

  constructor(
    private route: ActivatedRoute,
    private horseService: HorseService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const horseId = this.route.snapshot.paramMap.get('id');
    if (horseId !== null) {
      this.horseService.getHorseById(horseId).subscribe((data) => {
        this.horse = data!;
      });
    } else {
      console.error('Horse ID is null');
    }
  }

  onDelete(): void {
    if (this.horse && this.horse._id) {
      const confirmDelete = confirm(`Are you sure you want to delete horse "${this.horse.name}"?`);
      if (confirmDelete) {
        this.horseService.deleteHorse(this.horse._id).subscribe(() => {
          alert('Horse deleted successfully.');
          this.router.navigate(['/horses']);
        });
      }
    }
  }
}

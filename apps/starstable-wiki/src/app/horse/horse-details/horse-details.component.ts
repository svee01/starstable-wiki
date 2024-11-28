import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Horse } from 'libs/shared/api/src/lib/models/horse.interface'; // Adjust import based on your project structure
import { HorseService } from 'libs/shared/api/src/lib/services/horse.service'; // Adjust import based on your project structure

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
    // Get the horse ID from the route parameters
    const horseId = this.route.snapshot.paramMap.get('id');
    
    if (horseId !== null) {
      // Fetch horse data using the HorseService
      this.horseService.getHorseById(horseId).subscribe((data) => {
        this.horse = data!;
      });
    } else {
      console.error('Horse ID is null');
    }
  }

  onDelete(horseId: string): void {
    if (this.horse && this.horse.id) {
      const confirmDelete = confirm(
        `Are you sure you want to delete the horse "${this.horse.name}"?`
      );
      if (confirmDelete) {
        this.horseService.deleteHorse(this.horse.id).subscribe(() => {
          alert('User deleted successfully.');
          this.router.navigate(['/horses']);
        });
      }
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Horse } from 'libs/shared/api/src/lib/models/horse.interface'; // Adjust import based on your project structure
import { HorseService } from 'libs/shared/api/src/lib/services/horse.service'; // Adjust import based on your project structure

@Component({
  selector: 'app-horse-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './horse-details.component.html',
  styleUrls: ['./horse-details.component.css'],
})
export class HorseDetailsComponent implements OnInit {
  horse!: Horse;

  constructor(
    private route: ActivatedRoute,
    private horseService: HorseService
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
}

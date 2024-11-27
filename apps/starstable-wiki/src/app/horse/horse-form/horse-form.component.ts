import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Horse } from 'libs/shared/api/src/lib/models/horse.interface'; // Adjust import according to your project structure
import { HorseService } from 'libs/shared/api/src/lib/services/horse.service'; // Adjust import according to your project structure
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';  // Import HttpClientModule

@Component({
  selector: 'app-horse-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule], // Add HttpClientModule here
  templateUrl: './horse-form.component.html',
  styleUrls: ['./horse-form.component.css'],
})
export class HorseFormComponent implements OnInit {
  horse: Horse = { id: '', name: '', breed: '', age: 0, characterId: '' }; // Adjust to match your Horse model

  constructor(
    private horseService: HorseService, // Assuming you have HorseService
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.horseService.getHorseById(id).subscribe((data) => (this.horse = data));
    }
  }

  onSubmit(): void {
    if (this.horse.id) {
      this.horseService.updateHorse(this.horse.id, this.horse).subscribe(() => {
        this.router.navigate(['/horses']);
      });
    } else {
      this.horseService.createHorse(this.horse).subscribe(() => {
        this.router.navigate(['/horses']);
      });
    }
  }
}

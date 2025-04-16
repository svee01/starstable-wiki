import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HorseService, Horse } from '@starstable-wiki/shared/api';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateHorseDto } from '@starstable-wiki/shared/api';

@Component({
  selector: 'app-horse-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './horse-form.component.html',
  styleUrls: ['./horse-form.component.css'],
})
export class HorseFormComponent implements OnInit {
  horse: Horse = { _id: '', name: '', breed: '', age: 0, characterId: '' };

  constructor(
    private horseService: HorseService,
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
    const horseDto: CreateHorseDto = {
      name: this.horse.name,
      breed: this.horse.breed,
      age: this.horse.age,
    };
  
    if (this.horse._id) {
      this.horseService.updateHorse(this.horse._id, horseDto).subscribe(() => {
        this.router.navigate(['/horses']);
      });
    } else {
      this.horseService.createHorse(horseDto).subscribe(() => {
        this.router.navigate(['/horses']);
      });
    }
  }
}
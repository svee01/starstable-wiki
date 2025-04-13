import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { HorseService, Horse } from '@starstable-wiki/shared/api';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

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
    if (this.horse._id) {
      this.horseService.updateHorse(this.horse._id, this.horse).subscribe(() => {
        this.router.navigate(['/horses']);
      });
    } else {
      this.horseService.createHorse(this.horse).subscribe(() => {
        this.router.navigate(['/horses']);
      });
    }
  }
}

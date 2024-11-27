import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Horse } from 'libs/shared/api/src/lib/models/horse.interface'; // Adjust import based on your project structure
import { HorseService } from 'libs/shared/api/src/lib/services/horse.service'; // Adjust import based on your project structure

@Component({
  selector: 'app-horse-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './horse-overview.component.html',
  styleUrls: ['./horse-overview.component.css'],
})
export class HorseOverviewComponent implements OnInit {
  horses: Horse[] = [];

  constructor(private horseService: HorseService) {
    this.horseService.getHorses().subscribe((data) => (this.horses = data));
  }

  ngOnInit(): void {}
}

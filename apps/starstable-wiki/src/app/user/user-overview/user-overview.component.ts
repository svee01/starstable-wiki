import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from 'libs/shared/api/src/lib/models/user.interface';
import { UserService } from 'libs/shared/api/src/lib/services/user.service';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css'],
})
export class UserOverviewComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }

  ngOnInit(): void {}
}

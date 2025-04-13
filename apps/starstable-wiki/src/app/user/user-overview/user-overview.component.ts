import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UserService, User } from '@starstable-wiki/shared/api';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css'],
})
export class UserOverviewComponent  {
  users: User[] = [];

  constructor(private userService: UserService) {
    this.userService.getUsers().subscribe((data) => (this.users = data));
  }
}

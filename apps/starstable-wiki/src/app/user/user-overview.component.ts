import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { User } from '@shared/api/models/user.interface';

@Component({
  selector: 'app-user-overview',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-overview.component.html',
  styleUrls: ['./user-overview.component.css'],
})
export class UserOverviewComponent implements OnInit {
  users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
  ];

  constructor() {}

  ngOnInit(): void {}
}

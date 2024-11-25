import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from 'libs/shared/api/src/lib/models/user.interface';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div *ngIf="user">
      <h2>{{ user.name }}</h2>
      <p>Email: {{ user.email }}</p>
      <p>Role: {{ user.role }}</p>
    </div>
  `,
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin', password: 'password' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User', password: 'password' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.user = this.users.find((user) => user.id === userId);
  }
}

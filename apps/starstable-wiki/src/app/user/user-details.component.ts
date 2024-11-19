import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from '@shared/api/models/user.interface';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user: User | undefined;
  users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Admin' },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'User' },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    this.user = this.users.find((user) => user.id === userId);
  }
}

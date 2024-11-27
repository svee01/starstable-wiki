import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { User } from 'libs/shared/api/src/lib/models/user.interface';
import { UserService } from 'libs/shared/api/src/lib/services/user.service';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user!: User;
  users: User[] = [];

  constructor(private route: ActivatedRoute,
    private userService: UserService
  ) {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe((data) => (this.user = data));
    } else {
      // Handle the case where userId is null
      console.error('User ID is null');
    }
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    const foundUser = this.users.find((user) => user.id === userId);
    if (foundUser) {
      this.user = foundUser;
    } 
  }
}

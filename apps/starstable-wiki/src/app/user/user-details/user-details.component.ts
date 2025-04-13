import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { UserService, User } from '@starstable-wiki/shared/api';

@Component({
  selector: 'app-user-details',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css'],
})
export class UserDetailsComponent implements OnInit {
  user!: User;
  users: User[] = [];

  constructor(private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId !== null) {
      this.userService.getUserById(userId).subscribe((data) => (this.user = data));
    } else {
      console.error('User ID is null');
    }
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    const foundUser = this.users.find((user) => user._id === userId);
    if (foundUser) {
      this.user = foundUser;
    } 
  }

  onDelete(userId: string): void {
    const confirmDelete = confirm(
      `Are you sure you want to delete the user "${this.user.name}"?`
    );
    if (confirmDelete) {
      this.userService.deleteUser(userId).subscribe(() => {
        alert('User deleted successfully.');
        this.router.navigate(['/users']);
      });
    }
  }  
}

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserService, User } from '@starstable-wiki/shared/api';
import { CreateUserDto } from '@starstable-wiki/shared/api';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnInit {
  user: User = { _id: '', name: '', email: '', role: '', password: '' };
  dtoUser: CreateUserDto = { name: '', email: '', role: '', password: '' };

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.userService.getUserById(id).subscribe((data) => (this.user = data));
    }
  }

  onSubmit(): void {
    this.dtoUser.email = this.user.email;
    this.dtoUser.name = this.user.name;
    this.dtoUser.role = this.user.role;
    this.dtoUser.password = this.user.password;
    
    console.log('Form submitted:', this.user);
    console.log('DTO User:', this.dtoUser);

    if (this.user._id) {
      this.userService.updateUser(this.dtoUser).subscribe(() => {
        this.router.navigate(['/users']);
      });
    } else {
      this.userService.addUser(this.user).subscribe(() => {
        this.router.navigate(['/users']);
      });
    }
  }
}

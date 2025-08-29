import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-list.html',
  styleUrls: ['./user-list.scss']
})
export class UserListComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(data => this.users = data);
  }

  deleteUser(id: number | undefined) {
    if (!id) return;
    if (confirm("Are you sure you want to delete this user?")) {
      this.userService.deleteUser(id).subscribe(() => this.loadUsers());
    }
  }

  goToNewUser() {
    this.router.navigate(['/users/new']);
  }

  goToUserDetail(id: number | undefined) {
    if (id) {
      this.router.navigate([`/users/${id}`]);
    }
  }
}



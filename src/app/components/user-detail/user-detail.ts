import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService, User } from '../../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-detail.html',
  styleUrls: ['./user-detail.scss']
})
export class UserDetailComponent implements OnInit {
  user: User = { name: '', email: '', phone: '',password:'' };
  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.userService.getUserById(this.userId).subscribe(data => this.user = data);
  }

  updateUser() {
    this.userService.updateUser(this.userId, this.user).subscribe(() => {
      alert("User updated successfully!");
      this.router.navigate(['/users']);
    });
  }
}


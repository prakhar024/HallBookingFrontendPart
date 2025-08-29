import { Component } from '@angular/core';
import { UserService, User } from '../../services/user';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.scss']
})
export class UserFormComponent {
  user: User = { name: '', email: '', phone: '', password: '' };

  
  nameError: string = '';
  emailError: string = '';
  phoneError: string = '';
  passwordError: string = '';

  constructor(private userService: UserService, private router: Router) {}

  validateInputs(): boolean {
    let isValid = true;

    
    if (!this.user.name || this.user.name.trim().length < 3) {
      this.nameError = "Name must be at least 3 characters.";
      isValid = false;
    } else {
      this.nameError = "";
    }

    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!this.user.email || !emailPattern.test(this.user.email)) {
      this.emailError = "Enter a valid email address.";
      isValid = false;
    } else {
      this.emailError = "";
    }

    
    const phonePattern = /^[0-9]{10}$/;
    if (!this.user.phone || !phonePattern.test(this.user.phone)) {
      this.phoneError = "Phone number must be 10 digits.";
      isValid = false;
    } else {
      this.phoneError = "";
    }

    
    if (!this.user.password || this.user.password.length < 6) {
      this.passwordError = "Password must be at least 6 characters.";
      isValid = false;
    } else {
      this.passwordError = "";
    }

    return isValid;
  }

  submitUser() {
    if (!this.validateInputs()) return;

    this.userService.createUser(this.user).subscribe(() => {
      alert("User created successfully!");
      this.router.navigate(['/users']);
    });
  }
}


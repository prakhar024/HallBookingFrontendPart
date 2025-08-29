import { Component } from '@angular/core';
import { BookingService, Booking } from '../../services/booking';
import { HallService, Hall } from '../../services/hall';
import { UserService, User } from '../../services/user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './booking-form.html',
  styleUrls: ['./booking-form.scss']
})
export class BookingFormComponent {
  booking: Booking = {
    hallId: 0,
    userId: 0,
    bookingDate: '',
    customerName: '',
    customerPhone: '',
    eventDate: ''
  };

  halls: Hall[] = [];
  users: User[] = [];

  
  eventDateError: string | null = null;
  bookingDateError: string | null = null;
  phoneError: string | null = null;

  constructor(
    private bookingService: BookingService,
    private hallService: HallService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.hallService.getHalls().subscribe(data => (this.halls = data));
    this.userService.getUsers().subscribe(data => (this.users = data));
  }

  
  validateInputs(): boolean {
    let valid = true;
    this.eventDateError = null;
    this.bookingDateError = null;
    this.phoneError = null;

    
    if (!/^\d{10}$/.test(this.booking.customerPhone)) {
      this.phoneError = 'Phone number must be 10 digits';
      valid = false;
    }

    
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const eventDate = new Date(this.booking.eventDate);
    const bookingDate = new Date(this.booking.bookingDate);

    if (eventDate < today) {
      this.eventDateError = 'Event date cannot be in the past';
      valid = false;
    }

    if (bookingDate > eventDate) {
      this.bookingDateError = 'Booking date cannot be after event date';
      valid = false;
    }

    return valid;
  }

  submitBooking() {
    if (!this.booking.hallId || !this.booking.userId || !this.booking.bookingDate || !this.booking.customerName) {
      alert('Please fill all fields!');
      return;
    }

    if (!this.validateInputs()) {
      return; 
    }

    this.bookingService
      .addBooking({
        hallId: this.booking.hallId,
        userId: this.booking.userId,
        bookingDate: this.booking.bookingDate,
        customerName: this.booking.customerName,
        customerPhone: this.booking.customerPhone,
        eventDate: this.booking.eventDate,
        status: 'Pending'
      })
      .subscribe(() => {
        alert('Booking successful!');
      });
  }
}

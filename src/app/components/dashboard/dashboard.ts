
import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})
export class DashboardComponent implements OnInit {
  bookings: any[] = [];
  upcomingBookings: number = 0;
  pendingBookings: number = 0;

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings() {
    this.bookingService.getBookings().subscribe((data: any[]) => {
      this.bookings = data;

      
      const today = new Date();
      this.upcomingBookings = this.bookings.filter(b =>
        b.bookingDate && new Date(b.bookingDate) > today
      ).length;

      
      this.pendingBookings = this.bookings.filter(b =>
        b.status?.toLowerCase() === 'pending'
      ).length;
    });
  }

  deleteBooking(id: number) {
    this.bookingService.deleteBooking(id).subscribe(() => {
      this.bookings = this.bookings.filter(b => b.id !== id);
      this.loadBookings(); 
    });
  }

  
  confirmBooking(booking: any, i: number) {
  const updatedBooking = {
    hallId: booking.hall.id,
    userId: booking.user.id,
    customerName: booking.customerName,
    customerPhone: booking.customerPhone,
    eventDate: booking.eventDate,
    bookingDate: booking.bookingDate,
    status: "Confirmed"
  };

  this.bookingService.updateBooking(booking.id, updatedBooking).subscribe(() => {
    this.bookings[i].status = "Confirmed";
  });
}

}

import { Component, OnInit } from '@angular/core';
import { HallService, Hall } from '../../services/hall';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-hall-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './hall-list.html',
  styleUrls: ['./hall-list.scss']
})
export class HallListComponent implements OnInit {
  halls: Hall[] = [];

  constructor(private hallService: HallService) {}

  ngOnInit(): void {
    this.hallService.getHalls().subscribe(data => {
      this.halls = data;
    });
  }
}


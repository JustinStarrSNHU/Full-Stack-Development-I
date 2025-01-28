import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-delete-trip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-trip.component.html',
  styleUrl: './delete-trip.component.css'
})

export class DeleteTripComponent implements OnInit{
  
  trip!: Trip;
  submitted = false;
  message : string = '';

  constructor(
    private router: Router,
    private tripDataService: TripDataService
  ) {}

  private deleteTripDocument(): void {
    let tripCode = localStorage.getItem('tripCode');
    if (!tripCode) {
      alert("Something wrong, couldn't find where i stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    this.tripDataService.getTrip(tripCode)
    .subscribe({
      next: (value: any) => {
        this.trip = value;
        if(!value) {
          this.message = 'No Trip Retrieved!';
        }
        else {
          this.message = 'Trip: ' + tripCode + ' retrieved';
        }
        console.log(this.message);
      },
      error: (error: any) => {
        console.log('Error: ' + error);
      }
    })
    this.tripDataService.deleteTrip(tripCode)
      .subscribe({
        next: (value: any) => {
          this.trip = value;
          if(!value) {
            this.message = 'No Trip Retrieved!';
          }
          else {
            this.message = 'Trip: ' + tripCode + ' retrieved';
          }
        },
        error: (error: any) => {
          console.log('Error: ' + error);
        }
      })
  }

  ngOnInit(): void {
    console.log('ngOnInit');
    this.deleteTripDocument();
    this.router.navigate(['']);
  }

}

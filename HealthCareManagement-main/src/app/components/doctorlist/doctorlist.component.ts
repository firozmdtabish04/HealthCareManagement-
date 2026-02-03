import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';

@Component({
  selector: 'app-doctorlist',
  templateUrl: './doctorlist.component.html',
  styleUrls: ['./doctorlist.component.css']
})
export class DoctorlistComponent implements OnInit {

  // Doctor List Observable
  doctors!: Observable<Doctor[]>;

  // Search Text
  searchText: string = '';

  constructor(private _service: DoctorService) { }

  ngOnInit(): void {
    this.loadDoctors();
  }

  // ⭐ Load Doctors
  loadDoctors(): void {
    this.doctors = this._service.getDoctorList();
  }

  // ⭐ Search Filter Function
  filterDoctor(doctor: Doctor): boolean {

    if (!this.searchText || this.searchText.trim() === '')
    {
      return true;
    }

    const search = this.searchText.toLowerCase();

    return (
      doctor.doctorname?.toLowerCase().includes(search) ||
      doctor.email?.toLowerCase().includes(search) ||
      doctor.specialization?.toLowerCase().includes(search) ||
      doctor.gender?.toLowerCase().includes(search)
    );
  }

  // ⭐ Status Helper (Optional UI Usage)
  getDoctorStatus(status: string | undefined): string {

    switch (status)
    {
      case 'accept':
        return 'Approved Doctor';

      case 'false':
        return 'Approval Pending';

      case 'reject':
        return 'Not Approved';

      default:
        return 'Unknown Status';
    }
  }

  // ⭐ Status CSS Class Helper
  getStatusClass(status: string | undefined): string {

    switch (status)
    {
      case 'accept':
        return 'approved';

      case 'false':
        return 'pending';

      case 'reject':
        return 'rejected';

      default:
        return '';
    }
  }

}

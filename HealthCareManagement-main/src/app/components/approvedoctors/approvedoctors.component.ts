import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Doctor } from 'src/app/models/doctor';
import { DoctorService } from 'src/app/services/doctor.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-approvedoctors',
  templateUrl: './approvedoctors.component.html',
  styleUrls: ['./approvedoctors.component.css']
})
export class ApprovedoctorsComponent implements OnInit {

  doctors!: Observable<Doctor[]>;
  searchText: string = '';

  currRole: string = '';
  loggedUser: string = '';

  constructor(private _service: DoctorService) { }

  ngOnInit(): void {

    this.loggedUser = sessionStorage.getItem('loggedUser') || '';
    this.currRole = sessionStorage.getItem('ROLE') || '';

    this.loadDoctors();
  }

  loadDoctors() {
    this.doctors = this._service.getDoctorList();
  }

  // ⭐ Accept Doctor
  acceptRequest(email: string) {

    this._service.acceptRequestForDoctorApproval(email).subscribe(() => {
      alert('Doctor Approved Successfully');
      this.loadDoctors();
    });
  }

  // ⭐ Reject Doctor
  rejectRequest(email: string) {

    this._service.rejectRequestForDoctorApproval(email).subscribe(() => {
      alert('Doctor Rejected');
      this.loadDoctors();
    });
  }

  // ⭐ Search Filter
  filterDoctor(doctor: Doctor): boolean {

    if (!this.searchText) return true;

    const search = this.searchText.toLowerCase();

    return (
      doctor.doctorname?.toLowerCase().includes(search) ||
      doctor.email?.toLowerCase().includes(search) ||
      doctor.specialization?.toLowerCase().includes(search)
    );
  }

  // ⭐ Status Label
  getStatusLabel(status?: string) {

    switch (status)
    {
      case 'accept': return 'Accepted';
      case 'reject': return 'Rejected';
      default: return 'Pending';
    }
  }

  // ⭐ Status Class
  getStatusClass(status?: string) {

    switch (status)
    {
      case 'accept': return 'accepted';
      case 'reject': return 'rejected';
      default: return 'pending';
    }
  }

}

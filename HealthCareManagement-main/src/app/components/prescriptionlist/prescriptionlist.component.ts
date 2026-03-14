import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Prescription } from 'src/app/models/prescription';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-prescriptionlist',
  templateUrl: './prescriptionlist.component.html',
  styleUrls: ['./prescriptionlist.component.css']
})
export class PrescriptionlistComponent implements OnInit {

  prescriptionlist!: Observable<Prescription[]>;

  name: string = '';
  showPrescription = false;
  notFound = false;

  constructor(private _service: UserService) { }

  ngOnInit(): void { }

  searchPrescription() {

    this._service.getPrescriptionsByName(this.name).subscribe(data => {

      if (data.length === 0)
      {

        this.notFound = true;
        this.showPrescription = false;

      }
      else
      {

        this.notFound = false;
        this.showPrescription = true;

        // store result instead of calling API again
        this.prescriptionlist = of(data);

      }

    });

  }

  onPrint() {
    window.print();
  }

}
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { faArrowLeft, faBell } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css'],
})
export class UploadComponent {
  form: FormGroup | null = null;
  faArrowLeft = faArrowLeft;
  faBell = faBell;


  constructor(private fb: FormBuilder) {}

  fillForm(response: any): any {
    this.form = this.fb.group({
      name: response.name,
      location: response.location_in_building,
      manufacturer: response.manufacturer,
      model: response.model,
      serialNumber: response.serial_number,
      equipmentType: response.equipment_type,
      size: response.size,
      age: response.age,
      type_of_material: response.type_of_material,
      condition: response.condition,
      surveyor_comments: response.surveyor_comments,
    });
  }
}
import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewBugMatSelectOption} from "../interfaces/new-bug-mat-select-option";

@Component({
  selector: 'app-bug-create',
  templateUrl: './bug-create.component.html',
  styleUrls: ['./bug-create.component.scss']
})
export class BugCreateComponent implements OnInit {
  myForm = new FormGroup({
    title: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    priority: new FormControl('', Validators.required),
    reporter: new FormControl('', Validators.required),
    status: new FormControl('')
  });

  matSelectOption: NewBugMatSelectOption = {
    priority: ['Minor', 'Major', 'Critical'],
    reporter: ['QA', 'PO', 'DEV'],
    status: ['For Review', 'Done', 'Rejected']
  };
  constructor() {

  }

  ngOnInit(): void {
  }

  formSubmit(myForm: FormGroup){}

}

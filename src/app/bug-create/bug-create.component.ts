import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewBugMatSelectOption} from "../interfaces/new-bug-mat-select-option";
import {BugsService} from "../services/bugs.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BugDto} from "../DTOs/bug-dto";

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

  private bugId!:string;

  constructor(private bugsService: BugsService, private route: ActivatedRoute, private router: Router) {
    this.bugId = this.route.snapshot.queryParams['id'];
  }

  ngOnInit(): void {

  }

  formSubmit(myForm: FormGroup){
    if(myForm.invalid){
      return;
    }
    myForm.disable();
    const title = myForm.get('title')?.value;
    const description = myForm.get('description')?.value;
    const priority = myForm.get('priority')?.value;
    const reporter = myForm.get('reporter')?.value;
    const status = myForm.get('status')?.value;
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const formattedDate = new Date().toLocaleString('en-US', options);
    this.bugsService.createBug(new BugDto(this.bugId, title, description, priority, reporter, status, formattedDate, []))
      .subscribe({
        next:() => {},
        error:(err) => {
          console.log(err);
        },
        complete: () => {
          this.router.navigate(['/bugs']);
        }
      });
  }

}

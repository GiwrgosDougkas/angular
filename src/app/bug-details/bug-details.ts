import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {NewBugMatSelectOption} from "../interfaces/new-bug-mat-select-option";
import {BugsService} from "../services/bugs.service";
import {ActivatedRoute, Router} from "@angular/router";
import {BugDto} from "../DTOs/bug-dto";

@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.html',
  styleUrls: ['./bug-details.scss']
})
export class BugDetails implements OnInit {
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

  private bugId!: string;
  private isEditing = false;
  bug: BugDto = new BugDto("", "", "", "", "", "", "", []);

  constructor(private bugsService: BugsService, private route: ActivatedRoute, private router: Router) {
    this.bugId = this.route.snapshot.queryParams['id'];
    this.isEditing = this.bugId ? true : false;
  }

  ngOnInit(): void {
    if (this.isEditing) {
      this.bugsService.getById(this.bugId).subscribe(resp => {
        this.bug = resp
      })
    }
  }

  formSubmit(myForm: FormGroup) {
    if (myForm.invalid) {
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
    if (this.isEditing) {
      this.bugsService.editBug(this.bug).subscribe(this.responseObserver);
      return;
    }
    this.bugsService.createBug(new BugDto(this.bugsService.nextCreatedId.toString(), title, description, priority, reporter, status, formattedDate, []))
      .subscribe(this.responseObserver);
  }

  private responseObserver = {
    next: () => {
    },
    error: (err: any) => {
      console.log(err);
    },
    complete: () => {
      this.router.navigate(['/bugs']);
    }
  }
}

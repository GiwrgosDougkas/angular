import { Component, OnInit } from '@angular/core';
import {BugsService} from "../services/bugs.service";
import {BugDto} from "../DTOs/bug-dto";
import {SimpleDto} from "../DTOs/simple-dto";
import {ColumnDefinitions} from "../interfaces/column-definitions";
import {SelectionModel} from "@angular/cdk/collections";
import {MatTableDataSource} from "@angular/material/table";
import {Router} from "@angular/router";

@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent implements OnInit {

  columnDefinitions: ColumnDefinitions[] = [
    {def: 'select', label: 'select'},
    {def: 'title', label: 'Title'},
    {def: 'priority', label: 'Priority'},
    {def: 'reporter', label: 'Reporter'},
    {def: 'created', label: 'Date created'},
    {def: 'status', label: 'Status'}
  ];
  columns:string[] = new Array<string>();
  selection = new SelectionModel<BugDto>(true);
  dataSource = new MatTableDataSource<BugDto>([]);

  constructor(private bugsService : BugsService, private router: Router) {
    this.columnDefinitions.forEach(e=>{
      this.columns.push(e.def)
    })
  }

  ngOnInit(): void {
    this.bugsService.getAll().subscribe({
      next: (value) =>{
        this.dataSource.data = value;
      },
      error: (onError) => {
        console.error(onError);
      }
    })
  }

  deleteBug() {
    const selectedLength = this.selection.selected.length
    if(selectedLength == 0) {
      return;
    }
    this.selection.selected.forEach(element=>{
      this.bugsService.deleteById(element.id).subscribe({
          next:() => {},
          error:(err) => {
            console.log(err);
          },
          complete: () => {
              this.dataSource.data.splice(this.dataSource.data.indexOf(element), 1);
              this.dataSource._updateChangeSubscription();
          }
        });
    });
  }

  isAllSelected(): boolean{
    const numSelected =
      this.selection.selected.length;
    const numRows = this.dataSource.data ? this.dataSource.data.length : 0;
    return numSelected === numRows;
  }

  masterToggle(): void {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }
}

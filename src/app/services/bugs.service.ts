import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {BugDto} from "../DTOs/bug-dto";
import {SimpleDto} from "../DTOs/simple-dto";

@Injectable({
  providedIn: 'root'
})
export class BugsService {
  private readonly all!: string;
  private readonly main!: string;
  private readonly deleteUrl!: string;

  constructor(private http: HttpClient) {
    this.main = 'http://localhost:3000/'
    this.all = 'bugs';
    this.deleteUrl= this.main + this.all + '/';
  }

  getAll(): Observable<BugDto[]> {
    return this.http.get<BugDto[]>(this.main + this.all);
  }

  deleteById(id: string): Observable<any> {
    return this.http.delete(this.deleteUrl + id);
  }
}

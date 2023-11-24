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
  private readonly bugUrl!: string;
  private _nextCreatedId = 0

  constructor(private http: HttpClient) {
    this.main = 'http://localhost:3000/'
    this.all = 'bugs';
    this.bugUrl= this.main + this.all + '/';
  }

  getAll(): Observable<BugDto[]> {
    return this.http.get<BugDto[]>(this.main + this.all);
  }

  getById(id: string): Observable<BugDto> {
    return this.http.get<BugDto>(this.bugUrl + id);
  }


  deleteById(id: string): Observable<any> {
    return this.http.delete(this.bugUrl + id);
  }

  createBug(dto: BugDto): Observable<any> {
    return this.http.post<BugDto>(this.main + this.all, dto);
  }

  editBug(dto:BugDto): Observable<any> {
    return this.http.put(this.bugUrl + dto.id, dto)
  }


  get nextCreatedId(): number { return this._nextCreatedId; }

  set nextCreatedId(value: number) { this._nextCreatedId = value; }
}

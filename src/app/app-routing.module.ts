import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BugsComponent} from "./bugs/bugs.component";
import {BugDetails} from "./bug-details/bug-details";

const routes: Routes = [
  { path: 'bugs', component: BugsComponent },
  { path: 'create', component: BugDetails },
  { path: 'edit/:id', component: BugDetails },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

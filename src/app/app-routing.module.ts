import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BugsComponent} from "./bugs/bugs.component";
import {BugCreateComponent} from "./bug-create/bug-create.component";

const routes: Routes = [
  { path: 'bugs', component: BugsComponent },
  { path: 'create/:id', component: BugCreateComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

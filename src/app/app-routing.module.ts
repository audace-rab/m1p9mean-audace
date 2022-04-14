import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './modules/front/home/home.component';
import { PlatsCommandeComponent } from './modules/front/plats-commande/plats-commande.component';


const routes: Routes = [
  { path: "", redirectTo: "front", pathMatch: "full"},
  { path: 'admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule) },
  { path: 'front', component : HomeComponent },
  { path: 'front/commande', component : PlatsCommandeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

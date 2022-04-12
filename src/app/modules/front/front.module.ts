import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FrontRoutingModule } from './front-routing.module';
import { FrontComponent } from './front.component';
import { ListRestoComponent } from './list-resto/list-resto.component';
import { PlatsCommandeComponent } from './plats-commande/plats-commande.component';


@NgModule({
  declarations: [
    FrontComponent,
    ListRestoComponent,
  ],
  imports: [
    CommonModule,
    FrontRoutingModule
  ],
  providers: [],
  bootstrap: [FrontComponent]
})
export class FrontModule { }

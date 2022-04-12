import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from '../app/modules/admin/page/login/login.component';
import { RegisterComponent } from '../app/modules/admin/page/register/register.component';
import { authInterceptorProviders } from './service/auth.interceptor';

import { HeaderNavbarComponent } from './modules/front/header-navbar/header-navbar.component';
import { CardsComponent } from './modules/front/cards/cards.component';
import { DetailsProductsComponent } from './modules/front/details-products/details-products.component';
import { LoginInscriptionComponent } from './modules/front/login-inscription/login-inscription.component';
import { ModalSocialComponent } from './modules/front/modal-social/modal-social.component';
import { BannerComponent } from './modules/front/banner/banner.component';
import { HeaderBannerComponent } from './modules/front/header-banner/header-banner.component';
import { PromotionSectionComponent } from './modules/front/promotion-section/promotion-section.component';
import { CardDesktopComponent } from './modules/front/card-desktop/card-desktop.component';
import { MainComponent } from './modules/front/main/main.component';
import { MainDataComponent } from './modules/front/main-data/main-data.component';
import { ListProduitComponent } from './modules/front/list-produit/list-produit.component';
import { SocialComponent } from './modules/front/social/social.component';
import { FooterComponent } from './modules/front/footer/footer.component';
import { HomeComponent } from './modules/front/home/home.component';
import { ListRestoComponent } from './modules/front/list-resto/list-resto.component';
import { PlatsCommandeComponent } from './modules/front/plats-commande/plats-commande.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderNavbarComponent,
    CardsComponent,
    DetailsProductsComponent,
    LoginInscriptionComponent,
    ModalSocialComponent,
    BannerComponent,
    HeaderBannerComponent,
    PromotionSectionComponent,
    CardDesktopComponent,
    MainComponent,
    MainDataComponent,
    ListProduitComponent,
    SocialComponent,
    FooterComponent,
    HomeComponent,
    PlatsCommandeComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    authInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

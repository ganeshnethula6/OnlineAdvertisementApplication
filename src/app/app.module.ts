import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { MenuComponent } from './home-page/menu/menu.component';
import { SignInComponent } from './home-page/sign-in/sign-in.component';
import { SignUpComponent } from './home-page/sign-up/sign-up.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UserDashboardComponent } from './home-page/dashboard/user-dashboard/user-dashboard.component';
import { ClientDashboardComponent } from './home-page/dashboard/client-dashboard/client-dashboard.component';
import { AdminDashboardComponent } from './home-page/dashboard/admin-dashboard/admin-dashboard.component';
import { ClientAdvertiseDialogboxComponent } from './home-page/dashboard/client-dashboard/client-advertise-dialogbox/client-advertise-dialogbox.component';
import { DataTableComponent } from './home-page/dashboard/client-dashboard/data-table/data-table.component';
import { AgGridModule } from 'ag-grid-angular';
import { ButtonCellRendererComponent } from './home-page/dashboard/grid-components/button-cell-renderer/button-cell-renderer.component';
import { HyperlinkCellRendererComponent } from './home-page/dashboard/grid-components/hyperlink-cell-renderer/hyperlink-cell-renderer.component';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';
import { AlertDialogComponent } from './home-page/dialog/alert-dialog/alert-dialog.component';
import { UserTableComponent } from './home-page/tables/user-table/user-table.component';
import { PromotionTableComponent } from './home-page/tables/promotion-table/promotion-table.component';
import { PromotionDialogComponent } from './home-page/dialog/promotion-dialog/promotion-dialog.component';
import { RegistrationDialogComponent } from './home-page/dialog/registration-dialog/registration-dialog.component';
import { LoginDialogComponent } from './home-page/dialog/login-dialog/login-dialog.component';
import { ProfileDialogComponent } from './home-page/dialog/profile-dialog/profile-dialog.component';
import { PromotionUpdateDialogComponent } from './home-page/dialog/promotion-update-dialog/promotion-update-dialog.component';
import { UserUpdateDialogComponent } from './home-page/dialog/user-update-dialog/user-update-dialog.component';
import { MenuDialogComponent } from './home-page/dialog/menu-dialog/menu-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    MenuComponent,
    SignInComponent,
    SignUpComponent,
    UserDashboardComponent,
    ClientDashboardComponent,
    AdminDashboardComponent,
    ClientAdvertiseDialogboxComponent,
    DataTableComponent,
    AlertDialogComponent,
    UserTableComponent,
    PromotionTableComponent,
    PromotionDialogComponent,
    RegistrationDialogComponent,
    LoginDialogComponent,
    ProfileDialogComponent,
    PromotionUpdateDialogComponent,
    UserUpdateDialogComponent,
    MenuDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
  AngularMaterialModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AgGridModule.withComponents([ButtonCellRendererComponent,
      HyperlinkCellRendererComponent]),
      NgxMatFileInputModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports:[AngularMaterialModule]
})
export class AppModule { }

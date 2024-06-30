import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserAccountModule } from './components/user-account/user-account.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginModule } from './components/login/login.module';
import { NotFoundModule } from './components/not-found/not-found.module';
import { ForgotPasswordModule } from './components/forgot-password/forgot-password.module';
import { UploadResourceDialogModule } from './components/upload-resource-dialog/upload-resource-dialog.module';
import { HttpClientModule } from '@angular/common/http';
import { EditResourceModule } from './components/edit-resource/edit-resource.module';
import { DeletePromptModule } from './components/delete-prompt/delete-prompt.module';
import { DeleteCollectionPromptModule } from './components/delete-collection-prompt/delete-collection-prompt.module';
import { TryToExtractComponent } from './components/try-to-extract/try-to-extract.component';
import { TryToExtractModule } from './components/try-to-extract/try-to-extract.module';
import { EditCollectionModule } from './components/edit-collection/edit-collection.module';
import { AdminComponent } from './components/admin/admin.component';
import { AdminModule } from './components/admin/admin.module';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ResetPasswordModule } from './components/reset-password/reset-password.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ChangePasswordModule } from './components/change-password/change-password.module';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { EditUserModule } from './components/edit-user/edit-user.module';
import { DeleteAccountComponent } from './components/delete-account/delete-account.component';
import { DeleteAccountModule } from './components/delete-account/delete-account.module';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AddAdminModule } from './components/add-admin/add-admin.module';
import { AddAlgorithmComponent } from './components/add-algorithm/add-algorithm.component';
import { AddAlgorithmModule } from './components/add-algorithm/add-algorithm.module';
import { GetMoreInfoComponent } from './components/get-more-info/get-more-info.component';
import { GetMoreInfoModule } from './components/get-more-info/get-more-info.module';
import { MarkInactiveComponent } from './components/mark-inactive/mark-inactive.component';
import { MarkInactiveModule } from './components/mark-inactive/mark-inactive.module';
import { SeeResourcesComponent } from './components/see-resources/see-resources.component';
import { SeeResourcesModule } from './components/see-resources/see-resources.module';
import { AlgInfoComponent } from './components/alg-info/alg-info.component';
import { AlgInfoModule } from './components/alg-info/alg-info.module';
import { SeeMoreComponent } from './components/see-more/see-more.component';
import { SeeMoreModule } from './components/see-more/see-more.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    AppRoutingModule,
    UserAccountModule,
    LoginModule,
    ForgotPasswordModule,
    NotFoundModule,
    NgbModule,
    UploadResourceDialogModule,
    HttpClientModule,
    EditResourceModule,
    EditCollectionModule,
    DeletePromptModule,
    DeleteCollectionPromptModule,
    TryToExtractModule,
    AdminModule,
    ResetPasswordModule,
    ChangePasswordModule,
    EditUserModule,
    DeleteAccountModule,
    AddAdminModule,
    AddAlgorithmModule,
    GetMoreInfoModule,
    MarkInactiveModule,
    SeeResourcesModule,
    AlgInfoModule,
    SeeMoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

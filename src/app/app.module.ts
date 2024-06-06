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
    DeletePromptModule,
    DeleteCollectionPromptModule,
    TryToExtractModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

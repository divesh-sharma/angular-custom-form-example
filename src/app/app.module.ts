import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ProfileFormComponent } from './profile-form/profile-form.component';
import { PasswordFormComponent } from './password-form/password-form.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule,ReactiveFormsModule ],
  declarations: [ AppComponent, HelloComponent, ProfileFormComponent, PasswordFormComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }

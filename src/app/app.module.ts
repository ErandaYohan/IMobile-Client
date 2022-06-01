import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { UserService } from './shared/user.service';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { CategiesComponent } from './admin-panel/categies/categies.component';
import { AddEditCateComponent } from './admin-panel/categies/add-edit-cate/add-edit-cate.component';
import { ShowCateComponent } from './admin-panel/categies/show-cate/show-cate.component';
import { ProductComponent } from './admin-panel/product/product.component';
import { AddEditProductComponent } from './admin-panel/product/add-edit-product/add-edit-product.component';
import { ShowProductComponent } from './admin-panel/product/show-product/show-product.component';
import { CartComponent } from './home/cart/cart.component';
import { LoginRegisterComponent } from './user/login-register/login-register.component';



@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    AdminPanelComponent,
    ForbiddenComponent,
    CategiesComponent,
    AddEditCateComponent,
    ShowCateComponent,
    ProductComponent,
    AddEditProductComponent,
    ShowProductComponent,
    CartComponent,
    LoginRegisterComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar: true
    }),
    FormsModule
  ],
  providers: [UserService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }

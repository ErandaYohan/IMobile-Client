import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { RegistrationComponent } from './user/registration/registration.component';
import { LoginComponent } from './user/login/login.component';
import { HomeComponent } from './home/home.component';
import { RoleGuard } from './auth/role.guard';
import { CategiesComponent } from './admin-panel/categies/categies.component';
import { ProductComponent } from './admin-panel/product/product.component';
import { CartComponent } from './home/cart/cart.component';
import { LoginRegisterComponent } from './user/login-register/login-register.component';

const routes: Routes = [
  {path:'',redirectTo:'/user/login',pathMatch:'full'},
  {
    path: 'user', component: UserComponent,
    children: [
      { path: 'registration', component: RegistrationComponent },
      { path: 'login', component: LoginComponent },
      
    ]
  },
  {path:'loginandRegister',component:LoginRegisterComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'forbidden',component:ForbiddenComponent},
  {
    path:'adminpanel',component:AdminPanelComponent,canActivate:[RoleGuard],
    children:[
      { path: 'category', component: CategiesComponent },
      { path: 'product', component: ProductComponent }
    ]
  },
  
  { path: 'cart', component: CartComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

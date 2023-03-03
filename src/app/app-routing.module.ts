import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { ShowdataComponent } from './showdata/showdata.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'signup',component:SignupComponent},
  {path: 'login',component:LoginComponent},
  {path: 'showdata',component:ShowdataComponent},
  {path: 'post', component:PostComponent},
  {path: '',redirectTo:'signup',pathMatch:'full'}  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

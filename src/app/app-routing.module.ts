import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'
import { HomeComponent } from './components/pages/home/home.component'
import { LoginComponent } from './components/pages/login/login.component'
import { MainLayoutComponent } from './components/layouts/main-layout/main-layout.component'
import { AuthLayoutComponent } from './components/layouts/auth-layout/auth-layout.component'
import { NotFoundComponent } from './components/pages/not-found/not-found.component'

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    children: [{ path: 'login', component: LoginComponent }],
  },
  { path: '**', component: NotFoundComponent },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

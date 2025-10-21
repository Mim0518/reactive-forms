import {Routes} from '@angular/router';
import {RegisterPage} from './pages/register-page/register-page';

export const authRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'signup', component: RegisterPage,
      },
      {
        path: '**', redirectTo: 'signup'
      }
    ]
  }
]

export default authRoutes;

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./form/form.module').then((m) => m.FormModule),
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    // scrollPositionRestoration : this for reset scroll when switch between components
    RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}

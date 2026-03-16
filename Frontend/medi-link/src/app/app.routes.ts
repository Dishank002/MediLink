import { Routes } from '@angular/router';

export const routes: Routes = [

{
 path: '',
 loadChildren: () =>
 import('./modules/home/home.module').then(m => m.HomeModule)
},

{
 path: 'auth',
 loadChildren: () =>
 import('./modules/auth/auth.module').then(m => m.AuthModule)
},

{
 path: 'patient',
 loadChildren: () =>
 import('./modules/patient/patient.module').then(m => m.PatientModule)
},

{
 path: 'doctor',
 loadChildren: () =>
 import('./modules/doctor/doctor.module').then(m => m.DoctorModule)
},

{
 path: 'lab',
 loadChildren: () =>
 import('./modules/lab/lab.module').then(m => m.LabModule)
},

{
 path: 'bloodbank',
 loadChildren: () =>
 import('./modules/bloodbank/bloodbank.module').then(m => m.BloodbankModule)
},

{
 path: 'admin',
 loadChildren: () =>
 import('./modules/admin/admin.module').then(m => m.AdminModule)
},

{
 path: '**',
 redirectTo: ''
}

];
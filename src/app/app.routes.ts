import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-pages/login-pages';
import { ContactsPage } from './pages/contacts-page/contacts-page';
import { ContactDetailsPage } from './pages/contact-details-pages/contact-details-pages';
import { LoggedLayout } from './layouts/logged-layout/logged-layout';
import { GroupsPage } from './pages/groups/groups';
import { RegisterPages } from './pages/register-pages/register-pages';
import { onlyPublicUserGuard } from './guards/only-public-user-guard';
import { onlyLoggedUserGuard } from './guards/only-logged-user-guard';
import { NewContactPages } from './pages/newcontact-pages/newcontact-pages';

export const routes: Routes = [
  {
    path: "login",
    component: LoginPage,
    canActivate: [onlyPublicUserGuard]
  },
  {
    path: "register",
    component: RegisterPages,
    canActivate: [onlyPublicUserGuard]
  },
  {
    path: "",
    component: LoggedLayout,
    canActivateChild: [onlyLoggedUserGuard],
    children: [
      {
        path: "",
        component: ContactsPage
      },
      {
        path: "contacts/new",
        component: NewContactPages
      },
      {
        path: "contacts/:idContacto",
        component: ContactDetailsPage
      },
      {
        path: "contacts/:idContacto/edit",
        component: NewContactPages
      },
      {
        path: "groups",
        component: GroupsPage
      },
    ]
  },

];
//importing all the essential modules
import { AuthGuard } from '../_guards/auth.guard';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from '../pages/pages.component';
import { AdminConfigComponent } from '../admin/adminconfig/adminconfig.component';
import { AdminPolicyComponent } from '../admin/adminpolicy/adminpolicy.component';
import { AdminNewsComponent } from '../admin/adminnews/adminnews.component';
import { AdminAboutComponent } from './adminabout/adminabout.component';
import { AdminStoryComponent } from './adminstory/adminstory.component';
import { SocialMediaComponent } from './socialmedia/socialmedia.component';
import { ManageAccessComponent } from './manageAccess/manageAccess.component';
import { SendPushComponent } from './sendPush/sendPush.component';
import { newPushComponent } from './sendPush/newPush/newPush.component';
import { addRolesComponent } from './manageAccess/addRoles/addRoles.component';
import { pushTargetedUserComponent } from './sendPush/targetedUser/targetedUser.component';
import { FAQComponent } from './adminfaq/adminfaq.component';
//=============== routing for user modules ======================
//=============== exporting the route to the main app =============
export const AdminRoutes: Routes = [

  {
    path: 'app',
    component: PagesComponent,
    children: [
      {
        path: 'terms',
        component: AdminConfigComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full',
        data: {
          title: 'Terms and Condition'
        }
      },
      {
        path: 'policy',
        component: AdminPolicyComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Policy'
        }
      },
      // {
      //   path: 'faq',
      //   component: AdminFAQComponent,
      //   canActivate: [AuthGuard],
      //   data: {
      //     title: 'FAQ'
      //   }
      // },
      {
        path: 'help',
        component: FAQComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Help'
        }
      },
      // {
      //   path: 'about',
      //   component: AdminAboutComponent,
      //   //  canActivate: [AuthGuard],
      // },
      {
        path: 'news',
        component: AdminNewsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'News'
        }
      },
      {
        path: 'ourstory',
        component: AdminStoryComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Our Story'
        }
      },
      {
        path: 'social-media',
        component: SocialMediaComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'manage-access',
        component: ManageAccessComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Manage Access'
        }
      },
      {
        path: 'manage-access/add-roles',
        component: addRolesComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Add Roles'
        }
      },
      {
        path: 'push-notification',
        component: SendPushComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Send Push'
        }
      },
      {
        path: 'push-notification/send-new-notification',
        component: newPushComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Send New Push'
        }
      },
      {
        path: 'push-notification/targeted-users/:id',
        component: pushTargetedUserComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Targeted Users'
        }
      },
    ]
  },

];



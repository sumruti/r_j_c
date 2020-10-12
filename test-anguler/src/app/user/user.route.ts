//importing all the essential modules
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//importing all the custom components
//========== logincomponent for login page(landing page of the app) ===========
import { LogInComponent } from './components/loginComponent/loginComponent.component';

//============== dashboard component (the landing page after login) ============
import { DashBoardComponent } from './components/dashboardComponent/dashboard.component';

//=============== the parent component (for abstract i.e, common view) ===========
import { PagesComponent } from '../pages/pages.component';
import { AuthGuard } from '../_guards/auth.guard';
import { UsersListComponent } from '../users/component/userslist/users.component';
import { DeviceComponent } from '../device/devices.component';
import { GuestUserComponent } from '../guest/component/guestUser.component';
import { CategoriesComponent } from '../categories/component/categories.component';
import { ReportedUserComponent } from '../reporteduser/component/reporteduser.component';
import { RejectedUserComponent } from '../rejecteduser/component/rejecteduser.component';
import { UserPostComponent } from '../users/component/userpost/userpost.component';
import { BlockRequestComponent } from '../blockrequest/blockrequest.component';
import { SubcategoriesComponent } from '../categories/subCategories/subcategories.component';
import { ReportedCountComponent } from '../reporteduser/reportedcount/reportedcount.component';
import { ActivePostComponent } from '../posts/activepost/activepost.component';
import { PostStatusComponent } from '../posts/status/status.component';
import { CreatePostComponent } from '../posts/createpost/createpost.component';
import { WishListComponent } from '../users/component/wishlist/wishlist.component';
import { CommentsComponent } from '../posts/comments/comments.component';
import { FavoriteComponent } from '../posts/favorite/favorite.component';
import { ViewsComponent } from '../posts/viewpost/viewpost.component';
import { AdminConfigComponent } from '../admin/adminconfig/adminconfig.component';
import { UserFollowersComponent } from '../users/component/userfollowers/userfollowers.component';
import { UserFollowingComponent } from '../users/component/userfollowing/userfollowing.component';
import { ReportedPostComponent } from '../posts/reportedpost/reportedpost.component';
import { AdminPolicyComponent } from '../admin/adminpolicy/adminpolicy.component';
import { PurchasesComponent } from '../users/component/purchases/purchases.component';
import { BlockDetailComponent } from '../blockrequest/blockdetail/blockdetail.component';
import { OfferDetailComponent } from '../posts/offerdetail/offerdetail.component';
import { PushMessagesComponent } from '../users/component/pushmessages/pushmessages.component';
import { PushUserCountComponent } from '../users/component/pushusercount/pushusercount.component';
import { BannedPostComponent } from '../posts/bannedpost/bannedpost.component';
import { OfferViewComponent } from '../users/component/purchases/offerdetail/offerdetail.component';
import { OfferPostComponent } from '../posts/offerdetail/offerview/offerview.component';
import { UserRatingComponent } from '../users/component/userRating/userRating.component';
import { UserAvgRatingComponent } from '../users/component/userRating/avgRating/avgRating.component';
import { PageNotFoundComponent } from '../pages/error/pagenotfound.component';
//=============== routing for user modules ======================
//=============== exporting the route to the main app =============
export const UserRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'app',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: '/app/dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashBoardComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Dashboard'
        }
      },
      {
        path: 'registered-users',
        component: UsersListComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Users List'
        }
      },
      {
        path: 'registered-users/devices/:username',
        component: DeviceComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Device List'
        }
      },
      {
        path: 'registered-users/followers/:username',
        component: UserFollowersComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'UserFollowers List'
        }
      },
      {
        path: 'registered-users/following/:username',
        component: UserFollowingComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'UserFollowing List'
        }
      },
      {
        path: 'registered-users/post/:username',
        component: UserPostComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'UserPost List'
        }
      },
      {
        path: 'registered-users/post/offer/:postId',
        component: OfferDetailComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Offer List'
        }
      },
      {
        path: 'registered-users/post/views/:postId',
        component: ViewsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Views List'
        }
      },
      {
        path: 'registered-users/post/comments/:postId',
        component: CommentsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Comment List'
        }
      },
      {
        path: 'registered-users/post/favorite/:postId/:type',
        component: FavoriteComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Likes List'
        }
      },
      {
        path: 'registered-users/wishlist/:username',
        component: WishListComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'WishList List'
        }
      },
      {
        path: 'registered-users/offers/:username',
        component: PurchasesComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Purchases List'
        }
      },
      {
        path: 'registered-users/offers/details/:id/:username',
        component: OfferViewComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'detail List'
        }
      },
      {
        path: 'guest-user',
        component: GuestUserComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'GuestUser List'
        }
      },
      {
        path: 'reported-user',
        component: ReportedUserComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'ReportedUser List'
        },
      },
      {
        path: 'reporteduser/reportedby/:username',
        component: ReportedCountComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'ReportedCount List'
        }
      },
      {
        path: 'rejected-user',
        component: RejectedUserComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'RejectedUser List'
        }
      },
      {
        path: 'block',
        component: BlockRequestComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Block Request'
        }
      },
      {
        path: 'block/blockdetails/:username',
        component: BlockDetailComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Block Detail'
        }
      },
      {
        path: 'push-messages',
        component: PushMessagesComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Push Messages Detail'
        }
      },
      {
        path: 'push-messages/users/:pushId',
        component: PushUserCountComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Push Users Detail'
        }
      },
      {
        path: 'user-rating',
        component: UserRatingComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'User Rating List'
        }
      },
      {
        path: 'user-rating/average-rating/:username',
        component: UserAvgRatingComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Average Rating List'
        }
      },
      {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Categories List'
        }
      },
      {
        path: 'categories/subcategories/:categoryName',
        component: SubcategoriesComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Subcategories List'
        }
      },
      {
        path: 'active-post',
        component: ActivePostComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'ActivePost List'
        }
      },
      {
        path: 'active-post/poststatus/:postId',
        component: PostStatusComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'PostStatus List'
        }
      },
      {
        path: 'active-post/comments/:postId',
        component: CommentsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Comments List'
        }
      },
      {
        path: 'active-post/favorite/:postId/:type',
        component: FavoriteComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Favorite List'
        }
      },
      {
        path: 'active-post/views/:postId',
        component: ViewsComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Views List'
        }
      },
      {
        path: 'active-post/offer/:postId',
        component: OfferDetailComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Offer List'
        }
      },
      {
        path: 'active-post/offer/offer-detail/:postId',
        component: OfferPostComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Offer Detail List'
        }
      },
      {
        path: 'create-post',
        component: CreatePostComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'CreatePost List'
        }
      },
      {
        path: 'reported-post',
        component: ReportedPostComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Reported Post List'
        }
      },
      {
        path: 'banned-post',
        component: BannedPostComponent,
        canActivate: [AuthGuard],
        data: {
          title: 'Ban Post List'
        },
      },
      // {
      //   path: 'config',
      //   component: AdminConfigComponent,
      //   data: {
      //     title: 'Admin Config'
      //   }
      // },
      // {
      //   path: 'policy',
      //   component: AdminPolicyComponent,
      //   data: {
      //     title: 'Admin Policy'
      //   }
      // },
      // {
      //   path: 'faq',
      //   component: AdminFAQComponent,
      //   data: {
      //     title: 'Admin FAQ'
      //   }
      // },
      
    ]
  },
  {
    path: 'login',
    component: LogInComponent,
    // canActivate: [AuthGuard]
  },
  {
    path: 'error',
    component: PageNotFoundComponent,
    
  },
];



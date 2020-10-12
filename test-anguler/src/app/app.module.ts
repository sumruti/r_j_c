//importing all the essential pacakges and modules
import { NgModule } from '@angular/core';
import { BrowserModule, Title } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
// import {} from '@angular/animations';

// import { MdMenuModule } from '@angular/material';
//for pipeing
import { Pipe, PipeTransform } from '@angular/core';

//importing ng2-pagination
import {
  Ng2PaginationModule, PaginationService, PaginationControlsDirective,
  PaginationControlsComponent
} from 'ng2-pagination';

// import { CountryPickerModule } from 'angular2-countrypicker';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

//importing module for table search
import { Ng2SearchTableModule } from "ng2-search-table/ng2-search-table";

//importing breadcrumbs module
// import {Ng2BreadcrumbModule} from 'ng2-breadcrumb/ng2-breadcrumb';

import { ChartsModule } from 'ng2-charts/ng2-charts';
import { FroalaEditorModule } from "ng2-froala-editor/ng2-froala-editor";
import { CKEditorModule } from 'ng2-ckeditor';
import { DataTableModule } from "angular2-datatable";

//importing routing and appconfig
import { routes } from './app.routing';
import { AppConfig } from './app.config';

//============= importing modal modules ==============
import { ModalModule } from 'angular2-modal';
import { BootstrapModalModule } from 'angular2-modal/plugins/bootstrap';

//============ importing module for country code ============
import { AuthGuard } from './_guards/auth.guard';
import { LoginComponentService } from './user/components/loginComponent.service';

//import { AuthenticationService } from './_services/authentication.service';

//importing page module
import { PageModule } from './pages/pages.module';

//===============importing User Module===================
import { UserModule } from './user/user.module';

//====General AppComponent======
import { AppComponent } from './app.component';

import { UsersModule } from './users/users.module';

import { Configuration } from './app.constant';
import { DeviceModule } from './device/device.module';
import { GuestUserModule } from './guest/component/guestUser.module';
import { CategoriesModule } from './categories/categories.module';
import { ReportedUserModule } from './reporteduser/reporteduser.module';
import { RejectedUserModule } from './rejecteduser/rejecteduser.module';
import { UserPostModule } from './users/component/userpost/userpost.module';
import { BlockRequestModule } from './blockrequest/blockrequest.module';
import { SubcategoriesModule } from './categories/subCategories/subcategories.module';
import { ReportedCountModule } from './reporteduser/reportedcount/reportedcount.module';
import { ActivePostModule } from './posts/activepost/activepost.module';
import { PostStatusModule } from './posts/status/status.module';
import { CreatePostModule } from './posts/createpost/createpost.module';
import { WishListModule } from './users/component/wishlist/wishlist.module';
import { CommentsModule } from './posts/comments/comments.module';
import { FavoriteModule } from './posts/favorite/favorite.module';
import { ViewsModule } from './posts/viewpost/viewpost.module';
import { AdminConfigModule } from './admin/adminconfig/adminconfig.module';
import { UserFollowersModule } from './users/component/userfollowers/userfollowers.module';
import { UserFollowingModule } from './users/component/userfollowing/userfollowing.module';
import { ReportedPostModule } from './posts/reportedpost/reportedpost.module';
import { AdminPolicyModule } from './admin/adminpolicy/adminpolicy.module';
import { PurchasesModule } from './users/component/purchases/purchases.module';
import { AdminModule } from './admin/admin.module';
import { BlockDetailModule } from './blockrequest/blockdetail/blockdetail.module';
import { OfferDetailModule } from './posts/offerdetail/offerdetail.module';
import { AdminProblemModule } from './adminproblem/adminproblem.module';
import { BannedPostModule } from './posts/bannedpost/bannedpost.module';
import { SeoModule } from './SEO/seo.module';
import { WalletsModule } from './wallets/wallets.module';

@NgModule({
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, { useHash: true }),
    Ng2PaginationModule,
    // Ng2SearchTableModule.forRoot(),
    ModalModule.forRoot(),
    BootstrapModalModule,
    Ng2SearchPipeModule,
    PageModule.forRoot(),
    UserModule,
    UsersModule,
    DeviceModule,
    GuestUserModule,
    CategoriesModule,
    ReportedUserModule,
    RejectedUserModule,
    UserPostModule,
    BlockRequestModule,
    SubcategoriesModule,
    ReportedCountModule,
    ActivePostModule,
    PostStatusModule,
    CreatePostModule,
    WishListModule,
    CommentsModule,
    FavoriteModule,
    ViewsModule,
    AdminConfigModule,
    UserFollowersModule,
    UserFollowingModule,
    ReportedPostModule,
    AdminPolicyModule,
    PurchasesModule,
    AdminModule,
    BlockDetailModule,
    OfferDetailModule,
    AdminProblemModule,
    BannedPostModule,
    ChartsModule,
    SeoModule,
    WalletsModule
    // MdMenuModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    Title,
    AppConfig,
    PaginationService,
    AuthGuard,
    LoginComponentService,
    Configuration
  ],
  bootstrap: [AppComponent]


})
export class AppModule {
}
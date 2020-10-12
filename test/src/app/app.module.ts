import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing } from './app.routing';
import { Ng2CloudinaryModule } from 'ng2-cloudinary';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { LazyLoadImageModule } from 'ng2-lazyload-image';
import { FileUploadModule } from 'ng2-file-upload';
import { AppComponent } from './app.component';
import { Configuration } from './app.constants';
import { MissionService } from './app.service';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { HomeService } from './home/home.service';
import { AboutComponent } from './about/about.component';
import { HowitworksComponent } from './howitworks/howitworks.component';
import { TrustComponent } from './trust/trust.component';
import { ItemComponent } from './item/item.component';
import { ItemService } from './item/item.service';;
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SettingsComponent } from './settings/settings.component';
import { SettingsService } from './settings/settings.service';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ChangePasswordService } from './changepassword/changepassword.service';
import { NeedhelpComponent } from './needhelp/needhelp.component';
import { LogoutComponent } from './logout/logout.component';
import { MemberprofileComponent } from './memberprofile/memberprofile.component';
import { MemberProfileService } from './memberprofile/memberprofile.service';
import { TermsComponent } from './terms/terms.component';
import { TermsService } from './terms/terms.service';
import { PrivacyComponent } from './privacy/privacy.component';
import { DiscussionsComponent } from './discussions/discussions.component';
import { PasswordresetComponent } from './passwordreset/passwordreset.component';
import { VerifyemailComponent } from './verifyemail/verifyemail.component';
import { EmailverifyComponent } from './emailverify/emailverify.component';
import { SellComponent } from './sell/sell.component';

import { LanguageService } from './app.language';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { AdsenseModule } from 'ng2-adsense';


let providers = {
  "google": {
    "clientId": "527165199246-1hj4creseke8pko22uvhv2her0ir8037.apps.googleusercontent.com"
  },
  // "linkedin": {
  //   "clientId": "LINKEDIN_CLIENT_ID"
  // },
  "facebook": {
    "clientId": "895123320630756",
    "apiVersion": "v2.11" //like v2.4 
  }
};


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    AboutComponent,  
    HowitworksComponent,
    TrustComponent,
    ItemComponent, 
    LoginComponent,
    RegisterComponent,
    ResetpasswordComponent,    
    SettingsComponent,
    ChangepasswordComponent,
    NeedhelpComponent,
    LogoutComponent,
    MemberprofileComponent,
    TermsComponent,
    PrivacyComponent,  
    DiscussionsComponent,
    PasswordresetComponent,
    VerifyemailComponent,
    EmailverifyComponent,
    SellComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'website' }),
    InfiniteScrollModule,
    FormsModule,
    HttpModule,
    routing,
    Ng2CloudinaryModule,
    FileUploadModule,
    LazyLoadImageModule,
    Angular2SocialLoginModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-8037091146947232',
      adSlot: 7259870550
    }),
  ],
  providers: [
    AuthGuard,
    Configuration,
    MissionService,
    HomeService,   
    ItemService,
    RegisterService,
    LoginService,
    SettingsService,
    ChangePasswordService,
    MemberProfileService,  
    TermsService,
    LanguageService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

Angular2SocialLoginModule.loadProvidersScripts(providers);

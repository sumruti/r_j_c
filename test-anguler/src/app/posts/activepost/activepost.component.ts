import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router } from '@angular/router';
import { ActivePostService } from '../../posts/activepost/activepost.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { PagesComponent } from '../../pages/pages.component';

declare var swal: any;
@Component({
    selector: 'activepost',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./activepost.component.scss'],
    templateUrl: './activepost.component.html',
    providers: [ActivePostService]
})

export class ActivePostComponent {
    public rowsOnPage = 10;
    public p = 1;
    activePost: any;
    public searchEnabled = 0;
    public searchTerm = '';
    msg: any = false;
    errmsg: any = false;
    count: any;
    public nameascending = false;
    public dateascending = false;
    public sortCondition = 'datedesc';
    postDetail: any;
    category: any;
    mainImg: any;
    imgSlide: any;
    slideIndex = 1;
    detailData: any;
    user_category: any;
    user_subCategory: any;
    category_User = '';
    subCategory = '';
    filter: any = 0;
    userReject = [];
    seoSetting: FormGroup;
    seoPostId: any;



    constructor(private _appConfig: AppConfig, private _activepostservice: ActivePostService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder, public _isAdmin: PagesComponent) {
        this.seoSetting = fb.group({
            'seoTitle': ['', Validators.required],
            'seoDescription': ['', Validators.required],
            'seoKeyword': ['', Validators.required],
        });
    }
    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'active-post') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if (roleDt[x] == 100) {
                        jQuery("#banBtn").hide();
                    } else if (roleDt[x] == 110) {
                        jQuery("#banBtn").hide();
                    }
                }
            }
        }


        this.p = 1;
        this.getPage(this.p);
        this.gotoGetCategory();

    }

    getPage(p) {



        if (this.filter == 1) {
            var category = jQuery("#category").val();
        }
        // console.log(this.rowsOnPage);
        // console.log(this.p);
        this._activepostservice.getactivepost(p - 1, this.rowsOnPage, this.searchEnabled, this.searchTerm, this.sortCondition, this.filter, category).subscribe(
            result => {
                // console.log("result", result);
                if (result.response && result.response.length > 0) {
                    this.msg = false;
                    // console.log("result", result);
                    this.activePost = result.response;
                    this.p = p;
                    this.count = result.count;
                } else {
                    this.activePost = [];
                    this.msg = "No Post Available";
                }
            }
        )
    }
    getPageOnSearch(term) {
        // console.log("search", term);
        // console.log("search model", this.searchTerm);
        this.searchTerm = term;
        if (this.searchTerm.length > 0) {
            this.searchEnabled = 1;
        } else {
            this.searchEnabled = 0;
        }
        this.getPage(this.p);

    }
    getSort(sort) {
        // console.log("abc");
        switch (sort) {
            case 'name': this.nameascending = !this.nameascending;
                this.sortCondition = (this.nameascending) ? 'nameasc' : 'namedesc';
                this.getPage(this.p);
                // console.log("sort",this.sortCondition);
                break;
            case 'date': this.dateascending = !this.dateascending;
                this.sortCondition = (this.dateascending) ? 'dateasc' : 'datedesc';
                this.getPage(this.p);
                // console.log("sort",this.sortCondition);
                break;
        }

    }
    gotoStatus(postId) {
        // console.log("postedBy", postId);
        this.router.navigate(['/app/active-post/poststatus', postId]);
    }
    gotoPostDetail(postedBy, postId) {
        // console.log("postedBy", postedBy);
        // console.log("postId", postId);
        this.seoPostId = postId;
        this._activepostservice.getPostDetails(postId, postedBy).subscribe(
            result => {
                this.postDetail = result.data;
                // console.log("result", result);
                this.category = result.data[0].category[0].category;
                // console.log("cat", result.data[0].category[0].category);
            }
        )

    }


    submitForm(value) {
        // var keyWord = value._value.keyword.split(',');
        // value._value.keyword = keyWord;
        // console.log("val",value._value);
        value._value.postId = this.seoPostId;
        this._activepostservice.seoSave(value._value).subscribe(
            res => {
                // console.log("res", res);
                if (res.code == 200) {
                    swal("Success!", "Saved Successfully!", "success");
                }
            }
        )
    }
    seoAlterSave(x) {
        var txt = jQuery("." + x).val();
        this._activepostservice.seoPostAltImg(this.seoPostId, x, txt).subscribe(
            res => {
                // console.log("res", res);
                if (res.code == 200) {
                    swal("Success!", "Saved Successfully!", "success");
                }
            }
        )
    }

    prev() {

        jQuery("#main").removeClass('active');
        jQuery("#img1").addClass('active');


    }
    plusDivs(n) {
        this.showDivs(this.slideIndex += n);
    }
    showDivs(n) {
        var i;
        var im;
        var x = document.getElementsByClassName("mySlides");
        if (n > x.length) { this.slideIndex = 1 }
        if (n < 1) { this.slideIndex = x.length }
        for (i = 0; i < x.length; i++) {
            jQuery(x[i]).css("display", "none");
        }
        jQuery(x[this.slideIndex - 1]).css("display", "block");
    }
    gotoUserDatail(user) {
        this._activepostservice.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                // console.log("res", result);                
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
    gotoGetCategory() {
        this._activepostservice.getuserCategory().subscribe(
            result => {
                this.user_category = result.data;
                // console.log("result", this.user_category);
            }
        )
    }
    selectCat() {
        this.filter = 1;
        this.getPage(this.p);
    }
    // selectCat(val) {
    //     // console.log("1");
    //     this.filter = 1;
    //     if (val.length > 0) {
    //         jQuery("#errmsg").hide();
    //         this._activepostservice.getuserSubCategory(val).subscribe(
    //             result => {
    //                 if (result.data && result.data.length > 0) {
    //                     jQuery("#errmsg").hide();
    //                     this.user_subCategory = result.data;
    //                     this.getPage(this.p);
    //                     // console.log("result1", this.user_subCategory);
    //                 } else {
    //                     this.user_subCategory = [];
    //                     this.errmsg = "no Sub Category Found";
    //                     jQuery("#errmsg").show();
    //                 }
    //             }
    //         )
    //     } else {
    //         console.log("error");
    //         this.errmsg = "Please select category";
    //         jQuery("#errmsg").show();
    //     }
    // }
    // selectSubCat(v) {
    //     // console.log("2");
    //     // console.log("v",v);
    //     this.filter = 2;
    //     this.getPage(this.p);
    // }
    clearDrop() {
        jQuery("#category").val('');
        this.filter = 0;
        this.getPage(this.p);
    }
    gotocheck(postId, event) {
        // jQuery("#btnreject").show();
        if (event.target.checked) {
            this.userReject.push(postId);
        } else if (!event.target.checked) {
            let indexx = this.userReject.indexOf(postId);
            this.userReject.splice(indexx, 1);
        }
        if (this.userReject.length == 0) {
            // jQuery("#btnreject").hide();
            // swal("Please Select User");
        }
        // console.log("element", this.userReject);

    }
    selectAllCheckBox() {
        this.activePost.forEach((post) => {
            post.checked = !post.checked;
            this.gotocheck(post.postId, event);
        });
    }
    gotoBanPost() {
        if (this.userReject.length == 0) {
            swal("Please Select Post");
        } else {
            this._activepostservice.banPost(this.userReject).subscribe(
                res => {
                    if (res.code == 200) {
                        this.ngOnInit();
                        swal("Success!", "Post Banned Successfully!", "success");
                    }
                }
            )
        }
    }

    gotoCommentlist(postId) {
        this.router.navigate(['/app/active-post/comments', postId]);
    }
    gotoFavorite(postId, type) {
        this.router.navigate(['/app/active-post/favorite', postId, type]);
    }
    gotoPostViews(postId) {
        this.router.navigate(['/app/active-post/views', postId]);
    }
    gotoPostOffer(postId) {
        this.router.navigate(['/app/active-post/offer', postId]);
    }

}
import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewContainerRef, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { UserPostService } from './userpost.service';
import { Location } from '@angular/common';
declare var swal: any;
import { PagesComponent } from '../../../pages/pages.component';



@Component({
    selector: 'userpost',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./userpost.component.scss'],
    templateUrl: './userpost.component.html',
    providers: [UserPostService]

})
export class UserPostComponent implements OnInit {
    sub: any;
    username: any;
    userPost: any = [];
    msg: any = false;
    public rowsOnPage = 10;
    public p = 1;
    postdlt: any;
    imageData: any;
    slideIndex = 1;
    postImage = '';
    user_category: any = [];
    user_subCategory: any = [];
    filter: any = 0;
    postDetail: any;
    detailData: any;
    category: any;
    btnFlag = true;
    
    constructor(private route: ActivatedRoute, private _userpostService: UserPostService, private router: Router, vcRef: ViewContainerRef, public _isAdmin: PagesComponent) {

    }

    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'registered-users') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if (roleDt[x] == 100) {
                        this.btnFlag = false;
                        jQuery(".thAction").remove();
                        jQuery(".thTitle").css("width","14%");
                    } else if (roleDt[x] == 110) {
                        this.btnFlag = false;  jQuery(".thAction").remove();
                        jQuery(".thTitle").css("width","14%");                      
                    }
                }
            }
        }
        this.sub = this.route.params.subscribe(params => {
            this.username = params['username'];
        });
        this.gotoGetCategory();
        this.getPage();
    }
    getPage() {
        // alert(2)
        if (this.filter == 1) {
            var category = jQuery("#category").val();
        }
        this._userpostService.getPost(this.username, this.filter, category).subscribe(
            result => {
                // console.log("res",result);
                // console.log("userpost", result.data);
                // console.log("length",result.data.length);
                if (result.data && result.data.length > 0) {
                    this.msg = false;
                    this.userPost = result.data;
                    // console.log("post data", result.data.length);
                } else {
                    this.userPost = [];
                    this.msg = "No Post available";
                }
            }
        )
    }
    gotoGetCategory() {
        this._userpostService.getuserCategory().subscribe(
            result => {
                this.user_category = result.data;
                // console.log("result", this.user_category);
            }
        )
    }
    selectCat() {
        // alert(1);
        this.filter = 1;
        this.getPage();
    }
    // selectCat(val) {
    //     if (val.length > 0) {
    //         jQuery("#errmsg").hide();
    //         this._userpostService.getuserSubCategory(val).subscribe(
    //             result => {
    //                 if (result.data && result.data.length > 0) {
    //                     jQuery("#errmsg").hide();
    //                     this.user_subCategory = result.data;
    //                     console.log("result1", this.user_subCategory);
    //                 } else {
    //                     this.user_subCategory = [];
    //                     // this.errmsg = "no Sub Category Found";
    //                     jQuery("#errmsg").show();
    //                 }
    //             }
    //         )
    //     } else {
    //         jQuery("#errmsg").show();
    //     }
    // }
    // selectSubCat(v) {
    //     this.getPage();
    // }
    clearDrop() {
        jQuery("#category").val('');
        this.filter = 0;
        this.getPage();
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

    gotoDeletePost(postsId, postType) {
        var usr = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Post!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Yes, I am sure!',
            cancelButtonText: "No, cancel it!",
            closeOnConfirm: false,
            closeOnCancel: false
        },
            function (isConfirm) {
                if (isConfirm) {
                    usr.gotodeletepost(postsId, postType);
                    swal({
                        title: 'Delete!',
                        text: 'Post Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your imaginary file is safe :)", "error");
                }
            });
    }
    gotodeletepost(postsId, postType) {
        // console.log("delete post ", postsId, postType);
        this._userpostService.deletepost(postsId, postType).subscribe(
            result => {
                this.postdlt = result;
                this.ngOnInit();
                // console.log("delete post", this.postdlt);
            }
        )
    }
    gotoImage(post) {
        // console.log("postimg", post);
        this.postImage = post;
        // this._userpostService.getPostImage(postsId).subscribe(
        //     result => {
        //         this.imageData;
        //     }
        // )
    }
    gotoPostDetail(postId, postedBy) {
        // console.log("postedBy", postedBy);
        // console.log("postId", postId);

        this._userpostService.getPostDetails(postId, postedBy).subscribe(
            result => {
                this.postDetail = result.data;
                // console.log("result", result);
                this.category = result.data[0].category[0].category;
                // console.log("cat", result.data[0].category[0].category);
            }
        )
    }
    gotoUserDatail(user) {
        this._userpostService.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
    gotoPostOffer(postId) {
        this.router.navigate(['/app/registered-users/post/offer', postId]);
    }
    gotoPostViews(postId) {
        this.router.navigate(['/app/registered-users/post/views', postId]);
    }
    gotoCommentlist(postId) {
        this.router.navigate(['/app/registered-users/post/comments', postId]);
    }
    gotoFavorite(postId, type) {
        this.router.navigate(['/app/registered-users/post/favorite', postId, type]);
    }

}

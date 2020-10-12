import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewContainerRef, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { WishListService } from './wishlist.service';
import { Location } from '@angular/common';


@Component({
    selector: 'wishlist',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./wishlist.component.scss'],
    templateUrl: './wishlist.component.html',
    providers: [WishListService]

})

export class WishListComponent implements OnInit {
    sub: any;
    username: any;
    wishList: any;
    postDetail: any;
    category: any;
    detailData: any;
    slideIndex = 1;
    constructor(private route: ActivatedRoute, private _wishlistservice: WishListService, private router: Router, vcRef: ViewContainerRef) {

    }

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {
            this.username = params['username'];
        });

        this._wishlistservice.getUserWishlist(this.username).subscribe(
            result => {
                this.wishList = result[0].data;
                // console.log("result", this.wishList);
            }
        )
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
            x[i] = im;
            // console.log("im", x[i]);
            jQuery(x[i]).css("display", "none");
        }
        x[this.slideIndex - 1] = im;
        jQuery(x[this.slideIndex - 1]).css("display", "block");
    }
    gotoPostDetail(postedBy, postId) {
        // console.log("postedBy", postedBy);
        // console.log("postId", postId);

        this._wishlistservice.getPostDetails(postId, postedBy).subscribe(
            result => {
                this.postDetail = result.data;
                // console.log("result", result);
                this.category = result.data[0].category[0].category;
                // console.log("cat", result.data[0].category[0].category);
            }
        )

    }
    gotoUserDatail(user) {
        this._wishlistservice.getUserDetail(user).subscribe(
            result => {
               if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
}
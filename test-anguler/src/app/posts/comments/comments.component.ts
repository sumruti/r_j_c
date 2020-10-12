import { Component, OnInit, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CommentsService } from '../../posts/comments/comments.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
declare var swal: any;
import { PagesComponent } from '../../pages/pages.component';
@Component({
    selector: 'comments',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./comments.component.scss'],
    templateUrl: './comments.component.html',
    providers: [CommentsService]
})
export class CommentsComponent implements OnInit {
    public rowsOnPage = 10;
    public p = 0;
    sub: any;
    postId: any;
    commentData: any = [];
    deleteId: any;
    commentedBy: any;
    commentId: any;
    type: any = 1;
    detailData: any;
    msg = false;
    constructor(private route: ActivatedRoute, private _commentservice: CommentsService, private router: Router, vcRef: ViewContainerRef,public _isAdmin: PagesComponent) {

    }
    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'active-post') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } 
                }
            }
        }
        this.sub = this.route.params.subscribe(params => {
            this.postId = params['postId'];
        });

        this.p = 0;
        this.getPage();


    }
    getPage() {
        this._commentservice.getComments(this.postId, this.rowsOnPage, this.p).subscribe(
            result => {
                // console.log('res',result)
                if (result.result && result.result.length > 0) {
                    // if (result.result.length < 10) {
                    //     jQuery("#loadButton").hide();
                    // } else {
                    //     jQuery("#loadButton").show();
                    // }
                    this.msg = false;
                    result.result.forEach(element => {
                        this.commentData.push(element);
                    });
                    this.p = this.p + this.rowsOnPage;
                } else {
                    jQuery("#loadButton").hide();
                    this.msg = true;
                }
            }
        )
    }
    // gotoLoadMore(){

    // }
    gotoDeleteComment(data) {
        var dlt = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Comment!",
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
                    dlt.deleteComment(data);
                    swal({
                        title: 'Delete!',
                        text: 'Comment Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your Comment is safe :)", "error");
                }
            });
    }
    deleteComment(data) {
        // console.log("delete", data);
        this.deleteId = data.postId;
        this.commentedBy = data.username;
        this.commentId = data.commentId;
        this._commentservice.deleteComment(this.deleteId, this.commentId, this.commentedBy, this.type).subscribe(
            result => {
                // console.log("result", result);
                this.ngOnInit();
                this.commentData = [];

            }
        )
    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._commentservice.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }

}
import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit } from '@angular/core';
import { AppConfig } from "../../app.config";
import { Router } from '@angular/router';
import { CreatePostService } from './createpost.service';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
import { PagesComponent } from '../../pages/pages.component';

declare var swal: any;
declare var sweetAlert: any;
declare var CLOUDNAME: string, CLOUDPRESET: string;

@Component({
    selector: 'createpost',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./createpost.component.scss'],
    templateUrl: './createpost.component.html',
    providers: [CreatePostService]
})

export class CreatePostComponent {
    createPost: FormGroup;
    editPost: FormGroup;
    public autocomplete: any;
    public editautocomplete: any;
    public place: any;
    public lat: any;
    public long: any;
    public location: any;
    public editLocation: any;
    public Feature = "True";
    public negotiable = '';
    logoUrl: any;
    public searchEnabled = 0;
    public searchTerm = '';
    public searchEnabled1 = 0;
    public searchTerm1 = '';
    category = '';
    subCategory = '';
    userlist: any;
    user_value: any;
    user_category: any;
    user_subCategory: any = [];
    post_subCategory: any = [];
    cloudName: any;
    preset: any;
    public url: any;
    public data: any;
    type: string = '0';
    imageId: any;
    postId: any
    public msg: any = false;
    public rowsOnPage = 10;
    public p = 1;
    adminPost: any;
    count: any;
    state = 1;
    editPostDetail: any;
    detailData: any;
    errorImg = false;
    filter: any = 0;
    obj = { name: 'as' };
    image: any = '';
    btnFlag = true;
    containerHeight: any;
    containerWidth: any;
    city: any;
    country: any;


    cloudinaryImage: any;
    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: "edheba-com", uploadPreset: "vane3rmj" })
    );

    imageUploader = (item: any, response: string, status: number, headers: any) => {
        let cloudinaryImage = JSON.parse(response);
        this.containerHeight = cloudinaryImage.height;
        this.containerWidth = cloudinaryImage.width;
        this.url = cloudinaryImage.secure_url;
        if (this.url) {
            jQuery(".loader").hide();
        }
        // alert(5);
        // this.submitData(this.url);
        // console.log("image", this.url);
        // if (this.state == 1) {
        //     this.submitData(this.url);
        // } else if (this.state == 0) {
        //     this.editDataPost(this.url);
        // }
    };
    constructor(private _appConfig: AppConfig, private _createpostservice: CreatePostService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder, public _isAdmin: PagesComponent) {
        this.createPost = fb.group({
            'Feature': "",
            'membername': ['', Validators.required],
            'mainUrl': "",
            'category': "",
            'subCategory': "",
            'productName': ['', Validators.required],
            'description': ['', Validators.required],
            'price': ['', Validators.required],
            'negotiable': "",
            'location': "",
            'latitude': "",
            'longitude': "",

        });
        this.editPost = fb.group({
            'Feature': "",
            'membername': ['', Validators.required],
            'mainUrl': "",
            'category': "",
            'subCategory': "",
            'productName': ['', Validators.required],
            'description': ['', Validators.required],
            'price': ['', Validators.required],
            'negotiable': "",
            'location': "",
            'latitude': "",
            'longitude': "",

        });
        // this.uploader.onSuccessItem = this.imageUploader;
        // this.uploader.onSuccessItem = (item: any, response: string, status: number, headers: any) => {
        //     this.cloudinaryImage = JSON.parse(response);
        //     this.url = this.cloudinaryImage.secure_url;
        //     console.log("url",this.url);
        //     return { item, response, status, headers };
        // };
    }
    upload() {
        this.uploader.uploadAll();
        // let photo = jQuery("#photo").val();
        // if (photo) {
        // alert(1);
        this.errorImg = false;
        this.uploader.uploadAll();
        jQuery(".loader").show();
        // } else {
        //     this.errorImg = true;
        // }
    }
    ngOnInit() {
        jQuery(".loader").hide();
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'active-post') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if (roleDt[x] == 100) {
                        this.btnFlag = false; jQuery(".thAction").remove();
                        jQuery(".thTitle").css("width", "39%");
                        jQuery("#addBtn").hide();
                    } else if (roleDt[x] == 110) {
                        jQuery("#addBtn").hide(); jQuery(".thAction").remove();
                        jQuery(".thTitle").css("width", "39%");
                        this.btnFlag = false;
                    }
                }
            }
        }

        this.uploader.onSuccessItem = this.imageUploader;
        jQuery("#userdata_parent").hide();
        jQuery("#edituserdata_parent").hide();
        var componentForm = {
            street_number: 'short_name',
            route: 'long_name',
            locality: 'long_name',
            administrative_area_level_1: 'short_name',
            country: 'short_name',
            postal_code: 'short_name'
        };
        this.autocomplete = new google.maps.places.Autocomplete((<HTMLInputElement>document.getElementById('location')));
        this.autocomplete.addListener('place_changed', () => {
            this.place = this.autocomplete.getPlace();
            this.location = this.place.name;
            this.lat = this.place.geometry.location.lat();
            this.long = this.place.geometry.location.lng();
            // console.log("name", this.location);
            (<HTMLInputElement>document.getElementById('latitude')).value = this.place.geometry.location.lat();
            (<HTMLInputElement>document.getElementById('longitude')).value = this.place.geometry.location.lng();
            jQuery("input#location").val(this.place.name);
            for (var i = 0; i < this.place.address_components.length; i++) {
                var addressType = this.place.address_components[i].types[0];
                // console.log("addressType",addressType);
                if (componentForm[addressType]) {
                    // console.log("componentForm[addressType]",componentForm[addressType])
                    var val = this.place.address_components[i][componentForm[addressType]];
                    if (addressType == 'locality') {
                        // console.log("valvalvalval", val)
                        this.city = val;
                    }
                    if (addressType == 'country') {
                        this.country = val;
                        // console.log("valvalvalval", val)
                    }
                }
            }
        });
        this.editautocomplete = new google.maps.places.Autocomplete((<HTMLInputElement>document.getElementById('editLocation')));
        this.editautocomplete.addListener('place_changed', () => {
            this.place = this.editautocomplete.getPlace();
            this.editLocation = this.place.name;
            this.lat = this.place.geometry.location.lat();
            this.long = this.place.geometry.location.lng();
            (<HTMLInputElement>document.getElementById('editLatitude')).value = this.place.geometry.location.lat();
            (<HTMLInputElement>document.getElementById('editLongitude')).value = this.place.geometry.location.lng();
            jQuery("input#editLocation").val(this.place.name);
            for (var i = 0; i < this.place.address_components.length; i++) {
                var addressType = this.place.address_components[i].types[0];
                // console.log("addressType",addressType);
                if (componentForm[addressType]) {
                    // console.log("componentForm[addressType]",componentForm[addressType])
                    var val = this.place.address_components[i][componentForm[addressType]];
                    if (addressType == 'locality') {
                        // console.log("valvalvalval", val)
                        this.city = val;
                    }
                    if (addressType == 'country') {
                        this.country = val;
                        // console.log("valvalvalval", val)
                    }
                }
            }
        });

        this.gotoGetCategory();
        this.getPage();

    }

    getPage() {
        if (this.filter == 1) {
            var category = jQuery("#categoryPost").val();
        }
        this._createpostservice.getAdminPost(category, this.filter, this.searchEnabled, this.searchTerm).subscribe(
            result => {
                // console.log("result", result);
                if (result != null && result.data.length > 0) {
                    // alert(1);
                    this.msg = false;
                    this.adminPost = result.data;
                } else {
                    this.adminPost = [];
                    this.msg = "No Post available";
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
        this.getPage();

    }
    fileChange(input) {
        const reader = new FileReader();
        if (input.files.length) {
            const file = input.files[0];
            reader.onload = () => {
                this.image = reader.result;
            }
            reader.readAsDataURL(file);
        }
    }
    removeImage(): void { this.image = ''; }
    gotoUserSearch(term) {

        // console.log("search", term);
        // console.log("search model", this.searchTerm);
        this.searchTerm1 = term;
        if (this.searchTerm1.length > 0) {
            this.searchEnabled1 = 1;
        } else {
            jQuery("#userdata_parent").hide();
            jQuery("#edituserdata_parent").hide();
            this.searchEnabled1 = 0;
        }
        this._createpostservice.getusername(this.searchEnabled1, term).subscribe(
            result => {
                this.userlist = result.data;
                // console.log("result", result);
                jQuery("#userdata_parent").show();
                jQuery("#edituserdata_parent").show();
            }
        )
    }
    Submit(value): void {
        value._value.location = jQuery("input#location").val();
        value._value.latitude = jQuery("input#latitude").val();
        value._value.longitude = jQuery("input#longitude").val();
        value._value.mainUrl = this.url;
        value._value.thumbnailImageUrl = this.url;
        value._value.imageCount = "1";
        value._value.condition = "new";
        value._value.containerHeight = this.containerHeight;
        value._value.containerWidth = this.containerWidth;
        value._value.currency = "USD";
        value._value.type = this.type;
        value._value.city = this.city;
        value._value.countrySname = this.country;
        // this.state = 1;
        // console.log("image url", this.url);
        // console.log("data", this.url);
        // jQuery('#create-modal').modal('hide');
        // this.ngOnInit();
        // this.createPost.reset();
        if (this.url.length > 0) {
            this.msg = false;
            this._createpostservice.submitPost(value._value).subscribe(
                result => {
                    // console.log("result", result);
                    if (result.code == 200) {
                        swal("Success", "Post Added Successfully!", "success");
                    } else {
                        sweetAlert("Oops...", "Something went wrong!", "error");
                    }
                    jQuery('#create-modal').modal('hide');
                    this.ngOnInit();
                    this.createPost.reset();
                }
            )
        } else {
            this.msg = true;
        }


    }
    submitData(url) {
        this.data.mainUrl = url;
        this.data.thumbnailImageUrl = url;
        this.data.imageCount = "1"; this.data.condition = "new"; this.data.containerHeight = this.containerHeight;
        this.data.containerWidth = this.containerWidth; this.data.currency = "USD";
        this.data.type = this.type;
        // console.log("value", this.data);
        this._createpostservice.submitPost(this.data).subscribe(
            result => {
                // console.log("result", result);
                if (result.code == 200) {
                    this.url = '';
                    swal("Good job!", "Post Added Successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
                jQuery('#create-modal').modal('hide');
                this.ngOnInit();
                this.createPost.reset();
            }
        )
    }
    editPostData(post) {
        // console.log("post", post);
        this.city = post.city;
        this.country = post.countrySname;
        this.obj = post;
        this.url = post.mainUrl;
        this.postId = post.postId;
        this.category = post.category;
        this.subCategory = post.subCategory;
        this.negotiable = post.negotiable;
        this.logoUrl = post.mainUrl;
        this.containerHeight = post.containerHeight;
        this.containerWidth = post.containerWidth;
    }
    updatePost(value) {

        value._value.location = jQuery("input#editLocation").val();
        value._value.latitude = jQuery("input#editLatitude").val();
        value._value.longitude = jQuery("input#editLongitude").val();
        value._value.postId = this.postId;
        value._value.imageCount = "1"; value._value.condition = "new"; value._value.containerHeight = this.containerHeight;
        value._value.containerWidth = this.containerWidth; value._value.currency = "USD";
        value._value.type = this.type;
        value._value.postType = 0;
        value._value.mainUrl = this.url;
        value._value.city = this.city;
        value._value.countrySname = this.country;
        this._createpostservice.updatepost(value._value).subscribe(
            result => {
                // console.log("result", result);
                jQuery('#edit-modal').modal('hide');
                this.ngOnInit();
                this.createPost.reset();
            }
        )
    }
    editDataPost(url) {
        // alert(4);
        this.editPostDetail.mainUrl = url;
        this._createpostservice.updatepost(this.editPostDetail).subscribe(
            result => {
                // console.log("result", result);
                jQuery('#edit-modal').modal('hide');
                this.ngOnInit();
                this.createPost.reset();
            }
        )
    }

    gotoGetCategory() {
        this._createpostservice.getuserCategory().subscribe(
            result => {
                this.user_category = result.data;
                // console.log("result", this.user_category);
            }
        )
    }
    // gotosubcategory() {
    //     console.log("sub", this.category);
    //     if (this.category.length > 0) {
    //         jQuery("#errmsg").hide();
    //         this._createpostservice.getuserSubCategory(this.category).subscribe(
    //             result => {
    //                 if (result.data && result.data.length > 0) {
    //                     jQuery("#errmsg").hide();
    //                     this.user_subCategory = result.data;
    //                     // console.log("result", this.user_subCategory);
    //                 } else {
    //                     this.user_subCategory = [];
    //                     this.msg = "no Sub Category Found";
    //                     jQuery("#errmsg").show();
    //                 }
    //             }
    //         )
    //     } else {
    //         this.msg = "Please select category";
    //         jQuery("#errmsg").show();
    //     }
    // }
    selectCat() {
        this.filter = 1;
        this.getPage();
    }
    // selectCat(val) {
    //     console.log("val", val);
    //     if (val.length > 0) {
    //         jQuery("#errmsg").hide();
    //         this._createpostservice.getuserSubCategory(val).subscribe(
    //             result => {
    //                 if (result.data && result.data.length > 0) {
    //                     jQuery("#errmsg").hide();
    //                     this.post_subCategory = result.data;
    //                     // console.log("result1", this.post_subCategory);
    //                 } else {
    //                     this.post_subCategory = [];
    //                     // this.errmsg = "no Sub Category Found";
    //                     jQuery("#errmsg").show();
    //                 }
    //             }
    //         )
    //     } else {
    //         console.log("error");
    //         // this.errmsg = "Please select category";
    //         jQuery("#errmsg").show();
    //     }
    // }
    // selectSubCat(v) {
    //     // console.log("v",v);
    //     this.getPage();
    // }
    clearDrop() {
        jQuery("#categoryPost").val('');
        this.filter = 0;
        this.getPage();
    }

    sendUservalue(value): void {
        this.user_value = value;
        jQuery("#userdata_parent").hide();
        jQuery("#edituserdata_parent").hide();
    }
    gotoDeletePost(id) {
        var post = this;
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
                    post.deletepost(id);
                    swal({
                        title: 'Delete!',
                        text: 'Post Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your Post is safe :)", "error");
                }
            });
    }
    deletepost(id) {
        this._createpostservice.deletePost(id).subscribe(
            result => {
                // console.log("result", result);
                this.ngOnInit();
            }
        )
    }
    gotoUserDatail(user) {
        // console.log("user",user)
        this._createpostservice.getUserDetail(user).subscribe(
            result => {
                if (result.code == 200) {
                    this.detailData = result.data;
                    jQuery('#userDetail').modal('show');
                }
            }
        )
    }
    clearModal() {
        this.createPost.reset();
        this.url = '';
    }
}
import { Component, ViewEncapsulation, ViewContainerRef, AfterViewInit, AfterContentInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { AppConfig } from "../../app.config";
import { CategoriesService } from '../categories.service';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary';
declare var swal: any;
declare var sweetAlert: any;
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { PagesComponent } from '../../pages/pages.component';

@Component({
    selector: 'categories',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./categories.component.scss'],
    templateUrl: './categories.component.html',
    providers: [CategoriesService]
})

export class CategoriesComponent {
    public rowsOnPage = 10;
    config: any;
    configFn: any;
    public category: any = [];
    Dmsg: any = false;
    Amsg: any = false;
    msg: any = false;
    public count: any;
    dltcategory: any;
    addCategory: FormGroup;
    editCategory: FormGroup;
    public obj = '';
    public url: any;
    oldName: any;
    newName: any;
    data: any;
    state = 1;
    logoUrl: any;
    activeImg: any;
    deactiveImg: any;
    // editCat:any;
    data1: any;
    dataURI: any;
    public_id: any;
    errorImg = false;
    Dimage: any = '';
    Aimage: any = '';
    public images: string[] = [];
    btnFlag = true;
    constructor(private changeDetectorRef: ChangeDetectorRef, private _appConfig: AppConfig, private _categoryservice: CategoriesService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder, public _isAdmin: PagesComponent) {
        this.config = this._appConfig.config;
        this.configFn = this._appConfig;
        this.addCategory = fb.group({
            // 'mainUrl': "",
            'categoryName': ['', Validators.required],
        });
        this.editCategory = fb.group({
            'categoryName': ['', Validators.required],
            'mainUrl': ""
        })
    }

    ngOnInit() {
        if (this._isAdmin.isAdmin == false) {
            var role = sessionStorage.getItem('role');
            var roleDt = JSON.parse(role);
            for (var x in roleDt) {
                if (x == 'categories') {
                    if (roleDt[x] == 0) {
                        this.router.navigate(['error']);
                    } else if (roleDt[x] == 100) {
                        jQuery("#buttonCus").hide();
                        jQuery(".thAction").remove();
                        jQuery(".thTitle").css("width", "61%");
                        this.btnFlag = false;
                    } else if (roleDt[x] == 110) {
                        this.btnFlag = false;
                        jQuery(".thAction").remove();
                        jQuery(".thTitle").css("width", "61%");
                    }
                }
            }
        }


        jQuery("#upImg").hide();
        jQuery("#eupImg").hide();

        this._categoryservice.getCategory().subscribe(
            result => {
                if (result.data && result.data.length > 0) {
                    this.msg = false;
                    this.category = result.data;
                    this.count = result.subcategoryname;
                } else {
                    this.category = [];
                    this.msg = "No Category Found";
                }
            }
        )

    }
    DfileChange(input) {
        if ((input.files[0].size / 1000) > 300) {
            jQuery("#upImg").show();
            jQuery("#eupImg").show();

        } else {
            jQuery("#upImg").hide();
            jQuery("#eupImg").hide();
            const reader = new FileReader();
            if (input.files.length) {
                const file = input.files[0];
                reader.onload = () => {
                    this.Dimage = reader.result;
                }
                reader.readAsDataURL(file);
            }
        }
    }
    DremoveImage(): void { this.Dimage = ''; }
    AfileChange(input) {
        if ((input.files[0].size / 1000) > 300) {
            jQuery("#upImg").show();
            jQuery("#eupImg").show();
        } else {
            jQuery("#upImg").hide();
            jQuery("#eupImg").hide();
            const reader = new FileReader();
            if (input.files.length) {
                const file = input.files[0];
                reader.onload = () => {
                    this.Aimage = reader.result;
                }
                reader.readAsDataURL(file);
            }
        }
    }
    AremoveImage(): void { this.Aimage = ''; }
    submitForm(value) {
        if (this.Dimage.length == 0) {
            this.Dmsg = true;
        } if (this.Aimage.length == 0) {
            this.Amsg = true;
        } else {
            this.Dmsg = false;
            this.Amsg = false;
            // console.log("de", this.Dimage);
            // console.log("ac", this.Aimage);
            value._value.activeimage = this.Aimage;
            value._value.deactiveimage = this.Dimage;
            // console.log("asd", value._value);
            this._categoryservice.addCategory(value._value).subscribe(
                result => {
                    // console.log("result", result);
                    if (result.code == 200) {
                        swal("Good job!", "Category Added Successfully!", "success");
                    } else {
                        sweetAlert("Oops...", "Something went wrong!", "error");
                    }
                    this.images = [];
                    jQuery('#addCategory').modal('hide');
                    this.ngOnInit();
                    this.addCategory.reset();
                }
            )
        }
    }
    submitData(url) {
        this.data.mainUrl = url;
        // console.log("data", this.data);
        this._categoryservice.addCategory(this.data).subscribe(
            result => {
                // console.log("add categories", result);
                if (result.code == 200) {
                    swal("Good job!", "Category Added Successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }

                jQuery('#addCategory').modal('hide');
                this.ngOnInit();
                this.addCategory.reset();
            }
        )
    }
    editCategoryData(category) {
        // console.log("data", category);
        this.obj = category;
        this.oldName = category.name;
        jQuery('#newName').val(this.oldName);
        this.logoUrl = category.categoryImageUrl;
        this.activeImg = category.activeimage;
        this.deactiveImg = category.deactiveimage;

        this.Dimage = category.deactiveimage;
        this.Aimage = category.activeimage;

    }
    updatecategory(subCategory) {
        this.newName = jQuery("input#newName").val();
        if (this.Dimage.length == 0) {
            this.Dmsg = true;
        } if (this.Aimage.length == 0) {
            this.Amsg = true;
        } else {
            this.Dmsg = false;
            this.Amsg = false;
            // console.log("de", this.Dimage);
            // console.log("ac", this.Aimage);
            this._categoryservice.editCategory(this.oldName, this.newName, this.activeImg, this.deactiveImg, this.Dimage, this.Aimage).subscribe(
                result => {
                    console.log("result", result);
                    if (result.code == 200) {
                        swal("Good job!", "Category Edited Successfully!", "success");
                    } else {
                        sweetAlert("Oops...", "Something went wrong!", "error");
                    }
                    this.images = [];
                    jQuery('#editCategory').modal('hide');
                    this.ngOnInit();
                    this.addCategory.reset();
                }
            )
        }
        // this.state = 0;
        // this.newName = jQuery("input#newName").val();
        // let photo = jQuery("#editphoto").val();
        // if (photo) {
        //     // this.uploader.uploadAll();
        // } else {
        //     this.editCatData(this.logoUrl);
        // }
        // this._categoryservice.editCategory(this.oldName, this.newName).subscribe(
        //     result => {
        //         console.log("result", result);
        //         jQuery('#editCategory').modal('hide');
        //         this.ngOnInit();
        //     }
        // )

    }
    // editCatData(url) {
    //     console.log("oldName", this.oldName);
    //     console.log("newName", this.newName);
    //     console.log("url", url);
    //     this._categoryservice.editCategory(this.oldName, this.newName, url).subscribe(
    //         result => {
    //             console.log("result", result);
    //             jQuery('#editCategory').modal('hide');
    //             this.ngOnInit();
    //         }
    //     )
    // }



    gotoSubcate(categoryName: any) {
        // console.log("categories", categoryName);
        this.router.navigate(['/app/categories/subcategories', categoryName]);
    }
    gotoDeleteCategory(category) {
        var cat = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this Category!",
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
                    cat.deletecategory(category);
                    swal({
                        title: 'Delete!',
                        text: 'Category Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your Category is safe :)", "error");
                }
            });
    }

    deletecategory(category) {
        // console.log("abc", category)
        this._categoryservice.deletecategory(category).subscribe(
            result => {
                // console.log("result", result);
                // if (result.code != 200) {
                //     sweetAlert("Oops...", "Something went wrong!", "error");
                // }
                // this.dltcategory = result;
                this.ngOnInit();
            }
        )
    }
    clearModal() {
        this.Dimage = '';
        this.Aimage = '';
        this.addCategory.reset();
    }
}
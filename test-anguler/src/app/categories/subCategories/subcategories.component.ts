import { Component, OnInit, OnDestroy, ViewEncapsulation, ViewContainerRef, Input, AfterViewInit, AfterContentInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Modal } from 'angular2-modal/plugins/bootstrap';
import { ModalModule } from "ng2-modal";
import { SubcategoriesService } from './subcategories.service';
import { Location } from '@angular/common';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from '@angular/forms';
import { CloudinaryOptions, CloudinaryUploader } from 'ng2-cloudinary'

declare var swal: any;
declare var sweetAlert: any;
declare var CLOUDNAME: string, CLOUDPRESET: string;

@Component({
    selector: 'subcategories',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./subcategories.component.scss'],
    templateUrl: './subcategories.component.html',
    providers: [SubcategoriesService]

})

export class SubcategoriesComponent implements OnInit {
    sub: any;
    categoriesName: any;
    msg: any = false;
    subCategory: any;
    public rowsOnPage = 10;
    addSubCategory: FormGroup;
    editSubCategory: FormGroup;
    public obj = '';
    addFields: any;
    editFields = [];
    oldName: any;
    newName: any;
    public url: any;
    logoUrl: any;
    state = 1;
    errorImg = false;


    cloudinaryImage: any;
    uploader: CloudinaryUploader = new CloudinaryUploader(
        new CloudinaryOptions({ cloudName: CLOUDNAME, uploadPreset: CLOUDPRESET })
    );

    imageUploader = (item: any, response: string, status: number, headers: any) => {
        let cloudinaryImage = JSON.parse(response);
        this.url = cloudinaryImage.secure_url;
        // this.imageId = cloudinaryImage.public_id;
        // console.log("url",this.url);
        // this.submitData(this.url);
        if (this.state == 1) {
            this.submitData(this.url);
        } else if (this.state == 0) {
            this.editsubCatData(this.url);
        }
        // return { item, response, status, headers };
    };

    constructor(private route: ActivatedRoute, private _subcategoriesService: SubcategoriesService, private router: Router, vcRef: ViewContainerRef, fb: FormBuilder) {
        this.addSubCategory = fb.group({
            'subCategory': ['', Validators.required],
            'imageUrl': "",
        });
        this.editSubCategory = fb.group({
            'subCategory': ['', Validators.required],
            'mainUrl': "",
        });

    }
    upload() {
        this.uploader.uploadAll();
        let photo = jQuery("#photo").val();
        if (photo) {
            this.errorImg = false;
            this.uploader.uploadAll();
        } else {
            this.errorImg = true;
        }
    }
    ngOnInit() {
        this.uploader.onSuccessItem = this.imageUploader;
        this.msg = false;
        this.sub = this.route.params.subscribe(params => {
            this.categoriesName = params['categoryName'];
        });
        // console.log("subcategories", this.categoriesName);
        this._subcategoriesService.getSubcategory(this.categoriesName).subscribe(
            result => {
                // console.log("list data", result);

                // console.log("count",result.data.length);
                if (result.data && result.data.length > 0) {
                    this.subCategory = result.data;
                } else {
                    this.subCategory = [];
                    this.msg = "No sub category available";
                }
            }
        )
    }
    submitForm(value): void {
        this.addFields = value._value;
        this.state = 1;

    }
    submitData(url) {
        this.addFields.category = this.categoriesName;
        this.addFields.imageUrl = url;
        this._subcategoriesService.addSubCategory(this.addFields).subscribe(
            result => {
                if (result.code == 200) {
                    // console.log("result", result);
                    swal("Good job!", "SubCategory Added Successfully!", "success");
                    jQuery('#addSubCategory').modal('hide');
                    this.ngOnInit();
                    this.addSubCategory.reset();
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
            }
        )
    }

    gotoeditSubcategory(subcategory) {
        // console.log("abc", subcategory);
        this.obj = subcategory;
        this.oldName = subcategory.subcategory;
        this.logoUrl = subcategory.subCategoryImageUrl;
    }
    updatecategory(category) {
        this.newName = jQuery("input#newName").val();
        this.editFields.push(category._value);
        this.state = 0;
        let photo = jQuery("#editphoto").val();
        if (photo) {
            this.uploader.uploadAll();
        } else {
            this.editsubCatData(this.logoUrl);
        }
        // console.log("edited", this.editFields);
        // this._subcategoriesService.editCategory(this.oldName, this.newName).subscribe(
        //     result => {
        //         if (result.data && result.data.length > 0) {
        //             console.log("updated result", result);
        //             jQuery('#editSubCategory').modal('hide');
        //             this.ngOnInit();
        //             swal("Good job!", "SubCategory Updated Successfully!", "success");
        //         } else {
        //             sweetAlert("Oops...", "Something went wrong!", "error");
        //         }
        //     }
        // )
    }
    editsubCatData(url) {
        this._subcategoriesService.editCategory(this.oldName, this.newName, url).subscribe(
            result => {
                if (result.data && result.data.length > 0) {
                    // console.log("updated result", result);
                    jQuery('#editSubCategory').modal('hide');
                    this.ngOnInit();
                    swal("Good job!", "SubCategory Updated Successfully!", "success");
                } else {
                    sweetAlert("Oops...", "Something went wrong!", "error");
                }
            }
        )
    }
    gotoDeleteSubcate(subcategory) {
        var cat = this;
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this SubCategory!",
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
                    cat.deletesubcategory(subcategory);
                    swal({
                        title: 'Delete!',
                        text: 'SubCategory Deleted Successfully!',
                        type: 'success'
                    });

                } else {
                    swal("Cancelled", "Your Sub Category is safe :)", "error");
                }
            });
    }
    deletesubcategory(subcategory) {
        this._subcategoriesService.deletesubcategory(subcategory).subscribe(
            result => {
                // console.log("delete result", result);
                this.ngOnInit();

            }
        )
    }
}
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
//import { NgxGalleryImageComponent } from '@kolkov/ngx-gallery/lib/ngx-gallery-image/ngx-gallery-image.component';
import { Member } from 'src/app/models/member';

import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: Member;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  
  constructor(private memberServices: MembersService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadMember();
    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      }
    ]
  }

  

  loadMember() {
    //route.snapshot.paramMap.get() is used to access a parameter in a url
    this.memberServices.getMember(this.route.snapshot.paramMap.get('username') || '{}').subscribe(response => {
      this.member = response;
      this.galleryImages = this.getImages();
    })
    
  }

  getImages(): NgxGalleryImage [] {
    const imageUrls = [];
    for(const photo of this.member.photos)
    {
      imageUrls.push ( {
      small: photo?.url,
      medium: photo?.url,
      big: photo?.url,

      })
    }
    return imageUrls;
  }

}

import { ModalService } from 'src/app/service/modal.service';
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { Location } from '../../model/location';
import { LocationService } from '../../service/location.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import { DialogService } from "src/app/service/dialog.service";

@Component({
  selector: 'app-location-edit',
  templateUrl: './location-edit.component.html',
  styleUrls: ['./location-edit.component.css']
})
export class LocationEditComponent implements OnInit {

  location: Location;
  requestStatus: Number;
  zoom: number;
  geoCoder;
  address: string;
  countName = 20;
  isName = false;

  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    private service: LocationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private router: Router,
    private route: ActivatedRoute,
    private modalSer: ModalService,
    private dialogSer: DialogService,
  ) { }

  ngOnInit() {
    const itemId = +this.route.snapshot.params['id'];
    this.findById(itemId);
    this.requestStatus = 0;

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.zoom = 15;

      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.location.latitude = place.geometry.location.lat();
          this.location.longitude = place.geometry.location.lng();
          this.location.address = place.formatted_address;
          this.zoom = 15;
        });
      });
    });
  }

  findById(itemId) {
    this.location = new Location();
    this.service.searchById(itemId).subscribe(result => {
      this.location = result;
    })
  }

  update(locationForm: NgForm) {
    this.requestStatus = 1;
    this.service.update(this.location).subscribe(result => {
      this.requestStatus = result;
      if (this.requestStatus == 200) {
        this.dialogSer.init("Update Location", "Successfull updated", undefined, undefined);
        this.router.navigateByUrl('/location')
      }
    },
      error => {
        if (error.status == 409) {
          this.dialogSer.init("Update Location", "Name or Address is existed!", undefined, undefined);
          this.requestStatus = 0;
        } else if ((error.status = 404)) {
          this.dialogSer.init("Update Location", "Fail to update", undefined, undefined);
          this.requestStatus = 0;
        }
      }
    );
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  back() {
    this.router.navigateByUrl("/location");
  }

  wordCountName(event) {
    this.isName = false;
    var key_length = event.split(' ').length;
    this.countName = 21 - key_length;
    if (key_length > 21) {
      this.isName = true;
    }
  }
}

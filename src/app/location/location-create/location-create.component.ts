import { Router } from "@angular/router";
import { ModalService } from "./../../service/modal.service";
import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  NgZone
} from "@angular/core";
import { Location } from "../../model/location";
import { LocationService } from "../../service/location.service";
import { NgForm } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import { PlatformLocation } from "@angular/common";
import { DialogService } from "src/app/service/dialog.service";

@Component({
  selector: "app-location-create",
  templateUrl: "./location-create.component.html",
  styleUrls: ["./location-create.component.css"]
})
export class LocationCreateComponent implements OnInit {
  location: Location;
  requestStatus: Number;
  zoom: number;
  geoCoder;
  address: string;
  countName = 20;
  isName = false;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  constructor(
    private service: LocationService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private modalSer: ModalService,
    private router: Router,
    private dialogSer: DialogService,
  ) { }

  ngOnInit() {
    this.location = new Location();
    this.requestStatus = 0;

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder();

      let autocomplete = new google.maps.places.Autocomplete(
        this.searchElementRef.nativeElement,
        {
          types: ["address"]
        }
      );
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

  create(locationForm: NgForm) {
    this.requestStatus = 1;
    this.service.create(this.location).subscribe(
      result => {
        if (result == 201) {
          this.dialogSer.init("Create Location", "Create Successfull", undefined, undefined);
          this.router.navigateByUrl('/location');
        }
      },
      error => {
        if (error.status == 409) {
          this.dialogSer.init("Create Location", "Name or Address is existed!", undefined, undefined);
          this.requestStatus = 0;
        } else if ((error.status = 404)) {
          this.dialogSer.init("Create Location", "Fail to create", undefined, undefined);
          this.requestStatus = 0;
        }
      }
    );
  }

  setCurrentLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        this.location.latitude = position.coords.latitude;
        this.location.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.location.latitude, this.location.longitude);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode(
      { location: { lat: latitude, lng: longitude } },
      (results, status) => {
        if (status === "OK") {
          if (results[0]) {
            this.zoom = 15;
            this.address = results[0].formatted_address;
          } else {
            window.alert("No results found");
          }
        } else {
          window.alert("Geocoder failed due to: " + status);
        }
      }
    );
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

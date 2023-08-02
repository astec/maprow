import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ViewChild } from "@angular/core";
import { ElementRef } from "@angular/core";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent {
  loginForm: FormGroup | any;
  title = "Login With Google";
  auth2: any;
  @ViewChild("loginRef", { static: true }) loginElement!: ElementRef;

  constructor(private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl("", [
        Validators.required,
        Validators.email,
        Validators.pattern("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$"),
      ]),
      password: new FormControl("", [
        Validators.required,
        Validators.pattern('((?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,30})'),
      ]),
    });
  }

  ngOnInit() {
    this.googleAuthSDK();
  }

  callLogin() {
    this.auth2.attachClickHandler(
      this.loginElement.nativeElement,
      {},
      (googleAuthUser: any) => {
        let profile = googleAuthUser.getBasicProfile();

        // Store user information in Session Storage
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            token: googleAuthUser.getAuthResponse().id_token,
            imageUrl: profile.getImageUrl(),
            id: profile.getId(),
            email: profile.getEmail(),
            name: profile.getName(),
          })
        );
      },
      (error: any) => {
        alert(JSON.stringify(error, undefined, 2));
      }
    );
  }

  googleAuthSDK() {
    (<any>window)["googleSDKLoaded"] = () => {
      (<any>window)["gapi"].load("auth2", () => {
        this.auth2 = (<any>window)["gapi"].auth2.init({
          client_id:
            "669721814180-phfqn6ngp2gl0jmram59vpt39keq9ej4.apps.googleusercontent.com",
          plugin_name: "login",
          cookiepolicy: "single_host_origin",
          scope: "profile email",
        });
        this.callLogin();
      });
    };

    (function (d, s, id) {
      var js,
        fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
        return;
      }
      js = d.createElement("script");
      js.id = id;
      js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
      fjs?.parentNode?.insertBefore(js, fjs);
    })(document, "script", "google-jssdk");
  }

  onSubmit() {
    console.log("Przycisk Zaloguj się został kliknięty!");
    if (!this.loginForm.valid) {
      return;
    }
    this.router.navigate(['/login']);
  }
}

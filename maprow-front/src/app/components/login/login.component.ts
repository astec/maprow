import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'],
})
export class LoginComponent {
	loginForm: FormGroup | any;
	title = 'material-login';

	constructor(private router: Router) {
		this.loginForm = new FormGroup({
			email: new FormControl('', [
				Validators.required,
				Validators.email,
				Validators.pattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,63}$'),
			]),
			password: new FormControl('', [
				Validators.required,
				Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[.,!@#$%^&*_=+-]).{8, 20}$'),
			]),
		});
	}


	onSubmit() {
		if (!this.loginForm.valid) {
			return;
		}
		localStorage.setItem('user', this.loginForm.value);
		this.router.navigate(['/home']);
	}
}

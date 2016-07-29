import { Component, OnInit } from '@angular/core'
import { HTTP_PROVIDERS } from '@angular/http'

@Component({
	selector: 'app',
	templateUrl: 'app/app.component.html',
    styleUrls: ['app/app.component.css'],
	providers: [
		HTTP_PROVIDERS
	]
})

export class AppComponent implements OnInit {
	constructor() {}

	ngOnInit() {}
}
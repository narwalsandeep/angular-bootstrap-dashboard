import { Component,Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/**
 * 
 */
@Injectable()
export class FileHelper {

	selectedFile: File;

	/**
	 * 
	 * @param http 
	 */
	constructor(private http: HttpClient){

	}

	/**
	 *  return only the file name to show locally in placeholder
	 *  does not actually upload the file
	 */
	public onFileChanged(event,cb): any {
		let url = "";
		if (event.target.files) {
			console.log(event.target.files);
			this.selectedFile = event.target.files[0];
			var reader = new FileReader();
			reader.onload = (event: any) => {
				cb(event.target.result,this.selectedFile);
			}
			reader.readAsDataURL(event.target.files[0]);
		}
	}

	/**
	 * 
	 */
	public onUpload(url) {
		const uploadData = new FormData();
		uploadData.append('file', this.selectedFile);

		this.http.post(url, uploadData, {
			reportProgress: true,
			observe: 'events'
		}).subscribe(event => {
			console.log(event);

		});
	}
}
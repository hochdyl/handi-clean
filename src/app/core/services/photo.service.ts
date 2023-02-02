import { Injectable } from '@angular/core';

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
	providedIn: 'root'
})
export class PhotoService {

	public photo;

	constructor() {
	}

	// public async takePicture() {
	// 	const image = await Camera.getPhoto({
	// 		quality: 100,
	// 		width:400,
	// 		allowEditing: false,
	// 		resultType: CameraResultType.DataUrl,
	// 		source: CameraSource.Prompt
	// 	});
	// 	console.log(image);
	// 	this.photo = image.dataUrl;
	// }
  public takePicture() {
    return Camera.getPhoto({
      quality: 100,
      width:400,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Prompt,
    }).then(image => {
      this.photo = image.dataUrl;
      return image;
    });
  }

	async getPhoto(){
		return this.photo;
	}

}

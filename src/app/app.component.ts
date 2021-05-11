import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import * as tmImage from '@teachablemachine/image';
@Component({
 selector: 'app-root',
 templateUrl: './app.component.html',
 styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
 url = 'https://teachablemachine.withgoogle.com/models/r7aSS2SO';
 model: any;
 predictions: any;
 webcam: any; 
 maxPredictions: any;
 loading: boolean = true;

 @ViewChild("video", { static: true}) video: ElementRef;


 ngOnInit(){}

 async ngAfterViewInit() {

  const modelURL = this.url + '/model.json';
  const metadataURL = this.url + '/metadata.json';
  this.model = await tmImage.load(modelURL, metadataURL);
  this.maxPredictions = this.model.getTotalClasses();
  // Convenience function to setup a webcam
  const flip = true; // whether to flip the webcam 
  this.webcam = new tmImage.Webcam(640, 480, flip);
  await this.webcam.setup(); // request access to the webcam
  this.loading= false;
  await this.webcam.play();
  requestAnimationFrame(() =>
   this.loop()
  );
  this.video.nativeElement.appendChild(this.webcam.canvas);
 }

async loop() {
 this.webcam.update(); // update the webcam frame
 this.predictions = await this.model.predict(this.webcam.canvas,  true);
 requestAnimationFrame(() =>
  this.loop()
 );
 }
}
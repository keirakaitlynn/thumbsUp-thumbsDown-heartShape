let video;
let handPose;
let hands;

function modelReady() {
  console.log('hand pose loaded');
  handpose.on('predict', results => {
    // do something with the results
    hands = results;
  });
}



function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  // video.size(320, 240);
  const options = {};
  handpose = ml5.handpose(video, options, modelReady);


}

function draw() {
  background(0);
  if (video) {
    image(video, 0, 0);
  }
  if (hands && hands.length > 0) {
    // console.log(hands.length);
    for (let hand of hands) {

      let annotations = hand.annotations;
      let thumb = annotations.thumb;
      fill(0, 255, 0);
      noStroke();
      ellipse(thumb[3][0], thumb[3][1], 24);

      // let tx = thumb[3][0];
      let ty = thumb[3][1];

      let thumbsup = true;
      let thumbsdown = true;

      let parts = Object.keys(annotations);
      let count = 0;
      for (let part of parts) {
        for (let position of annotations[part]) {
          let [x, y, z] = position;
          if (y < ty) {
            thumbsup = false;
          } else if (y > ty) {
            thumbsdown = false;
          }
        }
      }

      textAlign(CENTER, CENTER);
      textSize(256);


      if (thumbsup) {
        text('👍', width / 2, height / 2);
      } 
      
      if (thumbsdown) {
        text('👎', width / 2, height / 2);
      }



    }
  }





  // image(video, 0, 0);

}
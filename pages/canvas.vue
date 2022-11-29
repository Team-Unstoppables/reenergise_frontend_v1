<template>
  <div class="lg:container md:container-fluid mx-auto mt-5 pb-12">
    <div class="info">
      <p class="points-info">No points yet</p>
      <input type="text" placeholder="Image URL">
    </div>
    <div class="output">
      <canvas></canvas>
      <div class="zoom"></div>
    </div>
  </div>
</template>

<script >
  definePageMeta({ layout: 'guest' })
  export default {

  mounted(){
    var canvas = document.querySelector("canvas");
    var context = canvas.getContext("2d");
    var infoPoints = document.querySelector(".points-info");
    var picker = document.querySelector("input")
    var zoomWindow = document.querySelector(".zoom")
    var clickPoints = [];
    let pointsArrays = []
    let coord = "28.4611843,77.4997898"
    let index = 0
    canvas.addEventListener("click", evt => {
      index++

      clickPoints.push([evt.offsetX, evt.offsetY])
      drawDot(evt.offsetX, evt.offsetY)
      infoPoints.textContent = clickPoints.join(" : ")
      if (clickPoints.length % 5 == 0) drawPoly(clickPoints)
    })

    picker.addEventListener("change", evt => {
      newImage(evt.target.value)
    })

    // draw polygon from a list of 4 points
    const drawPoly = points => {
      console.log(points);
      context.lineWidth = 2
      //context.clearRect(0, 0, canvas.width, canvas.height)
      var split = points.splice(0, 5)
      pointsArrays.push({index : split})
      console.log(split);
      context.beginPath()
      context.moveTo(split[0][0], split[0][1])
      for(let i of split.reverse())
      {context.lineTo(i[0], i[1])}

      context.stroke()
      context.rect(split.reverse()[0], split.reverse()[1], split.reverse()[2], split.reverse()[3]);
      context.fillStyle = "#0000ff4d"
      context.fill();
      console.log(pointsArrays);
    }

    // draw a dot.
    const drawDot = (x, y) => {
      context.beginPath()
      context.arc(x, y, 2, 0, 2*Math.PI);

      context.fill()
    }

    // resize the canvas for the image
    var biggest = 500;
    var axis
    const resize = (x, y) => {
      console.log("resize :"+x+"; y:"+y);
      // so that the biggest axis is always {biggest} px
      var ratio = x > y ? x / biggest : y / biggest
      axis = [x / ratio, y / ratio]
      canvas.height = axis[0]
      canvas.width = axis[1]
    }

    // load a new image
    var rawImg = new Image()
    const newImage = src => {
      rawImg.src = src
      rawImg.onload = () => {
        canvas.style.backgroundImage = "url(" + src + ")"
        zoomWindow.style.backgroundImage = "url(" + src + ")"
        console.log(canvas.style.backgroundImage, zoomWindow.style.backgroundImage)
        resize(rawImg.height, rawImg.width)
      };
    }

    //newImage("https://previews.123rf.com/images/marysan9/marysan91905/marysan9190500016/122553443-set-of-realistic-vector-banana-branch-of-bananas-half-peeled-banan-and-single-banana-isolated-on-whi.jpg")
    newImage(`https://maps.googleapis.com/maps/api/staticmap?center=${coord}&zoom=18&size=800x400&maptype=satellite&scale=4&key=${config.googleMapKey}`)

    // move the preview to the mouse
    canvas.addEventListener("mousemove", (evt) => {
      drawZoom(evt.clientX, evt.clientY)
    })

    const drawZoom = (x, y) => {
      zoomWindow.style.backgroundPosition = x  + "% " + y +"%"
      zoomWindow.position.top = x + "px"
    }
    }

  }


</script>

<style scoped>

canvas {
	width: 500px;
	display: inline-block;
/* 	border: 3px solid #333;
 */	background-size: cover;
	cursor: crosshair;
}

.zoom {
	width: 100px;
	height: 100px;
	border: 3px solid #333;
	background-size: fill;
	border-radius: 50px;
	cursor: crosshair;
}

.magnify {
	width: 100px;
	height: 100px;
	background: black;
	background-size: 400%;
	border: 2px solid #333;
}


</style>

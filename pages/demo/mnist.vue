<template>
  <v-container fluid>
    <article>
      <h1>Handwritten Number Recognition ML Demo</h1>
      <v-row>
        <v-col cols="12" sm="6">
          <div id="paint" ref="paint" class="painter">
            <canvas
              id="number_painter"
              ref="number_painter"
              @mousedown="startPaint"
              @mousemove="trackMouse"
              @mouseup="endPaint"
              @touchstart="touchStart"
              @touchmove="touchMove"
              @touchend="touchEnd"
            ></canvas>
          </div>
          <v-btn @click="clearCanvas">Clear</v-btn>
        </v-col>
        <v-col class="results" cols="12" sm="6">
          <div id="predicted">
            <h2>You wrote:</h2>
            <v-progress-circular
              v-show="isPredicting"
              class="progress_spinner"
              indeterminate
            ></v-progress-circular>
            <h2>{{ predicted }}</h2>
          </div>
          <div id="processed" ref="processed">
            <h2>I see:</h2>
            <canvas id="approx_painter" ref="approx_painter"></canvas>
          </div>
        </v-col>
      </v-row>
      <p>
        The number recognizer uses a basic CNN network model trained on the
        MNIST dataset to recognize handwriting input of digits. This model has
        an approximately 0.89% error rate on the test set, meaning it
        <em>should</em> get most handwriting input correct. (insert disclaimer
        here)
      </p>
      <p>
        For more information, check out my upcoming article - stay tuned!
      </p>
    </article>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      isPainting: false,
      isPredicting: false,
      paintContext: null,
      mouse: { x: 0, y: 0 },
      offsetLeft: 0,
      offsetTop: 0,
      predicted: null,
      model: null
    };
  },
  mounted() {
    //load tensorflow script only for this component
    const tensorflow = document.createElement('script');
    tensorflow.setAttribute(
      'src',
      'https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@1.5.2/dist/tf.min.js'
    );
    document.head.appendChild(tensorflow);

    //set the canvas size
    const paint = this.$refs.paint;
    const computedStyle = getComputedStyle(paint);

    this.$refs.number_painter.width = parseInt(
      computedStyle.getPropertyValue('width')
    );
    this.$refs.number_painter.height = this.$refs.number_painter.width;

    //set approx painter size
    const size = 280;
    const painter = this.$refs.approx_painter;
    painter.width = size;
    painter.height = size;

    //https://stackoverflow.com/questions/11805955/how-to-get-the-distance-from-the-top-for-an-element
    this.offsetLeft = paint.getBoundingClientRect().left + window.pageXOffset;
    this.offsetTop = paint.getBoundingClientRect().top + window.pageYOffset;

    this.paintContext = this.$refs.number_painter.getContext('2d');
    this.paintContext.strokeStyle = 'white';
    this.paintContext.lineJoin = 'round';
    this.paintContext.lineCap = 'round';
    this.paintContext.lineWidth = 50;
  },
  methods: {
    //much of the code is derived from https://github.com/carlos-aguayo/carlos-aguayo.github.io/blob/master/tfjs.html
    startPaint(e) {
      this.isPainting = true;
      this.paintContext.beginPath();
      this.setMouseWithOffset(e);
      this.paintContext.moveTo(this.mouse.x, this.mouse.y);
    },
    setMouseWithOffset(e) {
      this.mouse.x = e.clientX - this.offsetLeft;
      this.mouse.y = e.clientY - this.offsetTop;
    },
    trackMouse(e) {
      this.setMouseWithOffset(e);
      if (this.isPainting) {
        this.paintContext.lineTo(this.mouse.x, this.mouse.y);
        this.paintContext.stroke();
      }
    },
    endPaint(e) {
      this.isPainting = false;

      const img = this.$refs.number_painter;
      this.paintContext.drawImage(img, 0, 0, 28, 28);
      const data = this.paintContext.getImageData(0, 0, 28, 28).data;

      var input = [];
      for (var i = 0; i < data.length; i += 4) {
        input.push(data[i + 2] / 255);
      }
      this.drawApproximation(input);
      this.predict(input);
    },
    drawApproximation(input) {
      const ctx = this.$refs.approx_painter.getContext('2d');

      for (let y = 0; y < 28; y++) {
        for (let x = 0; x < 28; x++) {
          let block = ctx.getImageData(x * 10, y * 10, 10, 10);
          let newVal = 255 * input[y * 28 + x];

          for (var i = 0; i < 4 * 10 * 10; i += 4) {
            block.data[i] = newVal;
            block.data[i + 1] = newVal;
            block.data[i + 2] = newVal;
            block.data[i + 3] = 255;
          }
          ctx.putImageData(block, x * 10, y * 10);
        }
      }
    },
    async predict(input) {
      this.isPredicting = true;
      if (!this.model) {
        this.model = await tf.loadLayersModel('/mnist/model.json');
      }
      let scores = await this.model
        .predict([tf.tensor(input).reshape([1, 28, 28, 1])])
        .array();
      scores = scores[0];
      this.predicted = scores.indexOf(Math.max(...scores));
      this.isPredicting = false;
    },
    clearCanvas(e) {
      const size = this.$refs.number_painter.width;
      this.paintContext.clearRect(0, 0, size, size);
      // this.paintContext.beginPath();
      this.predicted = null;
    },
    touchStart(e) {
      this.eventHelper(e.touches[0], 'mousedown');
    },
    touchMove(e) {
      this.eventHelper(e.touches[0], 'mousemove');
    },
    touchEnd(e) {
      this.eventHelper(e.touches[0], 'mouseup');
    },
    eventHelper(touch, eventString) {
      let newParams = {};
      if (touch) {
        newParams = {
          clientX: touch.clientX,
          clientY: touch.clientY
        };
      }
      this.$refs.number_painter.dispatchEvent(
        new MouseEvent(eventString, newParams)
      );
    }
  }
};
</script>

<style scoped>
.painter {
  border: 3px solid orange;
}
.results {
  color: orange;
}
#scaled_image {
  height: 28px;
  width: 28px;
  border: 3px solid orange;
}
</style>

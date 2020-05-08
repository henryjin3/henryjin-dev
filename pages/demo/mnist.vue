<template>
  <v-container>
    <article>
      <h1>{{ title }}</h1>
      <p>{{ description }}</p>
      <v-row>
        <v-col cols="12" sm="6">
          <div id="paint" ref="paint" class="painter">
            <canvas
              id="number_painter"
              ref="number_painter"
              @mousedown="startPaint"
              @mousemove="keepPainting"
              @mouseup="endPaint"
              @touchstart="touchEventConverter($event, 'mousedown')"
              @touchmove="touchEventConverter($event, 'mousemove')"
              @touchend="touchEventConverter($event, 'mouseup')"
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
        The handwriting recognizer uses a basic convolutional neural network
        (CNN) model trained on the well-known
        <a href="http://yann.lecun.com/exdb/mnist/">MNIST</a>
        dataset to recognize single digit numeric input. This model has an
        approximately 0.89% error rate on the test set, meaning it
        <em>should</em> get most handwriting input correct. Note that since the
        training data is focused specifically on handwriting, it may have a
        higher error rate for those of you drawing with a mouse.
      </p>
      <p>
        For more information, check out my
        <n-link
          to="/writing/mobile-friendly-numeric-handwriting-recognition-on-the-web-using-tensorflowjs"
          >article</n-link
        >
        on how I made this.
      </p>
    </article>
  </v-container>
</template>

<script>
const MODEL_INPUT_SIZE = 28;
const APPROX_IMAGE_MULTIPLIER = 10;

export default {
  head() {
    return {
      title: 'Henry | ' + this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ]
    };
  },
  data() {
    return {
      isPainting: false,
      isPredicting: false,
      paintContext: null,
      approxContext: null,
      mouse: { x: 0, y: 0 },
      predicted: null,
      model: null,
      title: 'Handwritten Number Recognition: A Machine Learning Demo',
      description:
        'A browser-based handwriting recognizer using deep learning and TensorFlow.js.'
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
    this.$refs.number_painter.width = parseInt(
      getComputedStyle(this.$refs.paint).getPropertyValue('width')
    );
    this.$refs.number_painter.height = this.$refs.number_painter.width;

    //set up painter
    this.paintContext = this.$refs.number_painter.getContext('2d');
    this.paintContext.strokeStyle = 'white';
    this.paintContext.lineJoin = 'round';
    this.paintContext.lineCap = 'round';
    this.paintContext.lineWidth = 50;

    //set up painter for image approximation
    this.$refs.approx_painter.width =
      MODEL_INPUT_SIZE * APPROX_IMAGE_MULTIPLIER;
    this.$refs.approx_painter.height =
      MODEL_INPUT_SIZE * APPROX_IMAGE_MULTIPLIER;
    this.approxContext = this.$refs.approx_painter.getContext('2d');
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
      const bounds = this.$refs.paint.getBoundingClientRect();

      // account for initial canvas position in relation to other elements on the page
      const pageOffsetLeft = bounds.left + window.pageXOffset;
      const pageOffsetTop = bounds.top + window.pageYOffset;

      // and also account for scrolling
      this.mouse.x = e.clientX - pageOffsetLeft + window.scrollX;
      this.mouse.y = e.clientY - pageOffsetTop + window.scrollY;
    },
    keepPainting(e) {
      this.setMouseWithOffset(e);
      if (this.isPainting) {
        this.paintContext.lineTo(this.mouse.x, this.mouse.y);
        this.paintContext.stroke();
      }
    },
    endPaint(e) {
      this.isPainting = false;
      this.isPredicting = true;

      // clear out part of our approximation image - just using it for convenience, since we're
      // going to be clearing it out anyways.
      this.approxContext.clearRect(0, 0, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE);

      // scale down the handwritten image
      this.approxContext.drawImage(
        this.$refs.number_painter,
        0,
        0,
        MODEL_INPUT_SIZE,
        MODEL_INPUT_SIZE
      );

      // get the scaled image data out
      const data = this.approxContext.getImageData(
        0,
        0,
        MODEL_INPUT_SIZE,
        MODEL_INPUT_SIZE
      ).data;

      var input = [];
      for (var i = 0; i < data.length; i += 4) {
        input.push(data[i + 2] / 255); // since it's all grayscale, we don't care about RGBA
      }

      this.drawApproximation(input);
      this.predict(input);
    },
    drawApproximation(input) {
      const ctx = this.approxContext;
      ctx.clearRect(
        0,
        0,
        MODEL_INPUT_SIZE * APPROX_IMAGE_MULTIPLIER,
        MODEL_INPUT_SIZE * APPROX_IMAGE_MULTIPLIER
      );

      for (let y = 0; y < MODEL_INPUT_SIZE; y++) {
        for (let x = 0; x < MODEL_INPUT_SIZE; x++) {
          let block = ctx.getImageData(
            x * APPROX_IMAGE_MULTIPLIER,
            y * APPROX_IMAGE_MULTIPLIER,
            APPROX_IMAGE_MULTIPLIER,
            APPROX_IMAGE_MULTIPLIER
          );
          let newVal = 255 * input[y * MODEL_INPUT_SIZE + x];

          for (
            var i = 0;
            i < 4 * APPROX_IMAGE_MULTIPLIER * APPROX_IMAGE_MULTIPLIER;
            i += 4
          ) {
            block.data[i] = newVal;
            block.data[i + 1] = newVal;
            block.data[i + 2] = newVal;
            block.data[i + 3] = 255;
          }
          ctx.putImageData(
            block,
            x * APPROX_IMAGE_MULTIPLIER,
            y * APPROX_IMAGE_MULTIPLIER
          );
        }
      }
    },
    async predict(input) {
      if (!this.model) {
        //clear up TensorFlow since during hot reloading it's still there
        tf.disposeVariables();

        this.model = await tf.loadLayersModel('/mnist/model.json');
      }
      let scores = await this.model
        .predict([
          tf.tensor(input).reshape([1, MODEL_INPUT_SIZE, MODEL_INPUT_SIZE, 1])
        ])
        .array();
      scores = scores[0];
      this.predicted = scores.indexOf(Math.max(...scores));

      this.isPredicting = false;
    },
    clearCanvas(e) {
      const size = this.$refs.number_painter.width;
      this.paintContext.clearRect(0, 0, size, size);
      this.approxContext.clearRect(
        0,
        0,
        MODEL_INPUT_SIZE * APPROX_IMAGE_MULTIPLIER,
        MODEL_INPUT_SIZE * APPROX_IMAGE_MULTIPLIER
      );
      this.predicted = null;
    },
    touchEventConverter(e, eventString) {
      e.preventDefault();
      const touch = e.touches[0];

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

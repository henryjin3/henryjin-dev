---
title: Mobile-Friendly Numeric Handwriting Recognition on the Web using TensorFlow.js
date: 2020-04-30T12:00:00.000Z
description: Machine learning in action! Learn how to make a handwriting recognizer which uses a deep learning neural network and deploy it into your Vue.js app.
---

First, try it out!

https://henryjin.dev/demo/mnist/

(demo gif here soon)

This is a machine learning model running totally in the browser using TensorFlow.js&mdash;no external service required!

Just want the code? Here you go!

- [Google Colab Notebook](https://colab.research.google.com/gist/henryjin3/e8fd4d893116103bc1b03b6f50f18175/mnist-demo.ipynb)
- [Vue Demo Page](https://github.com/henryjin3/henryjin-dev/blob/master/pages/demo/mnist.vue)

Otherwise, stick with me after the break to learn the following:

1. How to create and export a basic deep learning model
2. Make a Vue.js&ndash;based demo page and set up the canvas

---

## Create and Export a Deep Learning Model

We're going to start by firing up [Google Colab](https://colab.research.google.com/), a browser-based environment which allows you to run Python-based [Jupyter Notebooks](https://jupyter.org/). These are the standard for machine learning in Python, and make it easy to collaborate and develop machine learning models.

### Training Data

We will be using the famous [MNIST](http://yann.lecun.com/exdb/mnist/) dataset, which is often used in courses which teach machine learning and vision recognition. This is a dataset which consists of handwritten digits, as below:

![mnist-data](/mnist/mnist-data.png)_Josef Steppan `[`[CC BY-SA](https://creativecommons.org/licenses/by-sa/4.0)`]`_

> I won't be going into the details of how to design the neural network itself. This is much better explained [here](https://machinelearningmastery.com/handwritten-digit-recognition-using-convolutional-neural-networks-python-keras/), although some of the code needed to be updated for the latest version of TensorFlow. You can see my code [here](https://colab.research.google.com/gist/henryjin3/e8fd4d893116103bc1b03b6f50f18175/mnist-demo.ipynb).

Once you have created your model and trained it, all you need to export it are three commands:

```Python
model.save("model.h5")

!pip install tensorflowjs

!tensorflowjs_converter --input_format keras '/content/model.h5' '/content/model'
```

Finally, in the left nav click on the folder icon and under the `model` folder you should see a `model.json` file as well as a `group1-shard1of1.bin` file. Download both of these by right-clicking and hitting "Download".

![colab download](/mnist/colab-download.png)

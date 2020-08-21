---
title: How to Log a HIPAA App (or Multiple HIPAA Apps) using Heroku Private Space Logging
date: 2020-08-21T00:00:00.000Z
description: It’s difficult to log healthcare and other sensitive-data apps—for a few reasons.
---

## Introduction

It’s difficult to log healthcare and other sensitive-data apps—for a few reasons.

First, these apps must comply with the Health Insurance Portability and Accountability Act of 1996 (HIPPA): a set of national standards regarding the privacy and security of health care information. HIPAA applications have significantly more burdensome compliance requirements than your average application, especially when it comes to logging and audit trails.

Second, data breaches are becoming more and more common and can lead to significant liability issues, especially for large organizations. Because of this, securely managing and storing these logs has become extremely important.

Finally, on the technology side, the trend is towards heterogenous architectures with microservices and cloud-based infrastructure. While this can provide velocity and flexibility benefits, it can also make it difficult to standardize. Ensuring that HIPAA-compliance requirements are applied across all your applications can be a difficult and manual process fraught with errors.

In this article, we will look at how Heroku Private Space Logging can ease this burden by [centralizing log capture in a HIPPA-compliant and secure environment](https://devcenter.heroku.com/articles/logging-best-practices-guide?preview=1#logging-for-shield-private-spaces).

## Heroku Private Spaces and Heroku Shield

![private-space](~/assets/content/writing/how-to-log-a-hipaa-app-or-multiple-hipaa-apps-using-heroku-private-space-logging/private-space.png)

First, let’s look at exactly what Heroku Private Spaces and Heroku Shield are all about.

[Heroku Private Spaces](https://www.heroku.com/private-spaces) are isolated and dedicated runtime environments, which each have their own private network. This provides a safe network topology for your HIPAA applications and services, allowing them to safely interact with each other within the confines of the private network. This lets you redirect some of the onus of HIPAA compliance from each individual app to the Private Space. From an application architecture standpoint, this allows you to gain the benefits of microservices and cloud-based infrastructure (easier-to-maintain applications, smaller team size, flexibility in technologies, near-instant and flexible scalability, etc.), while letting Private Spaces enforce safe communication within the space.

![shield](~/assets/content/writing/how-to-log-a-hipaa-app-or-multiple-hipaa-apps-using-heroku-private-space-logging/shield.png)

In addition to the set of features you get with Private Spaces, [Heroku Shield](https://www.heroku.com/shield) adds another layer of security for regulated industries requiring high compliance applications. Features include requiring shield dynos and database plans, stricter encryption requirements for all connections, and the ability to manage logging at the space level. This last feature, Heroku Private Space Logging, is the focus of this article. (Please note that Shield Private Spaces come at an additional cost.)

## How does Heroku Private Space Logging work?

[Heroku Private Space Logging](https://devcenter.heroku.com/articles/private-space-logging), available only on Shield Private Spaces, allows you to configure log capture at the space level for all applications residing in the space. This means that all log events from both your apps, as well as Heroku databases and services, will be captured and then forwarded to a log capture destination. This can save a significant amount of development effort because developers will no longer need to set up a consistent log configuration for each application. Provided that the log messages are occurring, Private Space Logging will pick them up and securely send them to the log capture destination.

Additionally, centralizing log capture allows for easier auditing. Auditors can simply verify that log capture is configured correctly for the entire space. This configuration will persist regardless of what applications are added or removed from the space—again simplifying the auditing task.

## How to set up Heroku Private Space Logging

Given all the features provided, it is remarkably simple to set up logging for a Heroku Shield Private Space. The process consists of just a few main steps:

1. Prerequisites
2. Set up a Log Capture Destination
3. Set up a Heroku Shield Private Space with Logging Enabled
4. Add a Sample Application to Test Logging

Let’s make sure we have all the prerequisites ready to go.

### Prerequisites

You will need the following setup before beginning:

1. A Heroku Enterprise account. If you do not currently have one, you will need to contact Heroku Sales.
2. A Heroku team within the Enterprise account where you have admin permissions. Admin permissions are required to create spaces. Make note of the team name; we will need this later.
3. An installed Heroku CLI. After installing, login with the heroku login command. This will take you to a browser page to complete the login.

That’s it! We’re ready to get started.

### Set up a Log Capture Destination

For this tutorial, we will be using [LogDNA](https://logdna.com/), a cloud-based logging capture service, which supports Heroku Shield Private Spaces. You can see some of the other supported providers [here](https://devcenter.heroku.com/articles/private-space-logging#capture-logs). The setup of this is quick and simple.

1. [Sign up](https://logdna.com/sign-up/) for an account and verify your email.
2. Set an organization name.
3. Choose source “Heroku.” LogDNA will then show you an approach to setting the drain URL for Shield Spaces.

   1. ![log-drain](~/assets/content/writing/how-to-log-a-hipaa-app-or-multiple-hipaa-apps-using-heroku-private-space-logging/log-drain.png)

4. Save the URL inside the command generated by LogDNA.

   1. Be aware that this is not the command which is necessary to create the Shield Space. The required URL is contained within this command. We will refer to this URL later as `<my-log-url>`.

   2. Also note that this URL contains a placeholder for the name of the space. This placeholder will need to be filled when we create the space in the next step.

This log capture destination is now ready to start receiving logs. Let’s set up a Shield Private Space with a sample application to feed it some data.

### Set up a Heroku Shield Private Space with Logging Enabled

It is important to note that in order to use Private Space Logging, **you must enable it at the time when you create the space.** It is not possible to turn on this feature after the space has already been created. It is, however, possible to change the log capture destination for a space if the feature was enabled at the time of creation.

Using your team name and log drain URL, let’s create a new space with a new name. In this case, I am using `my-hipaa-space` as the space name. Make sure to update `<my-log-url>` with the name of your space, and then execute the command below.

```powershell
heroku spaces:create <my-space-name> --shield --team <my-team-name> --log-drain-url <my-log-url>
```

Please note that there are [additional options for this command](https://devcenter.heroku.com/articles/heroku-cli-commands#heroku-spaces-create), which allow you to set other options including the region. Private Spaces can only be created in certain regions specified by Heroku (you can see the current list [here](https://devcenter.heroku.com/articles/private-spaces#regions)).

![create-space](~/assets/content/writing/how-to-log-a-hipaa-app-or-multiple-hipaa-apps-using-heroku-private-space-logging/create-space.png)

Allocation will take some time; in my case, it took roughly ten minutes. You can use `heroku spaces:wait my-hipaa-space` to get a live update on the status.

Once the space is finished allocating, you can now use this space for your HIPAA-compliant apps! Let’s go ahead and test the logging setup by adding a sample application.

### Add a Sample Application to Test Logging

To test the logging setup, any application could be added to this space. For demonstrative purposes, I have created a repository at https://github.com/henryjin3/heroku-logging-react-app. This repository is a React SPA application, which is based off of the [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html#create-react-app) starter template. Feel free to fork this application and modify it as you wish.

To get started, let’s create the app in the Shield Private Space. Since this is a create-react-app, we will use the mars/create-react-app buildpack. I will use `heroku-logging-react-app` as my application name. Below, you can see both the general version of the command and the one specific to this example:

```powershell
heroku apps:create <my-app-name> --space=<my-space-name> -b mars/create-react-app
heroku apps:create heroku-logging-react-app --space my-hipaa-space -b mars/create-react-app
```

After executing the command, you should see something similar to the following:

![create-app](~/assets/content/writing/how-to-log-a-hipaa-app-or-multiple-hipaa-apps-using-heroku-private-space-logging/create-app.png)

The link in blue is the URL to your new application. The link in green is the git repository link. With the application set up in Heroku, it is time to push our actual repository to Heroku and let it build and deploy for us. Using the git repository link, execute the following commands in your repository folder:

1. `git remote add heroku https://git.heroku.com/heroku-logging-react-app.git`
2. `git push heroku master`
3. `heroku open`

Once these processes are complete, you can go check out your logs! (You can also check logs while executing them.) Navigate to https://app.logdna.com, and you should see something like this:

![logs](~/assets/content/writing/how-to-log-a-hipaa-app-or-multiple-hipaa-apps-using-heroku-private-space-logging/logs.png)

As a reminder, these are not just the logs for this one application; these are the logs for every application inside the Shield Private Space. In LogDNA, you can filter by the app or by the space.

Congratulations, you have successfully set up a Shield Private Space with centralized log capture!

### Cleanup

If you are just testing things out, you’ll want to clean up your private space and application once you’re done to avoid any surprise bills! You will first need to remove any apps inside the space.

```powershell
heroku apps:destroy -a heroku-logging-react-app
```

Once that is complete, you can run the `spaces:destroy` command to remove the private space.

```powershell
heroku spaces:destroy --space my-hipaa-space
```

## Review and Conclusion

HIPAA application compliance is a large and ongoing task for any healthcare organization. For organizations with multiple applications and services, managing compliance across all of them can be a significant burden. In this article, we have reviewed how Heroku Shield Private Spaces can help to ease that burden through secure network topologies, which enable centralized log capture alongside a number of other features. This shifts the weight of compliance away from the application level and gives developers the freedom to develop new features and applications, while also narrowing the area that compliance workers need to focus on.

If you have any questions or comments, please feel free to contact me via any of the means below. Thanks for reading!

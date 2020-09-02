---
title: A Full Stack Dev's First Impressions of the Salesforce Platform, Part 1
date: 2020-09-03T00:00:00.000Z
description: What are all these Salesforce Developer jobs for anyways?
---

## Introduction

> What are all these Salesforce Developer jobs for anyways?

As a full-stack developer who primarily uses React and .NET, I have traditionally shied away from platform-specific integrations. Throughout my career, I have heard of Salesforce and "Salesforce Developers" (and I have also heard that Salesforce Developers were [well-compensated](https://www.indeed.com/career/salesforce-developer/salaries)), but otherwise, these terms never provoked my interest. After all, why would I want to lock myself into learning skills and abilities which only allowed me to work with one specific application?

However, I had heard of Heroku, and I recently had positive experiences with their Heroku Flow product. Learning that Heroku is owned by Salesforce piqued my interest. What kind of software company would need to own a cutting-edge platform as a service company? The other examples that come to mind are all top-tier companies – Amazon/AWS, Microsoft/Azure, Google/GCP, etc.

I started looking into it and learned that there is more to Salesforce than I originally thought, including components and frameworks which can be used to develop any number of custom, full-stack applications. They even have [open source](https://opensource.salesforce.com/)! This really blew my mind — honestly, open source is the last thing I expected from a large enterprise software company.

To get a basic understanding, I went through two introductory learning modules offered (for free) by Salesforce. In this two-part series, I'll take you on a brief overview of the platform, the coding tools currently available, and my first impressions.

## What is the Salesforce Platform?

Salesforce, as the name implies, began as an enterprise [Customer Relationship Management](https://www.salesforce.com/crm/what-is-crm/) (CRM) solution, and this is the “standard functionality” that comes out of the box with each Salesforce environment. It is a cloud-based application, hosted in what they call the “trusted, multitenant cloud.” It is an application that consists of a number of differing APIs, a data model, and various clients which can access those APIs. What we are interested in is not the standard functionality, but the platform that lies underneath it.

![platform](~/assets/content/writing/a-full-stack-devs-first-impressions-of-the-salesforce-platform-part-1/platform.png)

The Salesforce Platform is the group of technologies which enables the development of both the prebuilt applications and any custom applications. As such, the platform is built in a way to speed development of custom applications, and includes various APIs, analytics, and a metadata-based configurable data model, among other things (including Heroku). As a developer, the platform will be where I focus my attention.

### How do I get started learning about Salesforce?

Salesforce provides a fairly robust set of professional-development resources under its [Trailhead site](https://trailhead.salesforce.com/). Here, you can browse the available courses and even use the Trailhead GO app to learn. If you are brand new to Salesforce like me, I recommend starting with the [Salesforce Platform Basics](https://trailhead.salesforce.com/content/learn/modules/starting_force_com) and [Platform Development Basics](https://trailhead.salesforce.com/content/learn/modules/platform_dev_basics) trailheads. These two trailheads combined give an overview of what Salesforce is, what the platform is, and some basic exposure to the various methods of customizing the platform both with and without code.

Do note that some of the exercises in the Trailhead Playgrounds do not appear to play well with Firefox – I got a “Website will not allow Firefox to display the page if another site has embedded it” error when I attempted to do some of the introductory exercises. This is because of the way they are using iframes to display legacy pages. After switching to Chrome, everything worked just fine.

With regards to the trailheads, the first part of special interest to us as developers is the [Develop Without Code](https://trailhead.salesforce.com/content/learn/modules/platform_dev_basics/platform_dev_basics_nocode) module.

## Developing Without Code

After some introductory material, the Platform Development Basics will take you through some exercises where you can “develop without code.” Through the use of forms and drag-and-drop tools, you can perform what Salesforce calls “declarative development.” I have to admit, as a developer, I have not had great experiences with visual development tools. I started with LEGO Mindstorms in high school, although I have also used Microsoft’s Visual Studio designer tools to do development as a part of my professional career. With Mindstorms, I ended up needing to write code anyway to bypass the limitations of the visual programming editor, and eventually, it became easier to just start from the written code. Visual Studio designer view worked but always felt fragile, and keeping up with the generated files was often a hassle. Given this history, you can probably understand why I start from a position of not loving low/no code solutions. That was a long time ago, though, and low/no code platforms have come a long way since then (e.g. Quick Base, MSFT Power Apps, Google App Maker), so I came at it with an open mind.

![custom-field](~/assets/content/writing/a-full-stack-devs-first-impressions-of-the-salesforce-platform-part-1/custom-field.png)

> Here's an example of the interface to add a custom field.

The Salesforce platform’s no-code development tools allow you to modify the data model, create basic forms and pages, and set up validation rules. When you add this to the built-in APIs, it is easy to see how you could use this to build a functional CRUD-style app. The data model part is the most useful part to me — basically, the entire data model is abstracted away, meaning you can use a Visio-like interface called Schema Builder to add columns/fields and even entire object types (in SQL, this would be a table) **on the fly**. Plus, each custom object has not only the custom fields, but also a host of built-in metadata and features like [Chatter Feed Tracking](https://help.salesforce.com/articleView?id=collab_feed_tracking.htm&type=5).

![schema-builder](~/assets/content/writing/a-full-stack-devs-first-impressions-of-the-salesforce-platform-part-1/schema-builder.png)

This is the Schema Builder, a visual tool for designing custom data models.
For example, imagine that your organization currently stores information about HR recruits in an Excel spreadsheet on a file server. With Salesforce, it is easy to move that information from files into a centralized database. This database is easy to manage by normal business users, and at the same time provides built-in features which enhance the information stored. From a business point of view, I can definitely see the value.

Still, as a developer, it’s difficult to get around the feeling that since I lack control, eventually a situation will come up where I need to do something that the tool isn’t built to handle. There are ways to move from declarative to programmatic in order to handle these exceptions (we'll look at some in part two of this article), but I can imagine this declarative functionality being a useful tool by itself for a Business Analyst or other non-technical product owner.

## Review and Conclusion

So far, we’ve gained a basic understanding of the relationship between Salesforce, the Salesforce platform, and what it can offer for business users in terms of no/low-code customization. In Part 2, I’ll take a deeper look at what the Salesforce platform can offer developers and whether full-stack developers should make the leap over to become Salesforce developers.

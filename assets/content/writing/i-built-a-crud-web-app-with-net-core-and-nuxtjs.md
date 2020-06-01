---
title: I built a CRUD web app with .NET Core and Nuxt.js.
date: 2020-06-01T00:00:00.000Z
description: RESTful APIs and a dynamic frontend framework make this a solid choice.
---

## Overview

I recently had the opportunity to create a full-stack CRUD application around the idea of apartment rentals. This application allows for users to view (and manage) a list of apartments. Basic feature list is as follows:

- Users can sign up for a new account and log in.
- Users have three different roles: client, realtor, and admin.
  - Clients can browse available apartments in a list and on a map.
  - Realtors can additionally browse occupied apartments as well as CRUD all apartment data.
  - Admins can CRUD all user data.

## Why build this?

I've written full stack applications before, but I wanted something I could put in my portfolio while getting up to speed with some of the latest technologies, including .NET Core and a new JavaScript framework.

Astute readers will note that I have already created [the site you are currently reading](/writing/making-a-next-level-website-with-nuxtjs-vue-markdown-and-netlify-part-1) using Nuxt.js. However, I had not yet used it in a true full-stack application, and so I wanted some more practice with it.

## Review of the Tech Stack

Technically, this project is divided into three parts:

### Frontend in Nuxt.js

The frontend is a [Nuxt.js](https://nuxtjs.org/)-based Single Page Application (SPA). Nuxt.js is a Vue.js framework which allows for a convention-based approach to Vue.js development. Additionally, Nuxt.js provides an easy upgrade path from SPA to Server-Side Rendering or Static Site Generation.

I am a fan of Nuxt and how it both adds additional features on the rendering side while making the development experience faster via its conventions. Occasionally there will be an issue due to a lack of documentation, but this should continue to get better with time.

### .NET Core REST APIs

The APIs were RESTfully written in C# using .NET Core 3.1 and were developed in Visual Studio 2019. With regards to security and identity, [Authentication](https://docs.microsoft.com/en-us/aspnet/core/security/authentication/?view=aspnetcore-3.1) is handled using a JSON Web Token (JWT) bearer scheme. Authorization is [role-based](https://docs.microsoft.com/en-us/aspnet/core/security/authorization/roles?view=aspnetcore-3.1) (based on [Jason Watmore's solution](https://jasonwatmore.com/post/2019/10/16/aspnet-core-3-role-based-authorization-tutorial-with-example-api)).

Compared to working on Nuxt (or really any Javascript framework), the development experience is actually quite different. On the plus side, official documentation and packages are significantly more fleshed out than your standard npm package. This both makes it easier to get up to speed and makes bug resolution faster. Microsoft is doing an excellent job supporting .NET. They historically have had a bad reputation among web developers, but they have made huge strides in the past decade. Check out the following:

- .NET Core is [open source](https://github.com/dotnet/core)
- Microsoft [owns and supports GitHub](https://blogs.microsoft.com/blog/2018/10/26/microsoft-completes-github-acquisition/)
- [Visual Studio Code](https://code.visualstudio.com/) is one of the best code editors out there

All this is evidence (albeit anecdotal) which shows that Microsoft is a significant contributor to the overall development community and should not be ignored.

A small negative is that there is not as much flexibility in terms of IDE. While the [.NET Core CLI](https://docs.microsoft.com/en-us/dotnet/core/tools/) is definitely functional and makes it _possible_ to develop using your IDE/OS of choice, it still feels like a second class citizen. [Visual Studio](https://visualstudio.microsoft.com/) is still the preferred IDE and the examples in the documentation reflect this.

### SQL Backend

The database is a SQL Server database. Schema and setup is contained in a Visual Studio [database project](https://docs.microsoft.com/en-us/aspnet/core/tutorials/first-web-api?view=aspnetcore-3.1&tabs=visual-studio). There are two basic types of objects:

- Apartments
- Users

Overall, SQL Server is still a SQL database. If you are familiar with MySQL or PostgreSQL, you will feel comfortable here. For the purposes of this application, we are not going beyond basic CRUD operations, so the basics should be the same.

### Other Features

- Role-based Authorization in Nuxt.js Auth with custom middleware
- Setting up the Vuex store in Nuxt.js for basic CRUD operations
- Using nuxt-gmaps to easily plug into the Google Maps API
- Using AutoMapper to hide passwords in the API
- Mobile-friendly responsive design using Vuetify
- Setting up unit testing for .NET Core with xUnit and Moq
- [Salting and hashing](https://docs.microsoft.com/en-us/aspnet/core/security/data-protection/consumer-apis/password-hashing?view=aspnetcore-3.1) passwords in the API before storage in the database.

I hope to write more tutorials covering these topics soon!

## Ready to Start Your Own?

You can get the source code [here](https://github.com/henryjin3/ApartmentRentalApp). In terms of learning, though, nothing beats writing your own from scratch!

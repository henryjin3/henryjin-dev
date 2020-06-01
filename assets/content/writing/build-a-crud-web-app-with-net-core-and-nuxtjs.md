---
title: Build a CRUD web app with .NET Core and Nuxt.js.
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

Technically, this project is divided into three parts:

### Frontend

The frontend is a Nuxt.js-based Single Page Application (SPA). Nuxt.js is a Vue.js framework which allows for a convention-based approach to Vue.js development. Additionally, Nuxt.js provides an easy upgrade path from SPA to Server-Side Rendering or Static Site Generation.

### REST APIs

The APIs were RESTfully written using .NET Core 3.1 and were developed in Visual Studio 2019.

### Backend

The database is a SQL Server database. Schema and setup is contained in a Visual Studio database project.

## Review

You can get the source code [here](https://github.com/henryjin3/ApartmentRentalApp).

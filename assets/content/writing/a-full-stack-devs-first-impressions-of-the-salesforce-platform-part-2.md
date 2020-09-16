---
title: A Full Stack Dev's First Impressions of the Salesforce Platform, Part 2
date: 2020-09-16T00:00:00.000Z
description: Let's dig in to the code, and some overall impressions.
---

## Introduction

In [Part 1](/writing/a-full-stack-devs-first-impressions-of-the-salesforce-platform-part-1), I completed an overview of Salesforce, the Salesforce platform, and its no/low-code options. Now, let’s get to the meaty part (at least for developers) – developing with code! After that, I’ll share some overall impressions of the platform.

## What does it look like to develop with code?

There are quite a lot of Salesforce-related packages and frameworks, but the first two trailheads introduce you primarily to the fundamentals: the Lightning Component framework, Apex, and Visualforce.

### The Lightning Component framework

The [Lightning Component framework](https://developer.salesforce.com/docs/atlas.en-us.lightning.meta/lightning/intro_framework.htm) is defined as a “component-based approach to UI development.” The framework is responsive, mobile-ready, and made to integrate quickly with Salesforce APIs and business data. There is a selection of pre-built components, and you can also create your own custom ones.

As a React developer, the mention of components immediately made me think that this would be similar; however, the reality is somewhat different. It certainly is component-based, but not in the way I am accustomed to from React. For example, see the screenshot of the Salesforce IDE below:

![web-ide](~/assets/content/writing/a-full-stack-devs-first-impressions-of-the-salesforce-platform-part-2/web-ide.png)

> Yes, there's a web-based Salesforce IDE! There are also [extensions for Visual Studio Code](https://marketplace.visualstudio.com/items?itemName=salesforce.salesforcedx-vscode) available.

This example is built using Aura components, the older version of Lightning components (the newer version, Lightning Web Components, is compatible with the old one and can exist side by side). You can see on the right side the inclusion of a client-side “Controller” file, which reminds me of .NET MVC paradigms. On the other hand, Lightning Web Components look more like a modern web framework:

![lightning-js](~/assets/content/writing/a-full-stack-devs-first-impressions-of-the-salesforce-platform-part-2/lightning-js.png)

In a way, it reminds me of [Vue.js](https://vuejs.org/), where the template, JS, and CSS are separated but together. Working in this would definitely require some onramp, although as far as I can see the fundamentals are similar. It’s actually remarkable that a platform-integrated framework could look so similar to a modern, general app development framework – this is a definite win for Salesforce, and it makes it much easier for full-stack developers like myself to consider working on the Salesforce platform.

### Apex

[Apex](https://help.salesforce.com/articleView?id=code_about.htm) is the backend language for the Salesforce platform, and it is fairly similar to Java/C#. Check out this sample file:

![apex](~/assets/content/writing/a-full-stack-devs-first-impressions-of-the-salesforce-platform-part-2/apex.png)

In this screenshot, we can see that Apex is an object-oriented, statically-typed language. Eagle-eyed observers will also note a SQL-like syntax here on line 16, which is actually [Salesforce Object Query Language](https://developer.salesforce.com/docs/atlas.en-us.soql_sosl.meta/soql_sosl/sforce_api_calls_soql.htm), or SOQL. For the .NET developers here, this looks very similar to LINQ-to-SQL, but for queries only.

The similarity to C# definitely makes me feel comfortable, although I wonder just how up to date it is in terms of language features. Based on this brief introduction, I would feel comfortable using Apex for workflow and API development if I was working with a pre-existing Salesforce system.

### Visualforce

Visualforce is the legacy, page-based development language for the Salesforce platform, and it reminds me of traditional page-based development where all the HTML, CSS, and JS are integrated together.

![visualforce](~/assets/content/writing/a-full-stack-devs-first-impressions-of-the-salesforce-platform-part-2/visualforce.png)

It reminds me of ASP.NET — something that I’ve used in the past, and would just as soon not go back to. That said, Salesforce doesn’t recommend using Visualforce for anything which needs to be mobile-friendly — which these days is just about everything! I don’t expect that any new development would need to be done in it (though I'm sure there's still a fair amount of legacy code out there being worked on).

## First Impressions of the Salesforce Platform

Having looked at the three main frameworks of the Salesforce platform, I’m now ready to share my first impressions.

### The Good

**Modern Frameworks and Patterns** – The development frameworks are more modern than I anticipated them being. Although I suspect that there is probably still some lag between modern development patterns becoming popular and being able to use them in Salesforce, I would feel comfortable developing in a Salesforce environment, especially considering there are options to use other frontends (e.g. React) if it becomes necessary. I suspect that the learning curve between, say, being a React developer and doing some greenfield Salesforce development using the latest tools and technology is probably pretty low.

**Build vs. Buy** – Sometimes, the answer is to buy. While I, as a full-stack developer, enjoy the task of creating a custom solution from the ground up, this is not always the most cost-effective solution for a customer. Depending on the project, I could definitely see where it would make sense to take advantage of the built-in APIs and backend rather than creating a fully-custom solution. This would likely be the case for internal business apps, which tend to be about centralizing data, process, and workflow, and these are use cases which are well-covered by what Salesforce provides without requiring very much code. Additionally, business users would benefit from the ability to make small changes and updates without needing to involve a developer directly.

**Free Learning** – The trailheads appear to be decently fleshed out and are available for free! This makes it easy to pick up a new skill and try it out without having to commit a lot of time or money upfront. Salesforce is definitely putting effort into bringing developers onto its platform.

**A Large Ecosystem** – The above assessment is based solely upon the frameworks introduced in the two referenced trailheads — there are quite a number of packages, apps, and frameworks which I haven’t even begun to explore. I would be particularly interested in some of the AI/analytics packages and the value that these could add over your standard custom application.

### The Bad

Although the newest frameworks seem to be decently modern, it does concern me that a significant portion of the introductory material was devoted to frameworks which appear to be wholly unnecessary for any greenfield development. To me, this shows the nature of platform-specific integrations — namely, that they are too valuable to get rid of, but usually not valuable enough to upgrade entirely. From a developer perspective, this means that you might need to spend more time than you'd like updating legacy code.

### The (Potentially) Ugly

Apart from my developer work, I also did a brief stint as a project manager for custom [SharePoint](https://www.microsoft.com/en-us/microsoft-365/sharepoint/collaboration) implementations. It seems to me that, at least in terms of the no-code/low-code customization, Salesforce and SharePoint are offering some of the same benefits — namely, providing a framework on which it is easy to centralize information of all sorts and sizes. This information can then be customized with validations and workflows, and also benefits from additional metadata which is provided out-of-the-box even on custom fields. However, I suspect that they also come with some of the same downsides — difficulty in maintaining custom solutions and limitations which are not apparent when beginning to use the solution. Unfortunately, it is quite difficult to know what these limitations are before starting to use the platform.

## Review and Conclusion

As a full-stack developer who until recently had no exposure to the Salesforce platform, this has been an eye-opening experience for me. I really had no idea what to expect. What I found was a breadth of options, ranging from customizations and integrations for the core Salesforce application to entirely unrelated custom apps. This second part was unexpected, and I can definitely see where, especially if I was in an organization that was heavily invested already into Salesforce, I would choose to develop new applications on that platform. There are clear benefits, especially on the data model side, and the front end development frameworks appear to be sufficiently modern to where I would feel comfortable using the platform in such an organization.

For myself and other full-stack developers, I think we would be well-served by adding Salesforce developer skills to our resume rather than fully rebranding as a “Salesforce developer.” This allows developers to gain the benefits of combining our general-purpose development skills and perspective with platform-specific knowledge.
From the organizational side, I would propose that many companies looking to develop new, custom applications on the Salesforce platform would be well-served by hiring “normal” full-stack developers to do their custom development, Salesforce or otherwise. Since the Salesforce platform is keeping up with modern web trends, many of the patterns are the same, and these developers would likely bring a broad perspective and additional options to the project.

If you have any questions or comments, my contact info is in the footer. Thanks for reading!

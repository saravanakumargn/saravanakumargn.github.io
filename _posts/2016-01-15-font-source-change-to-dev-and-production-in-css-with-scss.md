---
layout: post
title: Font source change to Dev and production in CSS with SCSS
date: 2016-01-15 13:02
author: saravanakumargn
comments: true
categories: [compass, compass, CSS, css, SASS, sass]
---

I want to use RobotoDraft font in my project and while development I don't want to download it from CDN due to network connection and to avoid proxy issue. So I need to use two different types like local saved fonts in development environment and fonts.googleapis.com CDN path in production environment.

So here what i did.
I have created one mixin called RobotoDraft.scss in fonts folder

`fonts/RobotoDraft.scss`
{% highlight scss %}
@mixin RobotoDraft {
	/* cyrillic-ext */
	@font-face {
	  font-family: 'RobotoDraft';
	  font-style: normal;
	  font-weight: 300;
	  src: local('RobotoDraft Light'), local('RobotoDraft-Light'), url(../fonts/RobotoDraft/u0_CMoUf3y3-4Ss4ci-VwRgVThLs8Y7ETJzDCYFCSLE.woff2) format('woff2');
	  unicode-range: U+0460-052F, U+20B4, U+2DE0-2DFF, U+A640-A69F;
	}
}
{% endhighlight %}

`style.scss`
{% highlight scss %}
@import "fonts/RobotoDraft";
@if compass-env() == 'production' {
  @import url(https://fonts.googleapis.com/css?family=RobotoDraft:300,400,500,700,400italic);
}
@else {
  @include RobotoDraft;
}
{% endhighlight %}

{% highlight bash %}
compass compile sass		//Normal sass compile
compass compile sass -e production		//production sass compile
{% endhighlight %}
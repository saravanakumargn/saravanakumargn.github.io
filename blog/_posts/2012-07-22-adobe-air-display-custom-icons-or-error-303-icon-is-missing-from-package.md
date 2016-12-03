---
layout: post
title: adobe air - Display custom icons or error 303 icon is missing from package
date: 2012-07-22 17:56
author: saravanakumargn
comments: true
categories: [Adobe AIR, Adobe AIR Application Descriptor, ADobe AIR icon]
---
how to handle error 303 icon is missing from package in Adobe AIR or add custom icons in adobe AIR application.

The only reason to getting this error is image name may be change or path issue. Make sure image name misspelled or give path right way.

For example image like AppIcon-16.png, AppIcon-32.png, AppIcon-48.png, AppIcon-128.png  and images with in assets folder then Application Descriptor File icon entry should be like as below...

{% highlight xml %}
<icon> 
	<image16x16>assets/AppIcon-16.png</image16x16> 
	<image32x32>assets/AppIcon-32.png</image32x32> 
	<image48x48>assets/AppIcon-48.png</image48x48> 
	<image128x128>assets/AppIcon-128.png</image128x128> 
</icon>
{% endhighlight %}

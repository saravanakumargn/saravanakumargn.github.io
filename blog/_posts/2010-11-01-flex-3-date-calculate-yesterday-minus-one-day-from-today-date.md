---
layout: post
title: flex 3 – Date – Calculate Yesterday( minus one day from today date)
date: 2010-11-01 19:15
author: saravanakumargn
comments: true
categories: [Adobe Flex 3, Calculate Yesterday, Date, flex 3]
---

Here the simple code for reduce one day from today.

{% highlight as3 %}
var noOfDays:int = 1;
var lastDay:Date = new Date();
lastDay.setTime(lastDay.time - ( noOfDays * 24 * 60 * 60 * 1000 ));
trace(new Date(lastDay).toDateString());
{% endhighlight %}

You can use this code for addition one or more days from today. use + sign instead of -.

---
layout: post
title: passing parameters/events with setInterval in Flex/Actionscript
date: 2011-07-14 06:54
author: saravanakumargn
comments: true
categories: [Adobe AIR, Adobe Flex 3, AS3, flex 4, Flex 4.0, setInterval]
---

Passing paramenters or events with setInterval in actionscript code in flex/Actionscript  

{% highlight as3 %}
private var logoTimerVar:uint;

private function loadCompleted(event:Event):void
{
	logoTimerVar = setInterval(loadMainData,200,event);
	// here we pass event to loadMainData function.
}

private function loadMainData(event:Event):void
{
	clearInterval(logoTimerVar); // must have to use clearInterval to avoid repeat calling function loadMainData
	.....
}
{% endhighlight %}
---
layout: post
title: Flex textinput restrict mentioned few characters
date: 2012-09-28 21:43
author: saravanakumargn
comments: true
categories: [Adobe AIR, Adobe Flex 3, AS3, Flex 4.0]
---

We can use `^` for includes all characters but restrict few characters. 

Code is like below

{% highlight xml %}
<s:TextInput id="txtInput" restrict="^/*:&quot;?&lt;&gt;|"/>
{% endhighlight %}
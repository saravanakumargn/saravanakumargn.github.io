---
layout: post
title: Removing the last character and first character of a string in flex and actionscript
date: 2012-09-04 17:36
author: saravanakumargn
comments: true
categories: [Adobe AIR, Adobe Flex 3, AS3, Flex 4.0, Uncategorized]
---

we can remove characters in flex many ways. simple way to Removing the last character and first character of a string in flex and actionscript code is below....

{% highlight as3 %}
var st:String = "1test2";
trace("st : "+st);	//st : 1test2
st = st.slice(1, st.length);
trace("st : "+st);	//st : test2
st = st.slice(0, -1);
trace("st : "+st);	//st : test
{% endhighlight %}
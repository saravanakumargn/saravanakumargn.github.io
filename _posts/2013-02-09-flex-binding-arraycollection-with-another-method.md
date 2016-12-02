---
layout: post
title: Flex Binding Arraycollection with another method
date: 2013-02-09 15:22
author: saravanakumargn
comments: true
categories: [Adobe AIR, Adobe Flex 3, AS3, Flex 4.0]
---

Sometimes we need to assign singleton model arraycollection with one method (not another variable). 

We can use `fx:Binding` with destination as like below code:

{% highlight as3 %}
// resultFun is method name
<fx:Binding destination="resultFun" source="ModelClass.getInstance().resultColl"/>

public function set accountsResultFun(value:ArrayCollection):void
{
	for each(var obj:Object in value)
	{
	      trace("obj : "+ObjectUtil.toString(obj));
        }
}
{% endhighlight %}

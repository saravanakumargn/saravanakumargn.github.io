---
layout: post
title: RadioButtonGroup getting value and set defalue Selected value
date: 2010-11-01 19:06
author: saravanakumargn
comments: true
categories: [Adobe Flex 3, flex 3, get defalue Selected value, RadioButtonGroup, set defalue Selected value]
---

Here you can see very simple example for flex 3 RadioButtonGroup. Here RadioButtonGroup selected value is radiobutton value.

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml" layout="vertical"
				creationComplete="createComp();">
	<mx:Script>
		<![CDATA[
			import mx.controls.Alert;
			private function changeFun(e:Event):void
			{
				var radioButValue:RadioButtonGroup = e.currentTarget as RadioButtonGroup;
				trace("group.selection.label : "+radioButValue.selection.label);
			}
			private function createComp():void
			{
				groupTest.selectedValue = "test2";
			}
		]]>
	</mx:Script>
	<mx:RadioButtonGroup id="groupTest"
						 change="changeFun(event)"/>
	<mx:RadioButton value="test1"
					label="test"
					group="{groupTest}"/>
	<mx:RadioButton value="test2"
					label="test2"
					group="{groupTest}"/>
	<mx:RadioButton value="test3"
					label="test3"
					group="{groupTest}"/>
</mx:Application>
{% endhighlight %}
---
layout: post
title: Flex sprak RadioButtonGroup get selected value and set default value
date: 2014-05-07 08:14
author: saravanakumargn
comments: true
categories: [Adobe AIR, change, Flex 4.0, Flex 4.6, RadioButton, RadioButtonGroup]
---

In this sample we will see how to set default selected value to radio button and how to get the selected radio button value. Here I used RadioButtonGroup change event. So, in every change of radio buttons belongs to RadioButtonGroup will get fired.

 
{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<s:Application xmlns:fx="http://ns.adobe.com/mxml/2009"
			   xmlns:s="library://ns.adobe.com/flex/spark"
			   xmlns:mx="library://ns.adobe.com/flex/mx"
			   minWidth="955" minHeight="600" creationComplete="createComp();">
	<fx:Declarations>
		<s:RadioButtonGroup id="groupTest" change="changeFun(event)"/>
	</fx:Declarations>
	<fx:Script>
		<![CDATA[
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
	</fx:Script>
	<s:HGroup>
		<s:RadioButton label="test" group="{groupTest}" value="test1"/>
		<s:RadioButton label="test2" group="{groupTest}" value="test2"/>
		<s:RadioButton label="test3" group="{groupTest}" value="test3"/>
	</s:HGroup>
	
</s:Application>
{% endhighlight %}
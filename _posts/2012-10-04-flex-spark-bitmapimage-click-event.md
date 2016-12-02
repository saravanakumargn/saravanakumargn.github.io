---
layout: post
title: Flex spark BitmapImage click event
date: 2012-10-04 09:39
author: saravanakumargn
comments: true
categories: [Uncategorized]
---

By default spark bitmapimage dont have click event. Bitmapimage used to only representing image. We can use graphic container for handle mouse clicks in bitmapimage.

BitmapImageClickSample.mxml

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<s:Application xmlns:fx="http://ns.adobe.com/mxml/2009" 
			   xmlns:s="library://ns.adobe.com/flex/spark" 
			   xmlns:mx="library://ns.adobe.com/flex/mx" minWidth="955" minHeight="600" xmlns:local="*">

	<fx:Script>
		<![CDATA[
			import mx.controls.Alert;
			protected function bmi1_clickHandler(event:MouseEvent):void
			{
				// TODO Auto-generated method stub
				Alert.show("Enter image");
			}
		]]>
	</fx:Script>

	<fx:Declarations>
		<!-- Place non-visual elements (e.g., services, value objects) here -->
	</fx:Declarations>
	<s:layout>
		<s:VerticalLayout horizontalAlign="center" verticalAlign="middle"/>
	</s:layout>
	<s:Button label="test"/>
	<s:BitmapImage source="btn_off_right.gif"/>
	<local:BMI click="bmi1_clickHandler(event)"  source="btn_off_right.gif"/>
</s:Application>
{% endhighlight %}

BMI.mxml

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<s:Graphic xmlns:fx="http://ns.adobe.com/mxml/2009" 
		   xmlns:s="library://ns.adobe.com/flex/spark" 
		   xmlns:mx="library://ns.adobe.com/flex/mx">
	<fx:Declarations>
		<!-- Place non-visual elements (e.g., services, value objects) here -->
	</fx:Declarations>
	<fx:Script>
		<![CDATA[
			public function set source(value:String):void
			{
				bitmapImage.source = value;
			}
		]]>
	</fx:Script>
	<s:BitmapImage id="bitmapImage"/>
</s:Graphic>
{% endhighlight %}

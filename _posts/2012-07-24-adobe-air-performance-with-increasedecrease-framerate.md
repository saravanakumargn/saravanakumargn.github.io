---
layout: post
title: Best practice Adobe AIR performance with increase/decrease framerate
date: 2012-07-24 14:58
author: saravanakumargn
comments: true
categories: [Adobe AIR, Adobe AIR, AS3, framerate, perfromance]
---

For better CPU performance in Adobe AIR applications we need to change the frame-rate according to the usage. like when application is deactivate we need to decrease the frame-rate into minimum value 1 or 0.1\. when application is active need to set default frame-rate value 24. 

In adobe AIR application need to monitor whether user is idle or present. when user is idle no need to run the application with high frame-rate. so that time we can reduce the frame rate. when user back to the application we can set default rate. 

Sample adode AIR code given below.

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<s:WindowedApplication xmlns:fx="http://ns.adobe.com/mxml/2009"
					   xmlns:s="library://ns.adobe.com/flex/spark"
					   xmlns:mx="library://ns.adobe.com/flex/mx"
					   creationComplete="createComp()">
	<fx:Declarations>
		<!-- Place non-visual elements (e.g., services, value objects) here -->
	</fx:Declarations>
	<fx:Script>
		<![CDATA[
			private function createComp():void
			{
				NativeApplication.nativeApplication.addEventListener(Event.ACTIVATE, appActive);
				NativeApplication.nativeApplication.addEventListener(Event.DEACTIVATE, appDeactive);
				NativeApplication.nativeApplication.addEventListener(Event.USER_IDLE, appActive); 
				NativeApplication.nativeApplication.addEventListener(Event.USER_PRESENT, appDeactive);  
			}

			private function appActive(e:Event):void
			{
				stage.frameRate = 24;
			}
			private function appDeactive(e:Event):void
			{
				stage.frameRate = 1;
			}
		]]>
	</fx:Script>
</s:WindowedApplication>
{% endhighlight %}
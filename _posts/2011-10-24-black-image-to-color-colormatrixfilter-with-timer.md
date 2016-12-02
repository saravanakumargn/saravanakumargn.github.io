---
layout: post
title: black image to color ColorMatrixFilter with timer
date: 2011-10-24 19:25
author: saravanakumargn
comments: true
categories: [Adobe AIR, Adobe Flex, Adobe Flex 3, AS3, ColorMatrixFilter, timer]
---
The ColorMatrixFilter class lets you apply a 4 x 5 matrix transformation on the RGBA color and alpha values of every pixel in the input image to produce a result with a new set of RGBA color and alpha values. It allows saturation changes, hue rotation, luminance to alpha, and variousother effects. You can apply the filter toany displayobject (thatis, objectsthat inherit from theDisplayObject class), such as MovieClip, SimpleButton,TextField, and Video objects,as well as to BitmapData objects.

In this sample we will change image color(black and white into color)


{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<s:Application xmlns:fx="http://ns.adobe.com/mxml/2009"
			   xmlns:s="library://ns.adobe.com/flex/spark"
			   xmlns:mx="library://ns.adobe.com/flex/mx"
			   minWidth="955" minHeight="600" backgroundColor="white" creationComplete="init()"
			   viewSourceURL="srcview/index.html">
	<fx:Declarations>
		<!-- Place non-visual elements (e.g., services, value objects) here -->
	</fx:Declarations>
	<fx:Script>
		<![CDATA[
			import spark.filters.ColorMatrixFilter;
			import spark.filters.DropShadowFilter;
			import spark.filters.GlowFilter;
			[Bindable]
			[Embed("img.jpg")]
			private var image2:Class;
			private static const rLum:Number = 0.2125;
			private static const gLum:Number = 0.7154;
			private static const bLum:Number = 0.0721;
			private static const startAlpha:Number = 0.5;
			private var t:Timer;
			private const TIMER_INTERVAL:int = 10;
			private function init():void
			{
				dropShadow = new DropShadowFilter(2, 45, 0x0, 0.3);
				glow = new GlowFilter(0x123456, 0.25, 24, 24);
				img1.filters = [new spark.filters.ColorMatrixFilter(matrix), glow, dropShadow];
			}
			private var logoTimerVar:uint;
			private function init1():void
			{
				logoTimerVar = setInterval(loadMainData,10);
			}
			private var progress:Number = 0;
			private var dropShadow:spark.filters.DropShadowFilter;
			private var glow:spark.filters.GlowFilter;
			private function loadMainData():void
			{
				progress += 0.005;
				matrix[0] = rLum + ((1 - rLum) * progress);
				matrix[1] = gLum - (gLum * progress);
				matrix[2] = bLum - (bLum * progress);
				matrix[5] = rLum - (rLum * progress);
				matrix[6] = gLum + ((1 - gLum) * progress);
				matrix[7] = bLum - (bLum * progress);
				matrix[10] = rLum - (rLum * progress);
				matrix[11] = gLum - (gLum * progress);
				matrix[12] = bLum + ((1 - bLum) * progress);
				matrix[18] = (startAlpha + (progress / 2));
				img1.filters = [new ColorMatrixFilter(matrix), glow, dropShadow];
				if(progress >= 1)
					clearInterval(logoTimerVar);
				txtBox.text = "val : "+progress;
			}
			private var matrix:Array = [rLum, gLum, bLum, 0, 0,
				rLum, gLum, bLum, 0, 0,
				rLum, gLum, bLum, 0, 0,
				0, 0, 0, startAlpha, 0];
		]]>
	</fx:Script>
	<s:VGroup>
		<s:Image id="img1"  width="600" height="450" source="{image2}"/>
		<s:Button label="Click here for Change color" click="init1()"/>
		<s:Label id="txtBox"/>
	</s:VGroup>
</s:Application>
{% endhighlight %}
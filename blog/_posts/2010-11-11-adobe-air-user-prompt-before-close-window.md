---
layout: post
title: Adobe AIR – user prompt before close window
date: 2010-11-11 16:29
author: saravanakumargn
comments: true
categories: [Adobe AIR, Adobe AIR, AS3, closing event, user prompt before close window]
---

You want show the prompt something like are you sure want close? or Settings changed. want save? or something then you can use the following code.

{% highlight as3 %}
private function applicationCompleteCall():void
{
	// your code here
	this.addEventListener(Event.CLOSING,_windowOnClose,false,0,true);
	// your code here
}

public function _windowOnClose(e:Event):void
{
	e.preventDefault();
	closeWindow();
}

public function closeWindow():void
{
	try
	{
		Alert.buttonWidth = 100;
		Alert.show("Want Quit?","",Alert.YES|Alert.NO, this, alertClickHandler);
		Alert.yesLabel = "Yes";
		Alert.noLabel = "No";
	}
	catch(e:Error)
	{
		trace("closeWindow : "+e.getStackTrace());
	}
}

private function alertClickHandler(e:CloseEvent):void
{
	if(e.detail == Alert.YES)
	{
		exitWindow();
	}
}
{% endhighlight %}
---
layout: post
title: Adobe Flex form submit to godaddy form mail webformmailer.php and gdform.php
date: 2011-10-28 01:51
author: saravanakumargn
comments: true
categories: [Adobe Flex 3, AS3, gdform.php, godaddy form submit with flex, webformmailer.php]
---

By default Godaddy sever contains two scripts for sending mail. gdform.php and webformmailer.php are the scripts installed linux scared hosting account. The differents of the two scrips are given below gdform.php and webformmailer.php 

**gdform.php:** Subject of the mail contains only "subject" object you specified in request.

**webformmailer.php:** This script provides additional functionality, including the ability to specify sort order, delivery schedule, and email format. Godaddy form mailer submission code is given below..  

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<mx:Application xmlns:mx="http://www.adobe.com/2006/mxml">
	<mx:Script>
		<![CDATA[
			import mx.controls.Alert;
			import mx.rpc.events.FaultEvent;
			import mx.rpc.events.ResultEvent;
			private function formSubmit():void
			{
				var formUrl:String="/webformmailer.php";		// or replace gdform.php here
				var urlObj:Object = new Object();
				urlObj.subject = "Example Form Submission";
				urlObj.FirstName = fname.text;
				urlObj.email = email.text;
				urlObj.comments = content.text;
				//urlObj.submit = "submit";

				feedRequest.method = "POST";
				feedRequest.addEventListener("result", httpResult);
				feedRequest.addEventListener("fault", httpFault);
				feedRequest.url = formUrl;
				feedRequest.send(urlObj);
			}
			public function httpResult(event:ResultEvent):void {
				var result:Object = event.result;
				Alert.show("Thanks for contact");
				//Do something with the result.
			}
			public function httpFault(event:FaultEvent):void {
				var faultstring:String = event.fault.faultString;
				Alert.show(faultstring);
			}
		]]>
	</mx:Script>
	<mx:HTTPService
		id="feedRequest"
		useProxy="false" />
	<mx:Panel title="This is test page" layout="vertical"
			  color="0xffffff" borderAlpha="0.15" width="500" height="240" paddingTop="0" paddingRight="10" paddingBottom="10"
			  verticalScrollPolicy="off" paddingLeft="10" horizontalAlign="center">

		<mx:Form width="100%" color="0x323232" paddingTop="0">
			<mx:FormHeading fontSize="10" paddingTop="0" />

			<mx:FormItem label="Name">
				<mx:TextInput id="fname" width="200"/>
			</mx:FormItem>

			<mx:FormItem label="E-mail address">
				<mx:TextInput id="email" width="200"/>
			</mx:FormItem>

			<mx:FormItem label="content">
				<mx:TextArea id="content" width="200"/>
			</mx:FormItem>
		</mx:Form>
			<mx:Button label="submit" color="black" click="formSubmit()"/>
	</mx:Panel>

</mx:Application>
{% endhighlight %}
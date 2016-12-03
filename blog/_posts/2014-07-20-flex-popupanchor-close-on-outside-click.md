---
layout: post
title: Flex  - PopUpAnchor close on outside click
date: 2014-07-20 09:08
author: saravanakumargn
comments: true
categories: [close PopUp, Flex 4.6, flex PopUpAnchor, mouseclick outside]
---
I had a one scenario like once popupanchor open then that popup should should close on mouse clicked anywhere outside that popupanchor. To achieve this we can use Flex “mouseDownOutside” (FlexMouseEvent.MOUSE_DOWN_OUTSIDE) event. We can do that both Flex and Actionscript logic.

If you are add directly  MOUSE_DOWN_OUTSIDE event to popupanchor then its wrong. You should use “popup” IFlexDisplayObject instance with popupanchor,

frmPUA.popUp

Code will be like this… (Right click for source download)

 
<pre class="lang:default decode:true " >&lt;?xml version="1.0" encoding="utf-8"?&gt;
&lt;!-- Simple example to demonstrate the Spark PopUpAnchor component --&gt;
&lt;s:Application xmlns:fx="http://ns.adobe.com/mxml/2009"
			   xmlns:s="library://ns.adobe.com/flex/spark"&gt;
	
	&lt;fx:Style&gt;
		.popUpForm
		{
			contentBackgroundColor : #FF0000;
			paddingTop : 2;
			paddingBottom : 2;
			paddingLeft : 2;
			paddingRight : 2;
		}
	&lt;/fx:Style&gt;
	&lt;fx:Script&gt;
		&lt;![CDATA[
			import mx.events.FlexMouseEvent;
			protected function openBtn_clickHandler(event:MouseEvent):void
			{
				// TODO Auto-generated method stub
				frmPUA.displayPopUp=true;
				frmPUA.popUp.addEventListener(FlexMouseEvent.MOUSE_DOWN_OUTSIDE, menuPopOutside, false, 0, true);
			}
			private function menuPopOutside(event:FlexMouseEvent):void
			{
				frmPUA.popUp.removeEventListener(FlexMouseEvent.MOUSE_DOWN_OUTSIDE, menuPopOutside);
				frmPUA.displayPopUp = false;
			}
		]]&gt;
	&lt;/fx:Script&gt;
	&lt;s:Panel width="75%" height="75%" title="Click Ooutside popup for close"&gt;
		&lt;!-- Group with default layout so that openBtn and PopUpAnchor will be on top of
		each other such that the popUp can be positioned relative to the button --&gt;
		&lt;s:Group x="10" y="10"&gt;
			&lt;!-- Button used to open PopUp --&gt;
			&lt;s:Button id="openBtn" label="Open PopUp" click="openBtn_clickHandler(event)"/&gt;
			&lt;!-- PopUpAnchor component set to same size as openBtn to ensure that
			popUp will be positioned relative to the button --&gt;
			&lt;s:PopUpAnchor id="frmPUA" width="92" height="21" popUpPosition="below"
						   styleName="popUpForm"&gt;
				&lt;!-- BorderContainer to hold popUp contents --&gt;
				&lt;s:BorderContainer&gt;
					&lt;s:layout&gt;
						&lt;s:VerticalLayout paddingBottom="5" paddingLeft="5" paddingRight="5"
										  paddingTop="5"/&gt;
					&lt;/s:layout&gt;
					&lt;s:Form&gt;
						&lt;s:FormItem label="Name :"&gt;
							&lt;s:TextInput/&gt;
						&lt;/s:FormItem&gt;
						&lt;s:FormItem label="E-Mail :"&gt;
							&lt;s:TextInput/&gt;
						&lt;/s:FormItem&gt;
					&lt;/s:Form&gt;
					&lt;s:HGroup&gt;
						&lt;!-- Button used to close popUp --&gt;
						&lt;s:Button label="CLOSE" click="frmPUA.displayPopUp=false"/&gt;
					&lt;/s:HGroup&gt;
				&lt;/s:BorderContainer&gt;
			&lt;/s:PopUpAnchor&gt;
		&lt;/s:Group&gt;
	&lt;/s:Panel&gt;
&lt;/s:Application&gt;</pre> 


Output is like the below.

<p><iframe style="border: 0px none;" src="http://saravanakumar.org/blog_samples/PopUpAnchorCloseSample/PopUpAnchorCloseSample.html" width="100%" height="600"></iframe></p>

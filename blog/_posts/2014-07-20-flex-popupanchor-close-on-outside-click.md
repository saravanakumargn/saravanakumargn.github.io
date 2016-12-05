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

 
{% highlight xml %}
<s:Application xmlns:fx="http://ns.adobe.com/mxml/2009"
			   xmlns:s="library://ns.adobe.com/flex/spark">
	
	<fx:Style>
		.popUpForm
		{
			contentBackgroundColor : #FF0000;
			paddingTop : 2;
			paddingBottom : 2;
			paddingLeft : 2;
			paddingRight : 2;
		}
	</fx:Style>
	<fx:Script>
		<![CDATA[
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
		]]>
	</fx:Script>
	<s:Panel width="75%" height="75%" title="Click Ooutside popup for close">
		<!-- Group with default layout so that openBtn and PopUpAnchor will be on top of
		each other such that the popUp can be positioned relative to the button -->
		<s:Group x="10" y="10">
			<!-- Button used to open PopUp -->
			<s:Button id="openBtn" label="Open PopUp" click="openBtn_clickHandler(event)"/>
			<!-- PopUpAnchor component set to same size as openBtn to ensure that
			popUp will be positioned relative to the button -->
			<s:PopUpAnchor id="frmPUA" width="92" height="21" popUpPosition="below"
						   styleName="popUpForm">
				<!-- BorderContainer to hold popUp contents -->
				<s:BorderContainer>
					<s:layout>
						<s:VerticalLayout paddingBottom="5" paddingLeft="5" paddingRight="5"
										  paddingTop="5"/>
					</s:layout>
					<s:Form>
						<s:FormItem label="Name :">
							<s:TextInput/>
						</s:FormItem>
						<s:FormItem label="E-Mail :">
							<s:TextInput/>
						</s:FormItem>
					</s:Form>
					<s:HGroup>
						<!-- Button used to close popUp -->
						<s:Button label="CLOSE" click="frmPUA.displayPopUp=false"/>
					</s:HGroup>
				</s:BorderContainer>
			</s:PopUpAnchor>
		</s:Group>
	</s:Panel>
</s:Application>
{% endhighlight %}


Output is like the below.

<p><iframe style="border: 0px none;" src="http://saravanakumar.org/blog_samples/PopUpAnchorCloseSample/PopUpAnchorCloseSample.html" width="100%" height="600"></iframe></p>

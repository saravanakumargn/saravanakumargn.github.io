---
layout: post
title: Adobe/Apache Flex display locale month names in list - using custom component
date: 2014-01-15 20:01
author: saravanakumargn
comments: true
categories: [Adobe AIR, Adobe Flex 3, AS3, Flex 4.0, Flex 4.6]
---

I developmed one personal home budget application with localization option[http://smartmytracker.com/](http://smartmytracker.com/ "http://smartmytracker.com/"). For this application i want to display month names in list and dropdown controls.

By default flex supports multiple local languages. Just i used flex DateChooser conponent to retrive all current locale month names. My code is like the below.

 
{% highlight as3 %}
package 
{
    import mx.collections.ArrayCollection;
    import mx.controls.DateChooser;
    import mx.formatters.DateFormatter;
    import mx.formatters.DateBase;
    import spark.components.DropDownList;
    
    public class MonthNamesDropDown extends DropDownList
    {
        public function MonthNamesDropDown()
        {
            super();
            var _monthNames:Array = DateBase.monthNamesLong;
            dataProvider = new ArrayCollection(_monthNames);
            selectedIndex = 0;
        }
        public function get selectedMonth():Number {
            return (selectedItem.data as Date).month;
        }
        public function set selectedMonth(value:Number):void {
            selectedIndex = value;
        }
    }
}
{% endhighlight %}
 
{% highlight as3 %}
package 
{
    import mx.collections.ArrayCollection;
    import mx.controls.DateChooser;
    import mx.formatters.DateFormatter;
    import mx.formatters.DateBase;
    import spark.components.DropDownList;
    import spark.components.List;    
    
    public class MonthNamesList extends List
    {
        public function MonthNamesList()
        {
            super();
            var _monthNames:Array = DateBase.monthNamesLong;
            dataProvider = new ArrayCollection(_monthNames);
            selectedIndex = 0;
        }
        public function get selectedMonth():Number {
            return (selectedItem.data as Date).month;
        }
        public function set selectedMonth(value:Number):void {
            selectedIndex = value;
        }
    }
}
{% endhighlight %}

 
{% highlight xml %}
<?xml version="1.0"?>
<s:Application xmlns:fx="http://ns.adobe.com/mxml/2009"
               xmlns:s="library://ns.adobe.com/flex/spark"
               xmlns:mx="library://ns.adobe.com/flex/mx"
               xmlns:local="*"
               viewSourceURL="srcview/index.html">
    
    <fx:Script>
        <![CDATA[
            import spark.events.IndexChangeEvent;
            
            protected function monthnameslist1_changeHandler(event:IndexChangeEvent):void
            {
                // TODO Auto-generated method stub
                mnl.text = event.currentTarget.selectedItem;
            }
            
            protected function monthnamesdropdown1_changeHandler(event:IndexChangeEvent):void
            {
                // TODO Auto-generated method stub
                mndd.text = event.currentTarget.selectedItem;
            }
            
        ]]>
    </fx:Script>
    
    <fx:Declarations>
    </fx:Declarations>
    
    <s:Panel title="Month name componts"
             width="75%" height="75%"
             horizontalCenter="0" verticalCenter="0">
        <s:VGroup left="10" right="10" top="10" bottom="10">
            
            <s:HGroup>
                <s:VGroup>
                    <local:MonthNamesList change="monthnameslist1_changeHandler(event)"/>
                    <s:Label id="mnl"/>
                </s:VGroup>
                <s:VGroup>
                    <local:MonthNamesDropDown change="monthnamesdropdown1_changeHandler(event)"/>
                    <s:Label id="mndd"/>
                </s:VGroup>
            </s:HGroup>
        </s:VGroup>
    </s:Panel>
    
</s:Application>
{% endhighlight %}
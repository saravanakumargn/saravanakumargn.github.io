---
layout: post
title: ExtJs or Sencha touch call custom Dateformat function
date: 2014-06-30 16:52
author: saravanakumargn
comments: true
categories: [dateform, Ext JS, Ext JS 4.2, ExtJs, Sench Touch, Sencha, Sencha Touch 2.3, senchatouch, util functions]
---

In this post I am going to show how to call custom date-format function which is help to convert MySQL date-format user defined format. For example while saving date-time value to database(here MySQL) it will save like this **2014-06-25 11:34:16** and in sencha touch screen i want to display like this **25 Jun 2014 11:34 AM**.

I have already created some custom utilities function to convert dates. Lets see the method to convert MySQL date to user defined date format.

`MyApp.util.CommonUtils`
{% highlight javascript %} 
Ext.define('MyApp.util.CommonUtils', {
    statics: {
        uiDate:function(value) {
            return Ext.util.Format.date(value, 'd M Y g:i A');
        },
    }
});
{% endhighlight %}

`Controller logic`
{% highlight javascript %} 
var a = record.get('date_modi').split(/[^0-9]/);
var dt = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
Ext.ComponentQuery.query('myappform formpanel #date_modi')[0].setValue(Tracker.util.CommonUtils.uiDate(dt));
//#date_modi is textinput itemid in to myappform view.
{% endhighlight %}
---
layout: post
title: Create common util methods and using runtime in Sencha Touch and ExtJs
date: 2014-05-06 19:28
author: saravanakumargn
comments: true
categories: [Ext JS, Ext JS 4.2, ExtJs, Sench Touch, Sencha, Sencha, Sencha Touch, Sencha Touch 2.3, util]
---

Sometimes we required some common methods to parse date or other number formats. So we need to create few common static methods to achieve that. Here i created few common methods to parse dates like today's date to mysql date while sending data from sencha applicatin to mysql database and display dates in correct format from DB.

 
{% highlight javascript %}
Ext.define('MyApp.util.CommonUtils', {
    statics: {
        dateDisplay: function(value) {
            //console.log("Enter dateDisplay");
            return Ext.util.Format.date( value, 'd M - Y' );
        },
        myShow: function(value) {   //month year show
            //console.log("Enter dateDisplay");
            return Ext.util.Format.date( value, 'M, y' );
        },
        mysqlDate: function(value) {
            return Ext.util.Format.date( value, 'Y-m-d' );
        }
    }
});
{% endhighlight %}

Using the above custom utils methods and output is as below 

{% highlight javascript %}
MyApp.util.CommonUtils.mysqlDate(new Date()));	//This will return 2014-05-05
{% endhighlight %} 




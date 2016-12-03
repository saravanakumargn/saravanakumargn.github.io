---
layout: post
title: Sencha touch 2.3 and Extjs - Dynamically add extra parameters with store sync via controller
date: 2014-03-30 13:47
author: saravanakumargn
comments: true
categories: [Ext JS, Ext JS 4.2, Sench Touch, Sencha, Sencha Touch 2.3]
---

Lets see here how to add extra parameters while sync via controller.

We can use `extraParams` property in store class directly like below sample.

{% highlight javascript %}
api : {
	create : "http://localhost/api/getReports.php/create",
	read : "http://localhost/api/getReports.php/read",
	update : "http://localhost/api/getReports.php/update",
},
extraParams : {
	startDate : '2013-11-11',
	endDate : '2014-01-01'
},
{% endhighlight %}

But sometimes we can have a requirement like need to send parameter values dynamically. In the about example we used static start and end date values. But now i want to send start and end values based on user selection. So, date values are here coming from controller and this is a way to construct extra parameters.

{% highlight javascript %}
var reportsStore = Ext.getStore("reportsStore");
this.reportEndDate = '2014-01-01'
this.reportStartDate = '2014-31-03'
reportsStore.getProxy().setExtraParam("startDate", this.reportStartDate);
reportsStore.getProxy().setExtraParam("endDate",  this.reportEndDate);
{% endhighlight %}

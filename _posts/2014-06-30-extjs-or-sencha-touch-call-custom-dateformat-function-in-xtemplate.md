---
layout: post
title: ExtJs or Sencha touch call custom Dateformat function in XTemplate
date: 2014-06-30 17:04
author: saravanakumargn
comments: true
categories: [Ext JS, Ext JS 4.2, Ext.XTemplate, Sench Touch, Sencha, Sencha Touch, Sencha Touch 2.3, Template, tpl]
---

In this post I am going to show how to call custom date-format function which is help to convert some date format to user defined format. For example while saving date-time value to database(here MySQL) it will save like this <strong>20140625</strong> and in sencha touch screen i want to display like this <strong>25 Jun 2014</strong>.

I already created some custom utilities function to convert dates. Lets see the method to convert custom date format to user defined date format.

`MyApp.util.CommonUtils`
{% highlight javascript %}
Ext.define('MyApp.util.CommonUtils', {
    statics: {
        uiDate:function(value) {
            return Ext.util.Format.date(value, 'd M Y g:i A');
        },
        //yyyymmdd-20140728 to js date format
        mysqlToJsDate: function(value) {
            return new Date(value.substring(0, 4), value.substring(4, 6), value.substring(6, 8));
        }
    }
});
{% endhighlight %}

`XTemplate view page`
{% highlight javascript %}
Ext.define('MyApp.view.MyViewPage', {
    extend: 'Ext.Container',
    alias: 'widget.myviewpage',
    config: {
        tpl: Ext.create('Ext.XTemplate',
                '</br><div class="text-center">List</div></br>',
                '<div class="container">',
                '<tpl for="."><div style="padding: 6px;">',
                '<div class="alignleft">{myamount}-{my_date:this.dmyFormat}</div><div class="alignright">{my_subject}</div></div></br>',
                '</tpl>',
                '</div>',
                {
                    dmyFormat: function(item) {
                        return Tracker.util.CommonUtils.dmyShow(Tracker.util.CommonUtils.mysqlToJsDate(item));
                    }
                }
        ),
    }
});
{% endhighlight %}


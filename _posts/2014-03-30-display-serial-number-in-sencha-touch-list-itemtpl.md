---
layout: post
title: Display Serial number in Sencha touch list and DataView  itemTpl
date: 2014-03-30 19:57
author: saravanakumargn
comments: true
categories: [Ext JS, Ext JS 4.2, Sench Touch, Sencha, Sencha Touch 2.3]
---

In list or DataView we need to use {#} in itemTpl to display index value. This will display index starts from value 0. 

If need to display index value start from 1 then we can use {#+1}.

{% highlight javascript %}
var touchTeam = Ext.create('Ext.DataView', {
    fullscreen: true,
    store: {
        fields: ['name', 'age'],
        data: [
            {name: 'Jamie',  age: 100},
            {name: 'Rob',   age: 21},
            {name: 'Tommy', age: 24},
            {name: 'Jacky', age: 24},
            {name: 'Ed',   age: 26}
        ]
    },
//    itemTpl: '<div>{#}. {name} is {age} years old</div>'   // index starts from 0
    itemTpl: '<div>{#+1}. {name} is {age} years old</div>'   // index starts from 1
});
{% endhighlight %}
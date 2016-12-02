---
layout: post
title: Sencha touch list Cannot call method 'getHeader' of undefined
date: 2014-04-09 18:26
author: saravanakumargn
comments: true
categories: [Sench Touch, Sencha, Sencha Touch 2.3]
---

Here my task is create list view in sencha touch and assigned store values dynamically. So when i try to change store it throws "Uncaught TypeError: Cannot call method 'getHeader' of undefined" error in List.js. But i dont want to remove list group. so changed pinHeaders property to false. So now i am able to change store dynamically with group. 
 
{% highlight javascript %}
Ext.create('Ext.List', {
   fullscreen: true,
   itemTpl: '<div class="contact">{firstName} <strong>{lastName}</strong></div>',
   store: store,
   grouped: true,
   pinHeaders: false,
});
{% endhighlight %}


This is not correct solution. But For the time being I used this solution. Please let me know if anyone know how to fix without change pinHeaders property.

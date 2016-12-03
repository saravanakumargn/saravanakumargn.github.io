---
layout: post
title: Sencha touch setmask (Display Load Mask or Waiting) while loading data in store
date: 2014-04-23 12:00
author: saravanakumargn
comments: true
categories: [Sench Touch, Sencha, Sencha Touch 2.3, Sencha touch setmask while loading data in store]
---

We need to setmask(prevent user interaction and show loading message) while loading data in sencha touch. Sencha touch setMasked(`Boolean/Object/Ext.Mask/Ext.LoadMask`Boolean/Object/Ext.Mask/Ext.LoadMask) gives option to add mask into containers. But every time we need to manually add the mask and remove the mask. Instant of this manually doing things we can use store listeners.

My requirement here is i have a one store for CRUD process. So every time when i try to sync and loading the data's i want to setmask of the view. My store code is like the below.

I used beforeload, beforesync, load, metachange, removerecords, updaterecord, write, addrecords events for this task.

`store/Accounts.js`
{% highlight javascript %}
Ext.define("MyApp.store.transaction.Accounts", {
    extend: "Ext.data.Store",
    requires: ["MyApp.model.transaction.Account"],
    config: {
        model: "MyApp.model.transaction.Account", 
        storeId: 'myappstore',
        proxy: {
            type: "MyAppProxy",		// custom proxy
            api: {
                create: "http://localhost/getData.php/create",
                read: "http://localhost/getData.php/accounts",
                update: "http://localhost/getData.php/update",
                destroy: "http://localhost/getData.php/delete"
            },
        pageSize: 1,
        listeners: {
            beforeload: function() {
                //console.log("beforeload");
                Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: 'Loading...'
                });
            },
            beforesync: function() {
               Ext.Viewport.setMasked({
                    xtype: 'loadmask',
                    message: 'Loading...'
                });
            },
            load: function() {
                //console.log("load");
                Ext.Viewport.setMasked(false);
            },
            metachange: function() {
                //console.log("load");
                Ext.Viewport.setMasked(false);
            },
            removerecords: function() {
                //console.log("load");
                Ext.Viewport.setMasked(false);
            },
            updaterecord: function() {
                //console.log("load");
                Ext.Viewport.setMasked(false);
            },
            write: function() {
                //console.log("load");
                Ext.Viewport.setMasked(false);
            },
            addrecords: function() {
                //console.log("load");
                Ext.Viewport.setMasked(false);
            },       
        }
    },
});
{% endhighlight %}


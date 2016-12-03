---
layout: post
title: Create constants variables and using runtime in Sencha Touch and ExtJs
date: 2014-05-06 19:50
author: saravanakumargn
comments: true
categories: [constants variables, Ext JS, Ext JS 4.2, ExtJs, runtime errors, Sench Touch, Sencha, Sencha, Sencha Touch, Sencha Touch 2.3]
---

Here we will see how to create Constants variables and how to use in sencha application. Constants help to holds a value that is assigned when the program is compiled, and never changes at runtime. For best practice while programming all string should be constant variable. This will help to avoid run time errors upon using strings. Because while compiling itself it will throw error. For example I have some menu in my application and all have a fixed string value. My code is like below:
 
{% highlight javascript %}
Ext.define("MyApp.constants.Constants", {
    singleton: true,
    LOGIN_URL: "http://myappurl.dev/page/api/uservalidate/user",
    LOGOUT_URL: "http://myappurl.dev/page/api/uservalidate/signout",
    GET_USERS_URL: "http://myappurl.dev/page/api/getrecords/all",
	APP_EXIT: "Exit"
});
{% endhighlight %}

In above example I define all urls as constants. so whenever i want to use those urls i can refer that constant variables. So this practice never produce any spelling mistake or any other errors on runtime.

**How to use constants**

In application we can refer directly class name with variable name. Because this constants class defined as a singleton class.
 
{% highlight javascript %}
MyApp.constants.Constants.USER_TRACKER_URL
{% endhighlight %}


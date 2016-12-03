---
layout: post
title: Google oauth with local development environment returns "invalid redirect_uri"
date: 2014-07-08 20:08
author: saravanakumargn
comments: true
categories: [google oauth, HWIOAuthBundle, invalid redirect_uri, social login, symfony2]
---

Google oauth with local development environment returns `invalid redirect_uri`invalid redirect_uri


Issue: when i try to use google oauth with hwIOAuthBundle for my symfony2 project i got `invalid redirect_uri` error message. How to test my application with google oauth authentication.

Solution: Google oauth does not support Apache HTTP server Virtual host. For example i have access my application like "myapp.dev". So i got "invalid redirect_uri" error message from google end. 

So i point out my application to localhost and while create new client Id in google app console i pointed 
 
{% highlight bash %}
REDIRECT URIS = http://localhost/smt/web/app_dev.php/login/check-google
{% endhighlight %}

as the above. So, now i can able to login through google oauth in my local environment.

[![google-oauth_redirect_url](/assets/img/posts/google-oauth_redirect_url.jpg)](/assets/img/posts/google-oauth_redirect_url.jpg)
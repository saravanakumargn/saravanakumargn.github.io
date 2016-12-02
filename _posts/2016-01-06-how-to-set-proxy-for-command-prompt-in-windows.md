---
layout: post
title: how to set proxy for command prompt in windows
date: 2016-01-06 12:01
author: saravanakumargn
comments: true
categories: [cmd, cmd, proxy, windows, windows]
---

Sometimes we need to use commend prompt to install/update application dependencies. If we are accessing internet using any proxy then directly we cannot access from commend prompt.

So we need to use http_proxy and https_proxy windows environment variables with proxy and credentials.

{% highlight bash %}
set http_proxy=http://<<username>>:<<password>>@<<proxy>>:<<port>>

set https_proxy=http://<<username>>:<<password>>@<<proxy>>:<<port>>
{% endhighlight %}

For example consider my proxy details like below:
proxy: 123.456.789.10
port: 8084
username: sara
password: pass@1234

{% highlight bash %}
set http_proxy=http://sara:pass0x40123@123.456.789.10:8084

set https_proxy=http://sara:pass0x40123@123.456.789.10:8084
{% endhighlight %}

My password contains special symbol. So I need to to pass equivalent HEX value. Here equivalent @ is 0x40\. Same way other hex values for all special symbols available [here](http://www.ascii.cl/htmlcodes.htm) (http://www.ascii.cl/htmlcodes.htm)

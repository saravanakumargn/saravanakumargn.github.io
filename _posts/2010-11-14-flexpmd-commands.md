---
layout: post
title: FlexPMD Commands
date: 2010-11-14 05:33
author: saravanakumargn
comments: true
categories: [Adobe Flex 3, AS3, flex-pmd-command-line-1.2, FlexPMD, FlexPMD Commands]
---

Download and extract latest FlexPMD tool from [here](http://opensource.adobe.com/wiki/display/flexpmd/Downloads)  
To start FlexPMD, specify your project information using the correct arguments, as shown below: 

{% highlight bash %}
java -Xmx256m -jar flex-pmd-command-line-1.2.jar -s ../../"My Documents/Flex Builder 3"/PMDTest/src/ -o ../PMDTestReport/ 
{% endhighlight %} 

here i kept FlexPMD tool main folder in my desktop. After executing FlexPMD tool PMdTestReport folder created on desktop with pmd.xml file.
---
layout: post
title: Find last inserted row id in Adobe AIR with SQLlite
date: 2012-03-04 11:19
author: saravanakumargn
comments: true
categories: [Adobe AIR, Adobe AIR, AS3, last_insert_rowid(), SQLLIte]
---

Some times we may be required to get last inserted row id for updating data in client side.

When we need to select particular row immediately insert any row then we need last insert row id for select row with where option. We need use last_insert_rowid function. last_insert_rowid() function returns the last inserted rowid from the database connection which invoked the function. Code like following...

here the code for Adobe AIR - SQLLite get last inserted row id

{% highlight as3 %}
var valueDetails:String = "Insert sample";
var stmt:SQLStatement = new SQLStatement();
stmt.sqlConnection = inLblConn;
stmt.text = "INSERT INTO IMDT (value) VALUES" +
"('"+valueDetails+"');";
stmt.execute();
stmt.text = "SELECT last_insert_rowid() as ID";
stmt.execute();
var lastInsertedReceivedMsgId:int = stmt.getResult().data[0].ID;
{% endhighlight %}

In the above sample lastInsertedReceivedMsgId now have the last inserted row id.

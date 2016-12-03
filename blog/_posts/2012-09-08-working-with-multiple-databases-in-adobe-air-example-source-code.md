---
layout: post
title: Working with multiple databases in Adobe AIR Example source code
date: 2012-09-08 14:33
author: saravanakumargn
comments: true
categories: [Adobe AIR]
---

Use the SQLConnection.attach() method to open a connection to an additional database on a [SQLConnection](http://help.adobe.com/en_US/Flash/CS5/AS3LR/flash/data/SQLConnection.html) instance that already has an open database. Here is the example code for open multiple database in Adobe AIR

{% highlight xml %}
<?xml version="1.0" encoding="utf-8"?>
<s:WindowedApplication xmlns:fx="http://ns.adobe.com/mxml/2009" 
					   xmlns:s="library://ns.adobe.com/flex/spark" 
					   xmlns:mx="library://ns.adobe.com/flex/mx"
					   creationComplete="windowedapplication1_creationCompleteHandler(event)">
	<fx:Script>
		<![CDATA[
			import mx.events.FlexEvent;

			protected function windowedapplication1_creationCompleteHandler(event:FlexEvent):void
			{
				var conn:SQLConnection = new SQLConnection(); 

				conn.addEventListener(SQLEvent.OPEN, openHandler); 
				conn.addEventListener(SQLErrorEvent.ERROR, errorHandler); 

				// The database file is in the application storage directory 
				var folder:File = File.applicationStorageDirectory; 
				var dbFile:File = folder.resolvePath("DBSample.db"); 
				var dbFile1:File = folder.resolvePath("DBSample1.db"); 

				conn.open(dbFile); 
				conn.attach("dbFileName", dbFile1);			//	dbFileName :  is name for the dbFile1 connection

				var createStmt:SQLStatement = new SQLStatement(); 
				createStmt.sqlConnection = conn; 

				var sql:String =  
					"CREATE TABLE IF NOT EXISTS employees (" +  
					"    empId INTEGER PRIMARY KEY AUTOINCREMENT, " +  
					"    firstName TEXT, " +  
					"    lastName TEXT, " +  
					"    salary NUMERIC CHECK (salary > 0)" +  
					")"; 
				createStmt.text = sql; 

				try 
				{ 
					createStmt.execute(); 
					trace("Table created"); 
				} 
				catch (error:SQLError) 
				{ 
					trace("Error message:", error.message); 
					trace("Details:", error.details); 
				} 

				createStmt = new SQLStatement(); 
				createStmt.sqlConnection = conn; 
				var sql1:String =  
					"CREATE TABLE IF NOT EXISTS dbFileName.employees1 (" +  		// here refer the database with table
					"    empId INTEGER PRIMARY KEY AUTOINCREMENT, " +  
					"    firstName TEXT, " +  
					"    lastName TEXT, " +  
					"    salary NUMERIC CHECK (salary > 0)" +  
					")"; 
				createStmt.text = sql1; 

				try 
				{ 
					createStmt.execute(); 
					trace("Table created"); 
				} 
				catch (error:SQLError) 
				{ 
					trace("Error message:", error.message); 
					trace("Details:", error.details); 
				} 
			}

			private function openHandler(event:SQLEvent):void 
			{ 
				trace("the database was created successfully"); 
			} 

			private function errorHandler(event:SQLErrorEvent):void 
			{ 
				trace("Error message:", event.error.message); 
				trace("Details:", event.error.details); 
			} 

		]]>
	</fx:Script>
	<fx:Declarations>
		<!-- Place non-visual elements (e.g., services, value objects) here -->
	</fx:Declarations>
</s:WindowedApplication>
{% endhighlight %}
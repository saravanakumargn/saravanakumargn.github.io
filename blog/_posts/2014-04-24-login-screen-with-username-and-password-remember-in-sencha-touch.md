---
layout: post
title: Login screen with username and password remember in sencha touch
date: 2014-04-24 09:48
author: saravanakumargn
comments: true
categories: [Login screen with username and password remember in sencha touch, Sench Touch, Sencha, Sencha Touch 2.3]
---

In my sencha touch application i have login screen and i need to store username and email and want to display that values on application launch. I don't want to do the auto login. Just username and password retrieve from the local and set it to corresponding field. Also remember togglefield is always off. When user want to save their credentials user can on the togglefield. 

Here i am going to save the username and password values with the id of 'ext-record-2'.

 
{% highlight javascript %}
if (values.keepUser) {
	var user = Ext.create('MyApp.model.LoginLocalSave', {
		id: 'ext-record-2',
		uemail: values.uname,
		pword: values.pword,
		isRemember: values.keepUser
	});
	user.save();
}
{% endhighlight %}

On launching of login screen we need to read the username and password fields from the local storage by using the previously save id 'ext-record-2' and display it on the fields.

 
{% highlight javascript %}
launch: function() {
	var User = Ext.ModelMgr.getModel('MyApp.model.LoginLocalSave');
	User.load('ext-record-2', {
		success: function(user) {
			Ext.ComponentQuery.query('formpanel #uname')[0].setValue(user.get('uemail'));
			Ext.ComponentQuery.query('formpanel #pword')[0].setValue(user.get('pword'));
			Ext.ComponentQuery.query('formpanel #keepUser')[0].setValue(user.get('isRemember'));
		},
		failure: function() {
			console.warn('Auto-fill login failed.');
		}
	});
},
{% endhighlight %}

Here the full source code. 


`model/LoginLocalSave.js`
{% highlight javascript %}
Ext.define('MyApp.model.LoginLocalSave', {
    extend: 'Ext.data.Model',
    config: {
        fields: [
            {name: 'id', type: 'string'},
            {name: 'uemail', type: 'string'},
            {name: 'pword', type: 'string'},
            {name: 'isRemember', type: 'boolean'}
        ],
        proxy: {
            type: 'localstorage',
            id: 'userLogin'
        }
    }
});
{% endhighlight %}

`store/Login.js`
{% highlight javascript %}
Ext.define("MyApp.store.Login", {
    extend: "Ext.data.Store",
    config: {
        model: "MyApp.model.LoginLocalSave",
    }
});
{% endhighlight %}

 
`view/Login.js`
{% highlight javascript %}
Ext.define('MyApp.view.Login', {
    extend: 'Ext.form.Panel',
    alias: 'widget.login',
    requires: [
        'Ext.form.FieldSet',
        'Ext.field.Text',
        'Ext.field.Password',
        'Ext.Button'
    ],
    config: {
        items: [
            {
                xtype: 'titlebar',
                docked: 'top',
                title: 'Login'
            },
            {
                xtype: 'fieldset',
                items: [
                    {
                        xtype: 'textfield',
                        label: 'Username',
                        labelWidth: '40%',
                        name: 'uname',
                        itemId: 'uname',
                    },
                    {
                        xtype: 'passwordfield',
                        label: 'Password',
                        labelWidth: '40%',
                        name: 'pword',
                        itemId: 'pword',
                    },
                    {
                        xtype: 'togglefield',
                        label: 'Remember',
                        labelWidth: '40%',
                        name: 'keepUser',
                        itemId: 'keepUser',
                    }
                ]
            },
            {
                xtype: 'button',
                itemId: 'loginButton',
                margin: 20,
                padding: 8,
                text: 'Login',
                iconCls: 'action'
            }
        ]
    }
});
{% endhighlight %}


`controller/Login.js`
{% highlight javascript %}
Ext.define('MyApp.controller.Login', {
    extend: 'Ext.app.Controller',
    config: {
        requires: [
            'MyApp.view.Menu'
        ],
        refs: {
            login: 'login',
            loginPanel: 'login #loginPanel',
        },
        control: {
            "login textfield": {
                keyup: 'onKeyUp'
            },
            "login #loginButton": {
                tap: 'login'
            }
        }
    },
    onKeyUp: function() {
        Ext.ComponentQuery.query('formpanel #keepUser')[0].setValue(false);
    },
    launch: function() {
        var User = Ext.ModelMgr.getModel('MyApp.model.LoginLocalSave');
        User.load('ext-record-2', {
            success: function(user) {
                Ext.ComponentQuery.query('formpanel #uname')[0].setValue(user.get('uemail'));
                Ext.ComponentQuery.query('formpanel #pword')[0].setValue(user.get('pword'));
                Ext.ComponentQuery.query('formpanel #keepUser')[0].setValue(user.get('isRemember'));
            },
            failure: function() {
                console.warn('Auto-fill login failed.');
            }
        });
    },
    login: function(button, e, eOpts) {
        var errorString = '',
                form = button.up('formpanel');
        var values = form.getValues();
        var model = Ext.create("MyApp.model.Login", values);

        var errors = model.validate();
        if (!errors.isValid()) {
            errors.each(function(errorObj) {
                errorString += errorObj.getMessage() + "&lt;br /&gt;";
            });
            Ext.Msg.alert('Errors in your input', errorString);
        } else {
            //console.log("values.keepUser : " + values.keepUser);
            if (values.keepUser) {
                var user = Ext.create('MyApp.model.LoginLocalSave', {
                    id: 'ext-record-2',
                    uemail: values.uname,
                    pword: values.pword,
                    isRemember: values.keepUser
                });
                user.save();
            }
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Loading...'
            });
            //Ext.Msg.alert("Data is valid", "Success");
            Ext.data.JsonP.request({
                url: "http://localhost/api/login.php",
                params: {
                    uname: values.uname,
                    pword: values.pword,
                    //ct: new Date()
                },
                success: this.successCallback,
                failure: this.failureCallback
            });
            //this.successCallback();
        }
    },
    successCallback: function(result, request) {
		Ext.Msg.alert("Login success", resp);
	},
    // Failure
    failureCallback: function(resp, ops) {
        Ext.Viewport.setMasked(false);
        // Show login failure error
        Ext.Msg.alert("Login Failure", resp);
    }

});
{% endhighlight %}

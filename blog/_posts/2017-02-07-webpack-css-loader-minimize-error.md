---
layout: post
title: Solve Webpack css-loader minimize error
date: 2017-01-31 11:53
author: saravanakumargn
comments: true
categories: [Utils]
---

While i try to minify my CSS code using css-loader?minimize

Then error is like below..

{% highlight js %}
ERROR in ./src/index.scss
Module build failed: ModuleBuildError: Module build failed: Error: Cannot find module '...\node_modules\css-loader\index.js?minimize'
    at Function.Module._resolveFilename (module.js:469:15)
    at Function.Module._load (module.js:417:25)
    at Module.require (module.js:497:17)
    at require (internal/module.js:20:19)
{% endhighlight %}

So, In my webpack-dist.conf.js i changed instant of minimize argument i used minimize options.

{% highlight js %}
{
	test: /\.(css|scss)$/,
	loaders: ExtractTextPlugin.extract({
	  fallbackLoader: 'style-loader',
	  //loader: 'css-loader?minimize!sass-loader!postcss-loader'
	  use: [
	  {
		loader: 'css-loader',
		options: {
		  minimize: true || {/* CSSNano Options */}
		}
	  },
		"sass-loader",
		"postcss-loader"
	  ]
	})
},
{% endhighlight %}
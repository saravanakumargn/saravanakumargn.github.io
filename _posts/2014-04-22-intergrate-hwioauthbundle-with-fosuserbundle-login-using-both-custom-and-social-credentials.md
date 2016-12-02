---
layout: post
title: Intergrate HWIOAuthBundle with fosuserbundle - Login using both custom and social credentials
date: 2014-04-22 15:48
author: saravanakumargn
comments: true
categories: [FosUserBundle, HWIOAuthBundle, symfony2]
---

In my application i used only email id to validate the user. Here my requirement is user can login using both registered email id in my application as well social network provider(facebook) email id. When user try to login through facebook credentials no need to create new user id if user email id is already registered in our application. So bottom line here is no need to create user if email already exiting while login through all social providers(facebook, goolge, linkedin,twitter, etc).

The below logic to in is inspired [from](https://gist.github.com/danvbe/4476697 "https://gist.github.com/danvbe/4476697")

`composer.json`
{% highlight json %}
"require": {
	"hwi/oauth-bundle": "0.4.*@dev",
},
{% endhighlight %}

`appconfigparameters.yml`
{% highlight yaml %}
facebook_app_id: xxxxxxxx
facebook_app_secret: xxxxxxxxxxxxx
{% endhighlight %}

`appAppKernel.php`
{% highlight php5 %}
$bundles = array(
	new HWIBundleOAuthBundleHWIOAuthBundle(),
);
{% endhighlight %}

`appconfigconfig.yml`
{% highlight yaml %}
hwi_oauth:
    connect:
        account_connector: my_user_provider
    firewall_name: main
    http_client:
        verify_peer: false		# set this for is HTTP is not secured
    fosub:
        username_iterations: 30
        properties:
            facebook: facebook_id
    resource_owners:
        facebook:
            type:                facebook
            client_id:           "%facebook_app_id%"
            client_secret:       "%facebook_app_secret%"
            scope:               ""
{% endhighlight %}


`appconfigsecurity.yml`
{% highlight yaml %}
firewalls:
        dev:
            pattern:  ^/(_(profiler|wdt)|css|images|js)/
            security: false
        main:
            pattern: ^/
            form_login:
                provider: fos_userbundle
                csrf_provider: form.csrf_provider
                login_path: /login
                check_path: /login_check 
            oauth:
                resource_owners:
                    facebook:           "/login/check-facebook"
                login_path:        /login
                failure_path:      /login
 
                oauth_user_provider:
                    service: my_user_provider
            logout:
                path:   /logout
                target: /
                success_handler: tracker_user.logout_success_handler
            anonymous:    true
{% endhighlight %}			

`UserBundleResourcesconfigrouting.yml`
{% highlight yaml %}
#All FOS user routes
#HWIOAuthBundle routes
hwi_oauth_security:
    resource: "@HWIOAuthBundle/Resources/config/routing/login.xml"
    prefix: /login
 
hwi_oauth_connect:
    resource: "@HWIOAuthBundle/Resources/config/routing/connect.xml"
    prefix: /login
 
hwi_oauth_redirect:
    resource: "@HWIOAuthBundle/Resources/config/routing/redirect.xml"
    prefix:   /login
 
facebook_login:
    pattern: /login/check-facebook
{% endhighlight %}


`UserBundleEntityUser.php`
{% highlight php %}
class User extends BaseUser
{
	//All existing user properties

	/** @ORMColumn(name="facebook_id", type="string", length=255, nullable=true) */
    protected $facebook_id;
 
    /** @ORMColumn(name="facebook_access_token", type="string", length=255, nullable=true) */
    protected $facebook_access_token;
	
	/**
     * Set facebook_id
     *
     * @param string $facebookId
     * @return User
     */
    public function setFacebookId($facebookId)
    {
        $this-&gt;facebook_id = $facebookId;

        return $this;
    }

    /**
     * Get facebook_id
     *
     * @return string 
     */
    public function getFacebookId()
    {
        return $this-&gt;facebook_id;
    }

    /**
     * Set facebook_access_token
     *
     * @param string $facebookAccessToken
     * @return User
     */
    public function setFacebookAccessToken($facebookAccessToken)
    {
        $this-&gt;facebook_access_token = $facebookAccessToken;

        return $this;
    }

    /**
     * Get facebook_access_token
     *
     * @return string 
     */
    public function getFacebookAccessToken()
    {
        return $this-&gt;facebook_access_token;
    }
}
{% endhighlight %}

 
`UserBundleSecurityCoreUserFOSUBUserProvider.php`
{% highlight php5 %}
<?php
namespace  TrackerUserBundleSecurityCoreUser;
 
use HWIBundleOAuthBundleOAuthResponseUserResponseInterface;
use HWIBundleOAuthBundleSecurityCoreUserFOSUBUserProvider as BaseClass;
use SymfonyComponentSecurityCoreUserUserInterface;
 
class FOSUBUserProvider extends BaseClass
{
 
    /**
     * {@inheritDoc}
     */
    public function connect(UserInterface $user, UserResponseInterface $response)
    {
        $property = $this-&gt;getProperty($response);
        $username = $response-&gt;getUsername();
 
        //on connect - get the access token and the user ID
        $service = $response-&gt;getResourceOwner()-&gt;getName();
 
        $setter = 'set'.ucfirst($service);
        $setter_id = $setter.'Id';
        $setter_token = $setter.'AccessToken';
 
        //we "disconnect" previously connected users
        if (null !== $previousUser = $this-&gt;userManager-&gt;findUserBy(array($property =&gt; $username))) {
            $previousUser-&gt;$setter_id(null);
            $previousUser-&gt;$setter_token(null);
            $this-&gt;userManager-&gt;updateUser($previousUser);
        }
 
        //we connect current user
        $user-&gt;$setter_id($username);
        $user-&gt;$setter_token($response-&gt;getAccessToken());
 
        $this-&gt;userManager-&gt;updateUser($user);
    }
 
    /**
     * {@inheritdoc}
     */
    public function loadUserByOAuthUserResponse(UserResponseInterface $response)
    {
        $username = $response-&gt;getUsername();
        $useremail = $response-&gt;getEmail();	// get facebook email id
        $user = $this-&gt;userManager-&gt;findUserByEmail($useremail);
        //$user = $this-&gt;userManager-&gt;findUserBy(array($this-&gt;getProperty($response) =&gt; $useremail));
        //when the user is registrating
        if (null === $user) {
            $service = $response-&gt;getResourceOwner()-&gt;getName();
            $setter = 'set'.ucfirst($service);
            $setter_id = $setter.'Id';
            $setter_token = $setter.'AccessToken';
            // create new user here
            $user = $this-&gt;userManager-&gt;createUser();
            $user-&gt;$setter_id($username);
            $user-&gt;$setter_token($response-&gt;getAccessToken());
            $user-&gt;setUsername($useremail);
            $user-&gt;setEmail($useremail);
            $user-&gt;setPassword($username);
            $user-&gt;setEnabled(true);
            $this-&gt;userManager-&gt;updateUser($user);
            return $user;
        }
 
        $user = $this-&gt;userManager-&gt;findUserByEmail($useremail);
 
        $serviceName = $response-&gt;getResourceOwner()-&gt;getName();
        $setter = 'set' . ucfirst($serviceName) . 'AccessToken';
 
        //update access token
        $user-&gt;$setter($response-&gt;getAccessToken());
 
        return $user;
    }
}
{% endhighlight %}


`UserBundleResourcesconfigservices.yml`
{% highlight yaml %}
parameters:
    my_user_provider.class:  TrackerUserBundleSecurityCoreUserFOSUBUserProvider
    
    my_user_provider:
        class: "%my_user_provider.class%"
        arguments: [@fos_user.user_manager,{facebook: facebook_id}]
{% endhighlight %}		

`login.html.twig`
{% highlight twig %}
<a class="btn btn-social btn-facebook" href="{% raw %}{{ path('hwi_oauth_service_redirect', {'service': 'facebook' }) }}{% endraw %}" alt="Sign in with Facebook">
	<i class="fa fa-facebook"></i> Sign in with Facebook
</a>
{% endhighlight %}
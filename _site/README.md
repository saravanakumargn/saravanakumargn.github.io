# saravanakumargn.github.io


Production build
```
jekyll build --config _config.yml,_config_prod.yml
```

Steps for push _site folder to gh-pages
-
### Step 1
Commit all codes in master branch
### Step 2
Use subtree push to send it to the gh-pages branch on GitHub.
```sh
git subtree push --prefix _site origin gh-pages
```



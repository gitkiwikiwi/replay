# Decentralized Video Sharing dApp

> A Blockstack Vue.js dApp built for video sharing.

## Build Setup

``` bash
# install dependencies
# previously we used yarn install. This is no longer supported.
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

To get started with Blockstack decentralized applications visit [Blockstack](https://blockstack.org)

## Continuous Deploy from Repo On Netlify

- fork this repo into your own github account.

- on the Netlify.com, sign into the dashboard using your github account 

- press the green button "New site from Git" 

- walk thru wizard to authorize Netlify to setup the Continuous Deployment based on your repo(Connect to Git provider, Pick Repo, set the Build/Deploy settings)

- Build/Deploy Settings

Build command: `npm run build`

Publish directory: `dist`

Production branch: `master`

Extra setup steps: setup SSL/TLS certificate, setup a cname, force https
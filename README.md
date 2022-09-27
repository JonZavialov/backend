<h1 align="center">Backend</h1>

<p align="center">
<img src="https://img.shields.io/tokei/lines/github/JonZavialov/backend?color=lightgray" alt="Total Lines" />
<img src="https://img.shields.io/github/repo-size/JonZavialov/backend?color=lightgray&logo=GitHub" alt="GitHub Repo Size" />
<img src="https://img.shields.io/github/commit-activity/m/JonZavialov/backend?color=lightgray&logo=GitHub" alt="Commit Activity" />
</p>

<p align="center">The backend for my website</p>
<a href="https://jonzav.me/">View Website</a> <br>
<a href="https://api.jonzav.me/">View Documentation</a>

## 💻 Frontend

View the frontend code at its [repository](https://github.com/JonZavialov/portfolio4).

## 📖 Documentation

View the docs for this api [here](https://api.jonzav.me).

## 🧪 Try It

#### Clone repo

- [Git](https://git-scm.com/downloads)

```
git clone https://github.com/JonZavialov/backend.git
cd backend
```

#### Clone docs

- [Git](https://git-scm.com/downloads)

```
git clone https://github.com/JonZavialov/backend-docs.git
```

#### Move files into public folder

1. Create a folder in the root directory called `public`
2. From the `docs` folder, move everything except the README and index file into the `public` folder.

#### Install dependencies

- [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```
npm i
```

#### Generate ssl certificates

```
mkdir sslcert
```

Generate an ssl certificate with whatever tool you prefer using. For free certificates, I use [Certbot](https://certbot.eff.org/) with [Let's Encrypt](https://letsencrypt.org/). Once generated, move `cert.pem` and `privkey.pem` into the `sslcert` directory.

#### Add environment variables

Create a file called `.env`

```
BASE_OAUTH_VALIDATION_URL=https://api.github.com/applications
CLIENT_ID=<your github api client id>
CLIENT_SECRET=<your github api client secret>
BASE_USER_URL=https://api.github.com/user
BASE_URL=https://github.com/login/oauth/access_token
BASE_DAYS_URL=https://national-api-day.herokuapp.com/api/date
```

#### Run server

- [node](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm)

```
node index.js
```

## 👨‍💻 Development

This project is currently in progress by Jonathan.

<br><br><br><br>

[![badge](https://github.com/syxanash/awesome-web-desktops/blob/master/88x31.gif?raw=true)](https://github.com/syxanash/awesome-web-desktops)

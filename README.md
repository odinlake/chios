# chios

A club system for documenting recognitions.

## Getting Started

Install the latest version of [Node.js](https://nodejs.org/en/download/).
The commands `node -v` and `npm -v` should produce version numbers at or above 12.x.x and 6.x.x, respectively.
Clone the repository:

```
> git clone https://github.com/odinlake/chios
> cd chios
```

Make a local copy of the credentials file:

```
> cp credentials_template.hjson credentials.hjson
```

Modify `credentials.hjson` as necessary. 
To get full functionality you will need a MySql database and permission to create/delete/edit tables.
Let Node.js install required packages locally:

```
> cd nodejs/express
> npm install
```

Start a local server:

```
> npm start
```

Alternatively install `nodemon`.
Point your browser to http://127.0.0.1:3000.
That's it.








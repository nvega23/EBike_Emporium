// const express = require("express");
// const cookieParser = require('cookie-parser');
// const logger = require('morgan');
// const debug = require('debug');

// const cors = require('cors');
// const csurf = require('csurf');
// const { isProduction } = require('./config/keys');

// require('./models/User');
// require('./models/Product');
// require('./config/passport');
// const passport = require('passport');

// const userRouter = require('./routes/api/users');
// const productRouter = require('./routes/api/products');
// const csrfRouter = require('./routes/api/csrf');

// const app = express();
// app.use(passport.initialize());

// app.use(logger('dev')); // log request components (URL/method) to terminal
// app.use(express.json()); // parse JSON request body
// app.use(express.urlencoded({ extended: false })); // parse urlencoded request body
// app.use(cookieParser()); // parse cookies as an object on req.cookies

// // Security Middleware
// if (!isProduction) {
//     // Enable CORS only in development because React will be on the React
//     // development server (http://localhost:3000). (In production, the Express
//     // server will serve the React files statically.)
//     app.use(cors());
// }

// // Set the _csrf token and create req.csrfToken method to generate a hashed
// // CSRF token
// app.use(
//     csurf({
//       cookie: {
//         secure: isProduction,
//         sameSite: isProduction && "Lax",
//         httpOnly: true
//       }
//     })
// );

// // Attach Express routers
// app.use('/api/users', require('./routes/api/users'));
// app.use('/api/products', productRouter);
// app.use('/api/csrf', csrfRouter);

// app.use((req, res, next) => {
//     const err = new Error('Not Found');
//     err.statusCode = 404;
//     next(err);
// });

// if (isProduction) {
//   const path = require('path');
//   // Serve the frontend's index.html file at the root route
//   app.get('/', (req, res) => {
//     res.cookie('CSRF-TOKEN', req.csrfToken());
//     res.sendFile(
//       path.resolve(__dirname, '../frontend', 'build', 'index.html')
//     );
//   });

//   // Serve the static assets in the frontend's build folder
//   app.use(express.static(path.resolve("../frontend/build")));

//   // Serve the frontend's index.html file at all other routes NOT starting with /api
//   app.get(/^(?!\/?api).*/, (req, res) => {
//     res.cookie('CSRF-TOKEN', req.csrfToken());
//     res.sendFile(
//       path.resolve(__dirname, '../frontend', 'build', 'index.html')
//     );
//   });
// }

// const serverErrorLogger = debug('backend:error');

// // Express custom error handler that will be called whenever a route handler or
// // middleware throws an error or invokes the `next` function with a truthy value
// app.use((err, req, res, next) => {
//   serverErrorLogger(err);
//   const statusCode = err.statusCode || 500;
//   res.status(statusCode);
//   res.json({
//     message: err.message,
//     statusCode,
//     errors: err.errors
//   })
// });


// module.exports = app;
const express = require('express');
// const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require("cors")
const { isProduction } = require("./config/keys")
const csurf = require("csurf")
const debug = require("debug");

require('./models/User.js');
require('./models/Review.js');
require('./models/Post.js');
require("./config/passport");
require('./models/Cart.js');

const passport = require("passport")
const usersRouter = require('./routes/api/users');
const reviewsRouter = require("./routes/api/reviews");
const postsRouter = require('./routes/api/posts')
const csrfRouter = require("./routes/api/csrf")

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize())

if (!isProduction) {
    // Enable cors only in development b/c React will only be on React development server
    // server will serve react files statically
    app.use(cors());
}

//setup csrf token
app.use(csurf({
  cookie: {
      secure: isProduction,
      sameSite: isProduction && "Lax",
      httpOnly: true
  }
}))

app.use('/api/users', usersRouter);
app.use('/api/post', postsRouter)
app.use('/api/csrf', csrfRouter)
app.use("/api/reviews", reviewsRouter);

if (isProduction) {
    const path = require('path');
    // Serve the frontend's index.html file at the root route
    app.get('/', (req, res) => {
      res.cookie('CSRF-Token', req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, '../frontend', 'build', 'index.html')
      );
    });

    // Serve the static assets in the frontend's build folder
    app.use(express.static(path.resolve("../frontend/build")));

    // Serve the frontend's index.html file at all other routes NOT starting with /api
    app.get(/^(?!\/?api).*/, (req, res) => {
      res.cookie('CSRF-Token', req.csrfToken());
      res.sendFile(
        path.resolve(__dirname, '../frontend', 'build', 'index.html')
      );
    });
}

app.use((req, res, next) => {
    const err = new Error("not found")
    err.statusCode = 404
    next(err)
})

const serverErrorLogger = debug("backend:error");

app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode)
    res.json({
        message: err.message,
        statusCode,
        errors: err.errors
    })
})

module.exports = app;

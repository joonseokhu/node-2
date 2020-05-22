const express = require('express');
const app = express();

const userRoutes = require('./routes/user');
const articleRoutes = require('./routes/article');
const userService = require('./services/user');

// const path = require('path')
// const file = require('./file');
// const { readFile, writeFile } = require('./file');

app.use(express.json());

app.use(async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return next();
    // console.log('auth 헤더', authHeader);
    const data = await userService.checkToken(authHeader);
    const user = await userService.getOneUser({ id: data._id });

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
});

app.use('/user', userRoutes);
app.use('/article', articleRoutes);

app.use((err, req, res, next) => {
  console.error('에러', err);
  if (Array.isArray(err)) {
    const [status, message] = err;
    return res.status(status || 500).json({
      message: message || 'Unknown Error',
    });
  }
  res.status(err.status || 500).json({
    message: err.message || 'Unknown Error',
  });
});

// app.get('/user/:id', (req, res, next) => {
//   res.json({
//     id: req.params.id,
//     url: req.url,
//   });
// });

// app.post('/file/:name', (req, res, next) => {
//   const filename = `${req.params.name}.txt`;
//   const filePath = path.join(__dirname, filename);
//   const data = req.body.data;
  
//   writeFile(filePath, data)
//     .then(result => {
//       res.json({
//         message: '성공'
//       })
//     }).catch(err => {
//       res.status(500).json({
//         message: '실패'
//       })
//     });
// })

// app.get('/file/:name', (req,res,next) => {
//   const filename = `${req.params.name}.txt`;
//   const filePath = path.join(__dirname, filename);

//   readFile(filePath)
//     .then(data => {
//       res.json({
//         message: '성공',
//         data,
//       })
//     }).catch(err => {
//       res.status(500).json({
//         message: '실패'
//       })
//     })
// })

module.exports = app;
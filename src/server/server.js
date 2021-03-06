import express from 'express';
import path from 'path';
import webpack from 'webpack';
import config from '../../webpack.config';

const app = express();
const port = 8080;

const compiler = webpack(config);
app.use(require('webpack-dev-middleware')(compiler, { path: config.output.path }));
app.use(require('webpack-hot-middleware')(compiler));

// Render static index route
app.use(express.static(path.join(__dirname, '../client')));

// Redirect user back to index.html (used with react-router-dom)
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'client/index.html'));
});

app.listen(port, () => { console.log(`server.js has been served on port: ${port}`); });

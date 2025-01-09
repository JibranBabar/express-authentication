import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();


const PORT = process.env.PORT || 5000;

  app.use(morgan('tiny'));
  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

  let allowedOrigins = [/localhost:\d{4}$/];
  if (process.env.ALLOWED_CORS) {
    allowedOrigins = allowedOrigins.concat(process.env.ALLOWED_CORS.split(','));
  }

  const corsConfig = {
    origin: allowedOrigins,
    maxAge: 86400,
    credentials: true,
  };

  app.use(cors(corsConfig));

  app.get('/', (req, res) => {
    res.send('Server is working fine');
  });

  app.listen(PORT, () =>
    console.log(
      `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`,
    ),
  );

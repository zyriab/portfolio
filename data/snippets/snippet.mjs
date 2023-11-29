const app = express();

if (IS_ONLINE) app.use(helmet());

app.use(bodyParser.json());

app.use((req, res, next) => {
  // CORS is taken care of in AWS Lambda
  if (IS_OFFLINE) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization'
    );
  }

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

if (IS_ONLINE) {
  app.use(checkAuth);
  app.use(setReqMetadata);
  app.use(checkBucketVersioning);
} else {
  app.use(setTestingData);
}

app.use(
  '/',
  graphqlHTTP(async () => ({
    schema: gqlSchema,
    rootValue: gqlResolvers,
    validationRules: IS_ONLINE ? [NoSchemaIntrospectionCustomRule] : [],
    graphiql: IS_OFFLINE,
  }))
);

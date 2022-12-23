import app from "./app";

const createServer = () => {
  const port: number = process.env.PORT ? +process.env.PORT : 3010;
  return app.listen(port, () =>
    console.log(`Server is listening on port ${port}`)
  );
};

if (require.main === module) {
  createServer();
}

export { createServer };

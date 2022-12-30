import { green, red, bgRed, blue } from "colors";

export const successConnetionMessage = () => {
  const environment = process.env.NODE_ENV;
  switch (environment) {
    case "pro":
      return console.log(
        green(`MongoDB is connected ✅`) + red(`\nEnvironment: ${environment}`)
      );
    case "dev":
      return console.log(
        green(`MongoDB is connected ✅`) +
          green(`\nEnvironment: ${environment}`)
      );
    case "test":
      return console.log(
        green(`MongoDB is connected ✅`) +
          blue(`\nEnvironment: ${process.env.NODE_ENV}`)
      );
    default:
      return console.log(
        green(`MongoDB is connected ✅`) + bgRed(`\nUnknow environment`)
      );
  }
};

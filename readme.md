# Web Monitoring Tool

This is a project that allows web administrators to check and report the availability of websites, by checking if the request is accessible and also if it contains some required string.

## Requirements

1) This project uses the [Serverless Framework](https://serverless.com/framework/docs/), which requires Node.js `v6.5.0` or later.

2) It is necessary to have the Serverless CLI tool. This can be installed with `npm install -g serverless` or by following their [documentation](https://serverless.com/framework/docs/providers/aws/guide/installation/).

3) With the serverless CLI installed on your machine, you need to add AWS Credentials to it. Their [documentation](https://serverless.com/framework/docs/providers/aws/guide/credentials/) is pretty straightforward, but on the overall you need to create an IAM User with Admin Access.

4) With the user created, export the variables the following way:

```
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here
```

5) Create a new file `config.js` based on the existing `config.js.dist`.

6) Run the command `serverless deploy`, then both functions will be deployed on AWS Lambda. This will also start the cronjob function to be ran on a set interval defined on `config.js`.

7) With the deploy done, it is possible to see the logs of the application either on AWS CloudWatch or by the serverless CLI, by typing `serverless logs -f requestUrl -t`.

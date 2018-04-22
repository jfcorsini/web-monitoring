# Web Monitoring Tool

This is a project that allows web administrators to check and report the availability of websites, by checking if the request is accessible and if it contains some required string. The list of websites should be set on the `config.js` file.

This project works by using two AWS Lambda functions: *scrape* and *requestUrl*. The *scrape* function is called every defined set interval (as a cron job), where it will read from the configuration file the list of urls and, for each, it will call the *requestUrl* function. This second Lambda function sends a GET request to the chosen URL and searches for the string pattern defined on `config.js`, and after that it will be saved on AWS CloudWatch as a log containing information about the time this request took,the url and the status. Possible status at the moment are:

* success: response status code is between 200 and 300, and the required content was found on the page;
* not_fulfilled: response status code is between 200 and 300, but the required content was not found on the page;
* bad_request: response status code is not between 200 and 300;
* connection_refused: connection was refused by the server. It is likely that the link is wrong;
* server_error: connection could not be made, so this should be read as unknown.

Currently this project searches the string within the HTML with a simple indexOf, since it only needs to find strings within an HTML. But this could be easily extended to search for regular expressions if needed.

## Requirements

1) This project uses the [Serverless Framework](https://serverless.com/framework/docs/) to deploy Lambda function, which requires Node.js `v6.5.0` or later.

2) It is necessary to have the Serverless CLI tool. This can be installed with `npm install -g serverless` or by following their [documentation](https://serverless.com/framework/docs/providers/aws/guide/installation/).

3) An AWS IAM User with Admin Access.

In order to deploy and read the logs, it is necessary to export the AWS credentials to your machine so the Serverless CLI can have access to it. This can be done with the commands:

```
export AWS_ACCESS_KEY_ID=<your-key-here>
export AWS_SECRET_ACCESS_KEY=<your-secret-key-here
```

## Running the project

Now that you have all the requirements, you can simply run the command `make build`, which will create a new config file, deploy and read the logs. Alternatively, you can do the following:

1) Create a new file `config.js` based on the existing `config.js.dist`. This is where you can configure the rate on which the functions will be called, the list of urls, the AWS region and also the application stage (dev or prod).

2) Run the command `serverless deploy`, so both functions will be deployed on AWS Lambda. This will also start the cronjob function to be ran on a set interval defined on `config.js`. You can also use the alias of the makefile with `make deploy`

3) With the deploy done, it is possible to see the logs of the application either on AWS CloudWatch or by the serverless CLI, by typing `serverless logs -f requestUrl -t`. You can also use the alias on the Makefile with `make logs`.

4) Sit down and watch your logs, coming straight from AWS CloudWatch.

## Future: monitoring from multiple geographically distributed locations

With this software architechture, it is simple to monitor the connectivity of multiple geographical locations by using different AWS regions. By changing the region on the `config.js` file and deploying, both Lambda functions will be running in a new region and therefore the logs on CloudWatch will be based on this new region. The only problem is that these new logs will be saved on the CloudWatch of this new region, so not sharing information with other cloudwatches.

In order to collect all the data of multiple regions in a single report, I would say that AWS Cloud Trail can be a good way to gather multiple regions cloudwatch logs on an AWS S3 bucket, based on their [documentation](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-concepts.html#cloudtrail-concepts-trails-enable-all-regions-advantages). And since all of this data will be within AWS network, we can take advantage of its security and focus more on the monitoring tool.

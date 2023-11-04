node app.js sh14 14
node app.js sh12 12
node app.js sh11 11
node app.js sh7 7

node app.js XYZ 0
node app.js sh12 12
node app.js sh11 11
node app.js sh7 7

https://github.com/neverendingqs/serverless-websocket-example/blob/main/serverless.yml



aws forecast create-dataset-import-job \
--dataset-import-job-name update2023_10_28_1400 \
--dataset-arn arn:aws:forecast:ap-southeast-1:367739249270:dataset/aLowL \
--data-source "{\"S3Config\":{\"Path\":\"s3://a-low-l-training-data/forecast/train02.csv\",\"RoleArn\":\"arn:aws:iam::367739249270:role/service-role/AmazonForecast-ExecutionRole-1698411240187\"}}" \
--use-geolocation-for-time-zone \
--import-mode FULL

create new forecast

Bad Request
InvalidInputException : Invalid historical target field value start date provided. The start date must not be after 2023-10-28T09:39:00. Invalid forecast query end date provided. The end date must not be after 2023-10-28T10:39:00.
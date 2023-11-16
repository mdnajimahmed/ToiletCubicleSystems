# Problem Statement
This is a fun project that powers a dashboard that shows which cuibcle is free to use and which is occupied. This was part of an internal hackathon arrange by PETRONAS in collaboration with AWS. The goal was to solve a personal problem using as much AWS services as posible that has absolutely no product value. 

# Solution
- Install a Camera in the toilet!
- Upload the RTSP stream to the AWS kinesis video stream using a local gateway.
- Take a snapshot every second from the video and upload it in s3
- For each image upload by kinesis trigger a lambda function to process the event using AWS Lambda's integration with S3 event.
- Use Amazon Recognition Service to detect if there is a person in the image(therefore in the video feed).
- Publish the result received from the Amazon Rekognition Service to Kafka(Amazon MSK Serverless)
- Aggregate all the events using Kafka Streams Library to calculate the latest status of toilet usage and push the status to the dashboard via API Gateway WebSocket API.

# Architecture
<img width="784" alt="image" src="https://github.com/mdnajimahmed/ToiletCubicleSystems/assets/10337014/5092c2cb-1f8a-4d01-8d10-40ccd9aafb04">

# Operation
<img width="776" alt="image" src="https://github.com/mdnajimahmed/ToiletCubicleSystems/assets/10337014/931fdf8e-d004-4cd2-a8e5-12babb1073fe">

# Demo

https://github.com/mdnajimahmed/ToiletCubicleSystems/assets/10337014/27fd6e87-69a8-439a-9198-14df4e8b565e

# Code
You will find all the code in this repo with some commands. 
To see the kafka stream app, please visit https://github.com/mdnajimahmed/aLowLKStream/tree/main

# Suggested reading
- https://aws.amazon.com/blogs/iot/building-machine-learning-pipelines-with-amazon-kinesis-video-streams/
- https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/examples-gstreamer-plugin.html
- https://docs.aws.amazon.com/kinesisvideostreams/latest/dg/examples-rtsp.html

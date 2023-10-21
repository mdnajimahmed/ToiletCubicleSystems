# a_low_l


docker run -it 41d5d4947d79 /bin/bash -c "export AWS_ACCESS_KEY_ID=<AWS_ACCESS_KEY_ID>; export AWS_SECRET_ACCESS_KEY=<AWS_SECRET_ACCESS_KEY>; export AWS_DEFAULT_REGION=ap-southeast-1; ./kvs_gstreamer_sample a_low_l_cam01 rtsp://rtsp:qijbOpkq@192.168.0.11:554/av_stream/ch0"


aws dynamodb create-table --table-name facerecognition \
--attribute-definitions AttributeName=RekognitionId,AttributeType=S \
--key-schema AttributeName=RekognitionId,KeyType=HASH \
--provisioned-throughput ReadCapacityUnits=1,WriteCapacityUnits=1 \
--region ap-southeast-1


aws rekognition create-collection --collection-id facerecognition_collection --region ap-southeast-1

kafka-topics.sh --bootstrap-server=boot-9ixeduhy.c3.kafka-serverless.ap-southeast-1.amazonaws.com:9098 --command-config client.properties --create --topic alowl --partitions 1

kafka-topics.sh --bootstrap-server=boot-9ixeduhy.c3.kafka-serverless.ap-southeast-1.amazonaws.com:9098 --command-config client.properties --list 


kafka-console-producer.sh --bootstrap-server=boot-9ixeduhy.c3.kafka-serverless.ap-southeast-1.amazonaws.com:9098 --producer.config client.properties --topic alowl

kafka-console-producer.sh --bootstrap-server=boot-9ixeduhy.c3.kafka-serverless.ap-southeast-1.amazonaws.com:9098 --producer.config client.properties --topic alowl

kafka-console-consumer.sh --bootstrap-server=boot-9ixeduhy.c3.kafka-serverless.ap-southeast-1.amazonaws.com:9098 --consumer.config client.properties --topic alowl --from-beginning

kafka-topics.sh --bootstrap-server=boot-9ixeduhy.c3.kafka-serverless.ap-southeast-1.amazonaws.com:9098 --command-config client.properties --delete --topic alowl
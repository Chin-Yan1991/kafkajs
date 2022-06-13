## Install Kafka and Zookeeper with docker
docker-compose -f docker-compose.yml up -d 

## Start Kafka
docker exec -it kafka /bin/sh

## Create Topic after start Kafka
cd  /opt/kafka_2.13-2.8.1/bin
kafka-topics.sh --create --zookeeper zookeeper:2181 --replication-factor 1 --partitions 1 --topic first_kafka_topic

## List Topic
cd  /opt/kafka_2.13-2.8.1/bin
kafka-topics.sh --list --zookeeper zookeeper:2181

## List All PORT
sudo lsof -i -P -n
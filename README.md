# mini-project

steps:

1. launch a ubuntu server , all traffic from anywhere. and update the repos.
2. install mosquito , mosquitto-clients. (it will create a broker on host machine and clients will create a client also.)
3. now check if mqtt broker an dclient is recieving the data by running            mosquitto_sub -h 35.154.214.132 -p 1883 -t ayan
4. now data should be printing on terminal.
5. now  install node using sudo apt install -y nodejs , also install npm .
6. now install express and mqtt  from npm. use npm instal command.

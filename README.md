# mini-project

steps:

1. launch a ubuntu server , all traffic from anywhere. and update the repos.
   NOTE if you are using ubuntu 22 or greater, then all this line in mosquitto.conf file in .etc.mosquitto directory. "listener 1883
allow_anonymous true"
3. install mosquito , mosquitto-clients. (it will create a broker on host machine and clients will create a client also.)
4. now check if mqtt broker an dclient is recieving the data by running            mosquitto_sub -h 35.154.214.132 -p 1883 -t ayan
5. now data should be printing on terminal.
6. now  install node using sudo apt install -y nodejs , also install npm .
7. now install express and mqtt  from npm. use npm instal command.

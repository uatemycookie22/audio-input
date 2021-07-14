#This Dockerfile is for creating the Audio Input container (Phase 1)

FROM ubuntu:20.04

RUN apt-get update && \
      apt-get -y install sudo 

RUN useradd -ms /bin/bash ubuntu && \
    usermod -aG sudo ubuntu
# New added for disable sudo password
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

#Install more packages
RUN sudo apt update && \
	sudo apt install -y mosquitto-clients net-tools jq curl alsa-base alsa-utils git make vim

RUN curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
RUN sudo apt install nodejs  
RUN sudo npm install -g npm
# Set as default user
USER ubuntu
WORKDIR /home/ubuntu

COPY . /home/ubuntu

RUN sudo npm install

ENV DEBIAN_FRONTEND teletype

CMD ["/bin/bash"]

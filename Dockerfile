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

# Set as default user
USER ubuntu
WORKDIR /home/ubuntu

ENV DEBIAN_FRONTEND teletype

CMD ["/bin/bash"]
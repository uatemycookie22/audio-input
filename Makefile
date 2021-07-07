#Authors: Lysander --If you edit something in this file, put your name/nickname here!

#include checks.mk

#Constants


#Initiation

#PHONY rules
record:
	sudo arecord -d 2 -t wav temp.wav

format-audio: 
	base64 temp.wav > temp.base ;
	echo -n '{"audio":"' | cat - temp.base > temp ;
	echo -n '"}' | cat temp - > temp.txt ;
	tr -d ' \n' <temp.txt >temp.json ;

audio-pub:
	mosquitto_pub -h 127.0.0.1 -p 1883 -t /audio -f temp.json

clean:
	rm -f temp.wav temp.base temp temp.txt temp.json

.PHONY: record format-audio clean

                                 

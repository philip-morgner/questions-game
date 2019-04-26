#!/bin/sh
cd $HOME
#create home/.questgame
if [ ! -d .questgame ]; then
	mkdir .questgame
fi
cd .questgame
#create home/.questgame/questDB
if [ ! -d questDB ]; then
	mkdir questDB
fi
#create home/.questgame/loginDB
if [ ! -d loginDB ]; then
	mkdir loginDB
fi
#create home/.questgame/fakedb.txt
if [ ! -f fakedb.txt ]; then
	echo "" > fakedb.txt
fi
#create home/.questgame/login.txt
if [ ! -f login.txt ]; then
	echo "" > login.txt
fi
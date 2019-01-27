#!/bin/bash

sudo apt-get update
sudo apt-get upgrade -y
sudo apt-get dist-upgrade -u -y
sudo apt-get clean
sudo apt-get autoremove
sudo apt-get install -y python3-pip
sudo apt-get install -y python3-dev python3-tk python3-numpy
sudo apt-get install -y python3-scipy
sudo apt-get install -y python-opencv
sudo apt-get install -y libopencv-dev
sudo sed -i '$a export PYTHONPATH=/usr/local/lib/python3.5/distpackages:/usr/local/lib/python2.7/site-packages\n' ~/.bashrc

sudo apt-get install libmraa-dev cmake -y

git clone https://github.com/intel-iot-devkit/mraa
cd mraa
mkdir build
cd build
cmake ..
make
sudo make install
sudo ldconfig /usr/local/lib/

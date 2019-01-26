# Jerry

Hardware Based Password Manager
- Key features:
	- Finger print scanner to unlock device
		- Maybe camera and facial recognition?
		- Maybe pin pad thing just in case device fails
	- Generates secure random passwords for individual sites
		- use some analog environmental sensor maybe?
	- Arduino or Qualcomm based hardware that will connect to computer through USB and outputs password
		- Would be cool to automatically outputs password based on current browser URL
		- Easier way would be to select password for site using joystick control
	- Encrypt password on device and backup on cloud or local file

- Optional but cool features:
	- Unlock device through pairing with a personal phone
	- Act as a bluetooth/usb device and work on phones
	- Connect to computer through bluetooth instead of physical USB connection
	- 


Backup ideas:
- Finger printer scanner/facial recognition smart door
	- camera that takes pictures to send to phone to see who's at the door
- Snapchat spectacle type glasses 

# Mason
A hardware wallet that uses a fingerprint scanner to unlock. After it unlocks, it uses USB Keyboard API to output the password. The website that you are on can be selected by using the joystick and the screen attached. 

The board has a random generator and generates new random passwords for each site. 

We were also thinking about using facial recognition and a pin (0-9)x4 digits.

Dump all passwords to computer.
Dump all passwords to comptuer but encrypted.

Use Analog pin to generate random data.

Perhaps be able to backup passwords to a cloud database.

There should be some way that a user can tag new sites/send them to their arduino so that they can select them on the arduino screen.

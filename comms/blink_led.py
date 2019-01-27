from GPIOLibrary import GPIOProcessor
import time

GP = GPIOProcessor()

try:
    Pin34 = GP.getPin34()
    Pin34.out()
#
#   Pin29 = GP.getPin29()
#   Pin29.input()	

#   for i in range(0,20):
#       pinValue = Pin29.getValue();
	
#	if pinValue == 1:
    while True:
        Pin34.high()
        print("beep")
#       else:
#       time.sleep(1)
#       Pin34.low()
#       print("boop")
#       time.sleep(1)

finally:
    GP.cleanup()

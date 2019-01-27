import mraa
import time
print (mraa.getVersion())
led = mraa.Gpio(12)
led.dir(mraa.DIR_OUT)
led.write(0)
while True:
    time.sleep(1)
    led.write(1)
    time.sleep(1)
    led.write(0)

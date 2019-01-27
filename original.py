import mraa
import sleep
print (mraa.getVersion())
led = mraa.Gpio(34)
led.dir(mraa.DIR_OUT)
led.write(0)
while True:
    print("Turn On")
    led.write(1)
    time.sleep(1)
    print("Turn Off")
    led.write(0)
    time.sleep(1)

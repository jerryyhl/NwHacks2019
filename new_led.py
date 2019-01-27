from GPIOLibrary import GPIOProcessor
import time

GP = GPIOProcessor()

try:
    Pin34 = GP.getPin34()
    Pin34.out()

    while True:
        Pin34.high()
        print("beep")
        time.sleep(1)
        Pin34.low()
        print("boop")
        time.sleep(1)

finally:
    GP.cleanup()

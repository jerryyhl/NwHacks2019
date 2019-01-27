from GPIOLibrary import GPIOProcessor
import time

GP = GPIOProcessor()

try:
    Pin32 = GP.getPin32()
    Pin32.out()

    while True:
        Pin32.high()
        print("high")
        time.sleep(1)
        Pin32.low()
        print("low")
        time.sleep(1)

finally:
    GP.cleanup()


#include "HID-Project.h"
int clk = 1;   
int bit0 = 2;  
int i = 0;
int bin = 0;

void setup() {

  pinMode(clk, INPUT); 
  pinMode(bit0, INPUT); 

  Serial.begin(9600);

  // Sends a clean report to the host. This is important on any Arduino type.
  BootKeyboard.begin();
}

void loop() {
  // Light led if keyboard uses the boot protocol (normally while in bios)
  // Keep in mind that on a 16u2 and Arduino Micro HIGH and LOW for TX/RX Leds are inverted.
  
  if (digitalRead(clk) == 0){
       while(digitalRead(clk) == 0){}
       bin += digitalRead(bit0) * pow(2, 7-i);
  if (i == 7){
      i= 0;
      BootKeyboard.write((char) bin +2);
      bin = 0;
    } else{    
      i++;   
    }
      
    delay(10);
   }

}

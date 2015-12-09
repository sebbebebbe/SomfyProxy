/*
SomfyProxy433

Inspired from examples @ http://code.google.com/p/rc-switch/

 DATA PIN needs to be connected to Digital input #3
 VCC PIN into 5V on Arduino
 GND PIN into ground on same side as 5V VCC
 */

#include <RCSwitch.h>
RCSwitch mySwitch = RCSwitch();

#define DATA_PIN 3

void setup() {

 pinMode(DATA_PIN, INPUT);
 
 Serial.begin(9600);
 mySwitch.enableReceive(1);  // Receiver on interrupt 1 => that is pin D3
 Serial.println("SomfyProxy433 started");
}

static unsigned long count = 0;

void loop() {
 
 if (mySwitch.available()) {
   
   int value = mySwitch.getReceivedValue();
   
   if (value == 0) {
     Serial.print("Unknown encoding");
   } 
   else {
     outputPayload(mySwitch.getReceivedValue(), mySwitch.getReceivedBitlength(), mySwitch.getReceivedDelay(), mySwitch.getReceivedRawdata(),mySwitch.getReceivedProtocol());
   }
   
   mySwitch.resetAvailable();    
   count = 0;
 }
}

void outputPayload(unsigned long decimal, unsigned int length, unsigned int delay, unsigned int* raw, unsigned int protocol) {

  if (decimal == 0) {
    Serial.print("Unknown encoding.");
  } else {
    Serial.print("payload;");
    char* b = dec2binWzerofill(decimal, length);
    //Decimal value
    Serial.print(decimal);
    Serial.print(";");
    //bitlength
    Serial.print( length );
    Serial.print(";");
    //binary
    Serial.print( b );
    Serial.print(";");
    //tri-state
    Serial.print( bin2tristate( b) );
    Serial.print(";");
    //pulse length microseconds
    Serial.print(delay);
    Serial.print(";");
    //protocol
    Serial.println(protocol);
  }
  
  Serial.print("Raw data: ");
  for (int i=0; i<= length*2; i++) {
    Serial.print(raw[i]);
    Serial.print(",");
  }
  Serial.println();
  Serial.println();
}


char* bin2tristate(char* bin) {
  char returnValue[50];
  int pos = 0;
  int pos2 = 0;
  while (bin[pos]!='\0' && bin[pos+1]!='\0') {
    if (bin[pos]=='0' && bin[pos+1]=='0') {
      returnValue[pos2] = '0';
    } else if (bin[pos]=='1' && bin[pos+1]=='1') {
      returnValue[pos2] = '1';
    } else if (bin[pos]=='0' && bin[pos+1]=='1') {
      returnValue[pos2] = 'F';
    } else {
      return "not applicable";
    }
    pos = pos+2;
    pos2++;
  }
  returnValue[pos2] = '\0';
  return returnValue;
}

char * dec2binWzerofill(unsigned long Dec, unsigned int bitLength){
  static char bin[64]; 
  unsigned int i=0;

  while (Dec > 0) {
    bin[32+i++] = (Dec & 1 > 0) ? '1' : '0';
    Dec = Dec >> 1;
  }

  for (unsigned int j = 0; j< bitLength; j++) {
    if (j >= bitLength - i) {
      bin[j] = bin[ 31 + i - (j - (bitLength - i)) ];
    }else {
      bin[j] = '0';
    }
  }
  bin[bitLength] = '\0';
  
  return bin;
}

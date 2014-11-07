#define FASTADC 1
//#define F_CPU 8000000L


const int x1 = A0;
const int y1 = A1;
const int z1 = A2;
//const int x2 = A3;
//const int y2 = A4;
//const int z2 = A5;

const int g_sel_1 = 8;
const int g_sel_2 = 9;

int readx1 = 0;
int ready1 = 0;
int readz1 = 0;
//int readx2 = 0;
//int ready2 = 0;
//int readz2 = 0;

int lastTime = 0;
int currTime1 = 0;
int currTime2 = 0;
int deltaTime = 0;
int meassureTime = 0;

String inputString="";
boolean Stream =false;


// defines for setting and clearing register bits
#ifndef cbi
#define cbi(sfr, bit) (_SFR_BYTE(sfr) &= ~_BV(bit))
#endif
#ifndef sbi
#define sbi(sfr, bit) (_SFR_BYTE(sfr) |= _BV(bit))
#endif

void serialEvent()
{
  //entnommen aus Bsp-Sketch SerialEvent.ino  http://www.arduino.cc/en/Tutorial/SerialEvent

    while(Serial.available())
 {
    char inChar = (char)Serial.read();
    inputString +=inChar;
    if (inChar == 'S')
    {
      
      Stream = !Stream;
      inputString="";     
    }

  }
}



void setup()
{
	//analogReference(EXTERNAL);
	Serial.begin(9600);
	#if FASTADC
	// set prescale to 16
	sbi(ADCSRA,ADPS2);
	cbi(ADCSRA,ADPS1);
	cbi(ADCSRA,ADPS0);
	#endif
	inputString.reserve(200);
        
}

void loop()
{
  //Stream= true;
  while(Stream){
	currTime1 = micros();
	readx1 = analogRead(x1);
	ready1 = analogRead(y1);
	readz1 = analogRead(z1);
//	readx2 = analogRead(x2);
//	ready2 = analogRead(y2);
//	readz2 = analogRead(z2);
	currTime2 = micros();
	meassureTime = currTime2 - currTime1;
//	deltaTime = currTime2 - lastTime;
//	lastTime = currTime2;
	Serial.print(readx1);
	Serial.print(",");
	Serial.print(ready1);
	Serial.print(",");
	Serial.print(readz1);
	Serial.print(",");
//	Serial.print(readx2);
//	Serial.print(",");
//	Serial.print(ready2);
//	Serial.print(",");
//	Serial.print(readz2);
//	Serial.print(",");
	Serial.print(meassureTime);
	Serial.print(",");
	Serial.println(micros());
	Serial.println("x");
        //Stream=!Stream;
  }
}

#include <JsonGenerator.h>
#include <JsonParser.h>

using namespace ArduinoJson::Generator;



//
#define FASTADC 1
// defines for setting and clearing register bits
#ifndef cbi
#define cbi(sfr, bit) (_SFR_BYTE(sfr) &= ~_BV(bit))
#endif
#ifndef sbi
#define sbi(sfr, bit) (_SFR_BYTE(sfr) |= _BV(bit))
#endif

int readA0;
int readA1;
int readA2;
int readA3;
int readA4;
int readA5;

int readAnalog;

String msg = "";

unsigned long lastTime = 0;
long currTime= 0;
long Power =0;
unsigned long currTime1 = 0;
unsigned long currTime2 = 0;
unsigned long meassureTime = 0;

int buad = 9600;




void setup()
{
	#if FASTADC
	// set prescale to 16
	sbi(ADCSRA,ADPS2);
	cbi(ADCSRA,ADPS1);
	cbi(ADCSRA,ADPS0);
	#endif


	Serial.begin(buad);
        Serial.println("Ready");

}

void loop()
{

	
	if(Serial.available()>0)
	{
		msg="";
		while(Serial.available()>0)
		{
			msg+=char(Serial.read());
			delay(10);
		}
//                Serial.print("msg1: ");
//		Serial.println(msg);
	}

	//int number = msg.substring(1);
	msg = msg.substring(0,2);
        
        
	if (msg.equals("A0"))
	{
		currTime1 = micros();
		readAnalog=analogRead(A0);
		currTime2 = micros();
		Serial.print("A0: ");
		Serial.print(readAnalog,DEC);
		Serial.print(", ");
		Serial.print(currTime2-currTime1);
		Serial.print(", ");
		Serial.println(micros());
	}
	else if (msg.equals("A1"))
	{
		currTime1 = micros();
		readAnalog=analogRead(A1);
		currTime2 = micros();
		Serial.print("A1: ");
		Serial.print(readAnalog,DEC);
		Serial.print(", ");
		Serial.print(currTime2-currTime1);
		Serial.print(", ");
		Serial.println(micros());
	}
	else if (msg.equals("A2"))
	{
		currTime1 = micros();
		readAnalog=analogRead(A2);
		currTime2 = micros();
		Serial.print("A2: ");
		Serial.print(readAnalog,DEC);
		Serial.print(", ");
		Serial.print(currTime2-currTime1);
		Serial.print(", ");
		Serial.println(micros());
	}
	else if (msg.equals("A3"))
	{
		currTime1 = micros();
		readAnalog=analogRead(A3);
		currTime2 = micros();
		Serial.print("A3: ");
		Serial.print(readAnalog,DEC);
		Serial.print(", ");
		Serial.print(currTime2-currTime1);
		Serial.print(", ");
		Serial.println(micros());
	}

	else if (msg.equals("A4"))
	{
		currTime1 = micros();
		readAnalog=analogRead(A4);
		currTime2 = micros();
		Serial.print("A4: ");
		Serial.print(readAnalog,DEC);
		Serial.print(", ");
		Serial.print(currTime2-currTime1);
		Serial.print(", ");
		Serial.println(micros());
	}

	else if (msg.equals("A5"))
	{
		currTime1 = micros();
		readAnalog=analogRead(A5);
		currTime2 = micros();
		Serial.print("A5: ");
		Serial.print(readAnalog,DEC);
		Serial.print(", ");
		Serial.print(currTime2-currTime1);
		Serial.print(", ");
		Serial.println(micros());
	}

	else if (msg.equals("AA"))
	{
		//currTime1 = micros();
		readA0=analogRead(A0);
		readA1=analogRead(A1);
		readA2=analogRead(A2);
                Power =long(readA0)*long(readA1);
		//readA3=analogRead(A3);
		//readA4=analogRead(A4);
		//readA5=analogRead(A5);
		currTime2 = micros();
		//Serial.print("A0 - A5, Measurement Time, Time since Start: ");
		//Serial.print(readA0,DEC);
		//Serial.print(",");
		//Serial.print(readA1,DEC);
		//Serial.print(",");
		//Serial.print(readA2,DEC);
		//Serial.print(",");
		//Serial.print(readA3,DEC);
		//Serial.print(",");
		//Serial.print(readA4,DEC);
		//Serial.print(",");
		//Serial.print(readA5,DEC);
		//Serial.print(", ");
		//Serial.print(currTime2-currTime1);
		//Serial.print(", ");
		//Serial.println(micros());
		//JsonArray<1> time;
		//time.add<0> (micros());
		
		
		currTime = long(currTime2);
		JsonObject<5> dataItem;
		dataItem["voltage"] = readA0;
		dataItem["current"] = readA1;
		dataItem["rpm"] = readA2;
		dataItem["power"] = Power;
		dataItem["timestamp"] = currTime;
		dataItem.prettyPrintTo(Serial);
		
		Serial.println();

		
	}
	else if (msg.equals("S"))
	{
		msg="";
	}
	else
	{
		msg="";
	}

}







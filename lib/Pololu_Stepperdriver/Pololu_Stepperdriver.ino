const int	STEP	=	9;
const int	DIR		=	8;
const int	En		=	13;

const int	M0		=	5;
const int	M1		=	6;
const int	M2		=	7;

unsigned long Msteps=1;
String inputString="";
long Number;
long baud = 115200;

void setMicrostep(int mStep){
	switch (mStep)
	{
		case 1:
		digitalWrite(M0, LOW);	//Full Step
		digitalWrite(M1, LOW);
		digitalWrite(M2, LOW);
		break;
		
		case 2:
		digitalWrite(M0, HIGH);	//Half Step
		digitalWrite(M1, LOW);
		digitalWrite(M2, LOW);
		break;
		
		case 4:
		digitalWrite(M0, LOW);	//1/4 Step
		digitalWrite(M1, HIGH);
		digitalWrite(M2, LOW);
		break;
		
		case 8:
		digitalWrite(M0, HIGH);	//1/8 Step
		digitalWrite(M1, HIGH);
		digitalWrite(M2, LOW);
		break;
		
		case 16:
		digitalWrite(M0, LOW);	//1/16 Step
		digitalWrite(M1, LOW);
		digitalWrite(M2, HIGH);
		break;
		
		case 32:
		digitalWrite(M0, HIGH);	//1/32 Step
		digitalWrite(M1, HIGH);
		digitalWrite(M2, HIGH);
		break;
		default:
		digitalWrite(M0, HIGH);	//1/32 Step
		digitalWrite(M1, HIGH);
		digitalWrite(M2, HIGH);
		
	}
}
void Enable(bool activate){
	if (activate)
	{
		digitalWrite(En,LOW); //pin is active Low
		delay(1);
	}
	else
	{
		digitalWrite(En,HIGH);
		delay(1);
	}
}

boolean setStep(unsigned long Steps, boolean direction){
	Steps=Steps+1;
	Enable(true);

	if (direction)
	{
		digitalWrite(DIR,HIGH);
		delay(1);
	}
	else{
		digitalWrite(DIR,LOW);
		delay(1);
	}
	do{
		digitalWrite(STEP,HIGH);
		delayMicroseconds(400);
		digitalWrite(STEP,LOW);
		delayMicroseconds(200);
		//Serial.println(Steps);
		Steps--;
	}while(Steps);

	Enable(false);
	return true;
}

void backward(unsigned long TotalSteps)
{
	Serial.print("Backward Steps: ");
	Serial.println(TotalSteps);
	setStep(TotalSteps, true);
	
}

void forward(unsigned long TotalSteps)
{
	Serial.print("Backward Steps: ");
	Serial.println(TotalSteps);
	setStep(TotalSteps, false);
	
}

void testfunktion1(long steps)
{
	//Msteps=1;
	Serial.println(Msteps);
	setMicrostep(Msteps);
	setStep(8000*Msteps,true);	//one round 200 full steps
	//delay(500);
	setStep(8000*Msteps,false);
}


void setup()
{
	pinMode(M0,OUTPUT);
	pinMode(M1,OUTPUT);
	pinMode(M2,OUTPUT);
	pinMode(STEP,OUTPUT);
	pinMode(DIR,OUTPUT);
	pinMode(En,INPUT_PULLUP);
	Serial.begin(baud);
	Serial.println("Start Serial Communication for Steppermotor");
	setMicrostep(Msteps);
	//setStep(12000,false);
}

void loop()
{
	if(Serial.available()>0)
	{
		inputString="";
		while(Serial.available()>0)
		{
			inputString+=char(Serial.read());
			delay(10);
		}
		//Serial.println(inputString);
	}

	
	inputString.toUpperCase();
	Number = inputString.substring(1).toInt();
	
	//Serial.println(inputString);
	//Serial.println(".");
	
	switch (inputString[0])
	{
		case 'F':
		Serial.print("Forward: ");
		Serial.println(Number);

		forward(Number*Msteps);
		Serial.println(".");
		break;
		case 'B':
		Serial.print("Backward: ");
		Serial.println(Number);
		
		backward(Number*Msteps);
		Serial.println(".");
		break;
		case 'T':
		Serial.println("Testfunktion");
		for (int i=0;i<=Number;i++)
		{
			
			Serial.println(i);
			testfunktion1(5000);

		}
		Serial.println(".");
		break;
		//default:
		//Serial.print("Error. Your Input was: ");
		//Serial.println(inputString);
		case 'M':
			Msteps = Number;
			Serial.println(".");
	}

	inputString="";
	
}

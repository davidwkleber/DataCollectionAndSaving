
// Leds
int yellow = 2;
int red = 4;
int green = 5;

int blinkRate[10]= {900,800,700,600,500,400,300,200,100,50};

boolean RedOn = true;
boolean GreenOn = false;
boolean YellowOn = false;

//int delayRed = 0;
//int delayGreen = 0;
//int delayYellow = 0;

int blinkDelay = blinkRate[6];




//for Serial Commmunication
String inputString = "";         // a string to hold incoming data
boolean stringComplete = false;  // whether the string is complete
long Number;


void allOff(){
  digitalWrite(red, LOW);
  digitalWrite(green, LOW);
  digitalWrite(yellow, LOW);
}

/*
  SerialEvent occurs whenever a new data comes in the
 hardware serial RX.  This routine is run between each
 time loop() runs, so using delay inside loop can delay
 response.  Multiple bytes of data may be available.
 */
void serialEvent() {
  //Serial.println("in EvenT");
  while (Serial.available()) {
    // get the new byte:
    char inChar = (char)Serial.read(); 
    // add it to the inputString:
    inputString += inChar;
    // if the incoming character is a newline, set a flag
    // so the main loop can do something about it:
    if (inChar == 'x') {
      stringComplete = true;
    } 
  }
}



void setup() {
  // initialize serial:
  Serial.begin(9600);
  // reserve 200 bytes for the inputString:
  inputString.reserve(200);
  pinMode(red, OUTPUT);     
  pinMode(green, OUTPUT);
  pinMode(yellow, OUTPUT);
//    Serial.println("Ready");
//  Serial.println(blinkDelay);
  
}

void loop() {
  // print the string when a newline arrives:
  if(stringComplete){
    inputString.toUpperCase();
    Number = inputString.substring(1).toInt();
    

    switch(inputString[0])
    {
    case 'R':
      if(Number>0 && Number<=10)
      {
        // Serial.print ("R ");
        // Serial.println(blinkRate[Number-1]);
        RedOn=true;
        blinkDelay = blinkRate[Number-1];
        Serial.println(".");
      }
      else if(Number==0)
      {
        RedOn=false;
        blinkDelay = blinkRate[8];
        // Serial.print ("R ");
        // Serial.println(Number);
        Serial.println(".");
      }
      else
      {
        Serial.println("?");
      }
      break;
     case 'G':
      if(Number>0 && Number<=10)
      {
        // Serial.print ("G ");
        // Serial.println(blinkRate[Number-1]);
        GreenOn=true;
        blinkDelay = blinkRate[Number-1];
        Serial.println(".");
      }
      else if(Number==0)
      {
        GreenOn=false;
        blinkDelay = blinkRate[8];
        // Serial.print ("G ");
        // Serial.println(Number);
        Serial.println(".");
      }
      else
      {
        Serial.println("?");
      }
      break;
     case 'Y':
      if(Number>0 && Number<=10)
       {
        // Serial.print ("Y ");
        // Serial.println(blinkRate[Number-1]);
        YellowOn=true;
        blinkDelay = blinkRate[Number-1];
        Serial.println(".");
      }
      else if(Number==0)
      {
        YellowOn=false;
        blinkDelay = blinkRate[8];
        // Serial.print ("Y ");
        // Serial.println(Number);
        Serial.println(".");
      }
      else
      {
        Serial.println("?");
      }
      break;     
      
      
      
      
//    case 'G':
//      Serial.print ("G ");
//      Serial.println(Number);
//      Serial.println(".");
//      break;
//    case 'Y':
//      Serial.print ("Y ");
//      Serial.println(Number);
//      Serial.println(".");
//      break;
//    default:
//      Serial.println("?");
  }

    // clear the string:
    inputString = "";
    stringComplete = false;
  
  }
if (RedOn)
  {  
    digitalWrite(red, HIGH);
  }
  else{
    digitalWrite(red, LOW);
  }
if (GreenOn)
  {  
    digitalWrite(green, HIGH);
  }
  else{
    digitalWrite(green, LOW);
  }
if (YellowOn)
  {  
    digitalWrite(yellow, HIGH);
  }
  else{
    digitalWrite(yellow, LOW);
  }


  delay(blinkDelay);               // wait 
  //digitalWrite(red, LOW);
  allOff();    // turn the LEDs off
  delay(blinkDelay); 
}





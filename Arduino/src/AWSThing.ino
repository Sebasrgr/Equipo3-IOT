#include <ESP8266WiFi.h>
#include <AmazonIOTClient.h>
#include "ESP8266AWSImplementations.h"
#include <ESP8266HTTPClient.h>
#include<stdio.h>
#include<stdlib.h>

#include <DHT.h>
#include <DallasTemperature.h>

// DHT Definitions
#define DHTPIN 4
#define DHTTYPE DHT11

// Digital pin connected to the DS18B20
const int sensor_temp_DS18B20 = 0;

// Creation of OneWire Object
OneWire oneWire(sensor_temp_DS18B20);
DallasTemperature sensorDS18B20(&oneWire);

// Value to store conductivity readings
int conductivityValue = 0;

// DHT Sensor Initialization
DHT dht(DHTPIN, DHTTYPE);

char *ssid = "Weird Fishes";
char *password = "zz5TWiH0LT";

void reverse(char* str, int len) 
{ 
    int i = 0, j = len - 1, temp; 
    while (i < j) { 
        temp = str[i]; 
        str[i] = str[j]; 
        str[j] = temp; 
        i++; 
        j--; 
    } 
}

int intToStr(int x, char str[], int d) 
{ 
    int i = 0; 
    while (x) { 
        str[i++] = (x % 10) + '0'; 
        x = x / 10; 
    } 
  
    // If number of digits required is more, then 
    // add 0s at the beginning 
    while (i < d) 
        str[i++] = '0'; 
  
    reverse(str, i); 
    str[i] = '\0'; 
    return i; 
}

// Converts a floating-point/double number to a string. 
void ftoa(float n, char* res, int afterpoint) 
{ 
    // Extract integer part 
    int ipart = (int)n; 
  
    // Extract floating part 
    float fpart = n - (float)ipart; 
  
    // convert integer part to string 
    int i = intToStr(ipart, res, 0); 
  
    // check for display option after point 
    if (afterpoint != 0) { 
        res[i] = '.'; // add dot 
  
        // Get the value of fraction part upto given no. 
        // of points after dot. The third parameter  
        // is needed to handle cases like 233.007 
        fpart = fpart * pow(10, afterpoint); 
  
        intToStr((int)fpart, res + i + 1, afterpoint); 
    } 
} 

void setup() {
  Serial.begin(9600);
  delay(10);

  // Connect to WAP
  Serial.print("Connecting to ");
  Serial.println(ssid);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("");
  Serial.println("WiFi connected");
  Serial.println("IP address: ");
  Serial.println(WiFi.localIP());

  dht.begin();
  sensorDS18B20.begin();
}

void loop() {

  // Reading temperature or humidity takes about 250 milliseconds!
  float h = dht.readHumidity();

  // Leemos y mostramos los datos del sensor DS18B20 por dirección única
  sensorDS18B20.requestTemperatures();
  Serial.print("Temperatura Sensor DS18B20: ");
  Serial.print(sensorDS18B20.getTempCByIndex(0));
  Serial.println(" C");

  int temperature = (int) sensorDS18B20.getTempCByIndex(0);

  Serial.print("Humedad Ambiental Sensor DHT: ");
  Serial.println(h);

  //String humidity;
  //ftoa(h,humidity,2);

  conductivityValue = analogRead(0);

  Serial.print("Conductividad / Humedad relativa del suelo: ");

  int condToPrint = 1023 - conductivityValue;
  Serial.println(condToPrint);

  Serial.print("LUX: 50");

  Serial.println("");
  Serial.println("--------------------------------------------------------------");
  Serial.println("");

  //delay(2000);
  
  if (WiFi.status() == WL_CONNECTED) { //Check WiFi connection status

    HTTPClient http;    //Declare object of class HTTPClient

    http.begin("https://h5d6r9s3l8.execute-api.us-east-1.amazonaws.com/beta/measurement","06 AD 53 0C 06 2B 27 F4 99 ED 5E 05 ED 7A 5D A1 F6 1C 52 13");      //Specify request destination
    http.addHeader("Content-Type", "application/json");  //Specify content-type header
    http.addHeader("auth-key", "NQuTdZlPqd7JeIg8NjqqT6CnxsjLt1QE3P0vBFGL");

    String startMessage = "{\"device\": \"nodemcu\", \"payload\": {\"conductivity\":";
    String humStr = ",\"humidity\":";
    String LUXStr = ",\"LUX\":50,";
    String tmpStr = "\"temperature\":";

    String endMessage = "}}";

    int httpCode = http.POST(startMessage + condToPrint + humStr + h + LUXStr + tmpStr + sensorDS18B20.getTempCByIndex(0) + endMessage);   //Send the request
    String payload = http.getString();                  //Get the response payload

    Serial.println(httpCode);   //Print HTTP return code
    Serial.println(payload);    //Print request response payload


    http.end();  //Close connection 

    

  } else {

    Serial.println("Error in WiFi connection");

  }
  // Serial.print(result);

  delay(3600000*4);


}

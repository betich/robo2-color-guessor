const int LED_BUILTIN = 2;

void setup() {
  // put your setup code here, to run once:
  Serial.begin(115200);
  Serial.println("Hi");
  pinMode(LED_BUILTIN, OUTPUT);
}

void loop() {
  // put your main code here, to run repeatedly:
  Serial.println("Update");
  digitalWrite(LED_BUILTIN, HIGH);
  delay(200);
  digitalWrite(LED_BUILTIN, LOW);
  delay(200);
}

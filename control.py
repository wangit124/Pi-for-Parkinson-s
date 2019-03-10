#!/usr/bin/env python3

print("Importing modules (please be patient)...")
# import necessary python modules
# import pyrebase

#from firebase import firebase
import requests
import smbus
import time
import math
from time import sleep
import pigpio

# Define firebase variables
config = {
	"apiKey": "AIzaSyD9XuaSinw3xkdU-cR9u1lcv7WE8RkSDkM",
	"authDomain": "pipe-a7b56.firebaseapp.com",
	"databaseURL": "https://pipe-a7b56.firebaseio.com",
	"storageBucket": "pipe-a7b56.appspot.com"
}
print("Connecting to firebase..")

#firebase = firebase.FirebaseApplication('https://pipe-a7b56.firebaseio.com') 
#firebase = pyrebase.initialize_app(config)
#db = firebase.database()

# Define IMU global variables
PWR_MGMT_1 = 0x6B
SMPLRT_DIV = 0x19
CONFIG = 0x1A
GYRO_CONFIG = 0x1B
INT_ENABLE = 0x38
ACCEL_XOUT_H = 0x3B
ACCEL_YOUT_H = 0x3D
ACCEL_ZOUT_H = 0x3F
GYRO_XOUT_H = 0x43
GYRO_YOUT_H = 0x45
GYRO_ZOUT_H = 0x47

# Create pigpio API reference
pi = pigpio.pi()

# Name servos
servo1 = 17
servo2 = 23

PROG_TIME = 0
key = 0
value = 0
value2 = 0

# Initialize IMU values and database values
def init():
	print("Initializing program...")
	bus.write_byte_data(Device_Address, SMPLRT_DIV, 7)
	bus.write_byte_data(Device_Address, PWR_MGMT_1, 1)
	bus.write_byte_data(Device_Address, CONFIG, 0)
	bus.write_byte_data(Device_Address, GYRO_CONFIG, 24)
	bus.write_byte_data(Device_Address, INT_ENABLE, 1)

    # Read firebase values and initialize
#	numSessions = db.child("numSessions").get()
#	numSessions = numSessions.val() + 1

	# print current session
#	print("Current Session = " + str(numSessions))

#	jsonNS = {"numSessions":numSessions}
#	db.update(jsonNS)

	print("Set program time to 0")
	jsonCurr = {"current":PROG_TIME}
#	db.update(jsonCurr)

# Store global json data
def storeJSON():

	# Increment program timer
	print(" ")
	print("Program time (s) = " + str(PROG_TIME))
	jsonCurr2 = {"current":PROG_TIME}
	db.update(jsonCurr2)
	print("Storing data plot: " + str(key))

	# Increment duration by PROGRAM TIME
	duration = db.child("total").get()
	duration = duration.val() + 1
	print("Total Duration of program: " + str(duration))
	jsonTotal = {"total":duration}
	db.update(jsonTotal)

# Store stability factor
def storeStat(var1, var2, var3):

    # Post stability factor to firebase
	var1 = (1 - ((var1 + 60) / 120))
	var2 = (1 - ((var2 + 60) / 120))

	stabilityF = var1 + var2
	print("Stability Factor: " + str(stabilityF))
	data = str(stabilityF)
	label = str(PROG_TIME)

	jsonPlot = {"label":label, "value":data}

	index = str(var3)

	db.child("data").child(index).set(jsonPlot)

# Store device address
bus = smbus.SMBus(1)
Device_Address = 0x68

# Initialize all global variables
init()
initial = 0
prevVal = 0
prevTemp = 0

while True:

	key += 1
	key %= 12

	PROG_TIME = PROG_TIME + 1

	#storeJSON()

	# Remove first child of data
	#db.child("data").limit_to_first(1).remove()

	# Read in IMU readings for both servos
	value = bus.read_byte_data(Device_Address, ACCEL_XOUT_H)
	value2 = bus.read_byte_data(Device_Address, ACCEL_YOUT_H)

    # Convert to int for more stable values
	value = math.floor(value)
	value2 = math.floor(value2)

    # Set ranges to [-60, 60]
	if 189 <= value <= 256:
		value = value - 255

	if 189 <= value2 <= 256:
		value2 = value2 - 255

	if prevVal - 2 < value < prevVal + 2:
		value = prevVal

	# Set prevVal
	prevVal = value

    # Round to nearest 5 to increase stability
	value2 = value2 - (value2%5)

    # Convert value to servo pulse width
	if -60 <= value <= 60:
		temp = value + 60
		temp = temp / -120 * 1300 + 2200
		temp = math.floor(temp)
		if prevTemp - 10 < temp < prevTemp + 10:
			temp = prevTemp
		prevTemp = temp
		print("Servo1 Position: " + str(temp))
		pi.set_servo_pulsewidth(servo1, temp)

    # Use servo two to calibrate utensil direction
	while -60 <= value2 <= -50:
		value2 = bus.read_byte_data(Device_Address, ACCEL_YOUT_H)
		initial += 100
		initial %= 2500
		if 500<=initial<=2500:
			print("Servo2 Position: " + str(initial))
			pi.set_servo_pulsewidth(servo2, initial)
		sleep(0.1)

   # storeStat(value, value2, key)
    # delay read
	sleep(0.12)

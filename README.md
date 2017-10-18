SomfyProxy

This is a project for controlling your Somfy blinds with a Tellstick .NET.

You are going to need:
- Raspberry Pi with node.js
- Arduino with a 433Mhz reciever module

There is a more detailed information about the circuitry in the fritzing file.

Cable to Somfy remote

1(redish color): 3,3V
2:GND
3:Stop
4:Up
5:Down
6:Select
7: CH1
8: CH2
9: CH3
10:CH4

Pins on Raspberry Pi:

function	PhysicalPIN	wPi
up		18		1
down		24		5
stop		14		15
select ch	23		4

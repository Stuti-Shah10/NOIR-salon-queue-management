Project Reflection

while developing my ‘NOIR Salon’ queue management system I discovered an issue with the ‘Number of Clients Served Today’ feature on the Owner Dashboard. 
Even after completing customers and refreshing the page, it was still showing a figure of 18. while at first I thought there may be an issue with this feature, it was soon established that the problem stemmed from test data and the data migration method.
 The system included test data for completed clients and these were erroneously being recognised as real clients.

I was able to investigate this by carrying out tests around the queue functionality and observing whether the number of clients served was being updated accurately. 
I also queried the test data, data storage and migration along with the number of clients served feature using a coding agent. 
Following analysis of the issue I requested that the agent delete the test data for completed clients. 
In addition, I required the agent to amend the data migration so that real data was maintained and to ensure that false data was not re-introduced when the queue was reset.
These improvements were then tested by completing clients and refreshing the system.

Furthermore, I learnt about the restricted functionality of the localStorage mechanism.
As browsers and devices store information individually, my laptop and phone do not automatically synchronise queue data.
Consequently, I recognised the need for a centralised server and database to effectively provide a salon with a queue management system.

In summary, although designing an application is integral to the development process, so too are testing, troubleshooting, analysing data storage and communicating effectively with an AI coding agent.

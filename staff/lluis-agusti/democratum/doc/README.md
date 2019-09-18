# DEMOCRATUM
A project by:

**Lluís Agustí Sanés @ Skylab Coders Academy**


**Trello Link**
https://trello.com/invite/b/ttVfxbI3/adb73360223318d66c2a73b8c28e28db/democratum



![](https://media.giphy.com/media/l0NgSlYECv58uTfbO/source.gif)

## **Introduction**
Democratum is a MERN application that allows an afordable and scalable direct democracy voting system for municipalities to improve local governance quality and transparency.


## Functional description

Citizens can:

* View open polls.
* Vote on open polls.
* View past polls.
* Propose a new poll (city hall will evaluate and publish the poll).
* Edit and update their profile. Email and ID are not be updated.

* Result of participated polls once polls are finished. ---> (count++)
* Individual poll opinions are not saved. Logic check if the user has already participated on the poll. Then allows to vote, counts++ the vote and pushes the poll ID to the user account.


City Halls can:

* Log In.
* Create polls.
* Edit, approve or reject polls proposed by citizens.
* Retrieve citizen's info: name, address, ID, email and participated polls.


Super Admin (me):

* Create City Halls.
* List of City Halls.
* Retrieve City Hall info: city name, address, documentation files and email.


City Halls or their representatives should contact Democratum and, after check the documentation that accredits them as a public authority they will recieve an email letting them know that they have been signed up.



## **Functional Description**


### Use cases
![](images/user-cases.png)
![](images/admin-cases.png)


### Flows
![](images/admin-flowchart.png)
![](images/user-flowchart.png)


## **Technical Description**

### Blocks
![](images/tech-blocks.png)


### Components
Non


### Code Coverage
Non
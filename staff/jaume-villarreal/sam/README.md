# SAM (Summer Activity Manager)
![summer img](https://blogs.haverford.edu/ccpa/files/2019/04/04-summer-hacks-flip-flops-1080x675.jpg "logo")

## [Demo: sam-app.surge.sh](http://sam-app.surge.sh/#/) 

## Planification 
You can follow project planification in this [trello board](https://trello.com/b/ZPLJAILD/personal)
## Abstract
**SAM** *(Summer Activity Manager)* is a tech solution for data management related to the administration of school summer activities. This kind of activities have exponetially grown for last year and in many cases data has been treated in a low professsional profile way. The purpose of this project is to stablish a consistent database model and a more optimized recovery mechanism of data.



## Functional description
Tutors can:
* register themselves as tutors
* register students (linked to his/her profile)
* update registered students
* register an enrollment (linked to a student and to the current year)
* check enrollment info (linked to a single student)

### Flow
![Functional description - flow diagram](sam-doc/assets/functional/flow.png)
### User cases
![Functional description - user cases](sam-doc/assets/functional/user-cases.png)

## Technical description
### Blocks
![Technical description - blocks](sam-doc/assets/technical/blocks.png)
### Components
![Technical description - comoponents](sam-doc/assets/technical/components.png)
### React components
![Technical description - React comoponents](sam-doc/assets/technical/react-components.png)

## Data model
### ER model
![Data model - ER model](sam-doc/assets/data-model/model-ER.png)
### Data schemas
![Data model - mongo schemas](sam-doc/assets/data-model/data-schemas.png)

## Technologies
Javascript, ReactJS, Node.js, Express, MongoDB & Mongoose.

## TODO
* React testing (50% complete)
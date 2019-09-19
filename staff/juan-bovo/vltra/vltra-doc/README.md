# Vltra

## Introduction

Vltra is an online short-stories magazine which aims to encourage writers to write and share their stories. It focuses on short stories, so each post can't be longer than 2000 chars.

Anyone is able to read stories on Vltra, but only registered users can post, vote and bookmark posts.

Stories are sorted from new to old by default, so users can see the newest stories every time they enter Vltra. Besides, there's a easy-access ranking with stories sorted by average ranking.

![A short story](https://media.giphy.com/media/6PH7zMHkS7lu0/giphy.gif)

## Planning
You can see Vltra's project status here:
[Vltra's Trello board](https://trello.com/b/EJmGr6bH/vltra-juampi)

## Functional description
Unregistered users can:
- Read stories sorted by date (fresh first).
- Read stories by average rank.

Registered users can:
- Read stories.
- Upload stories.
- Bookmark favorite stories.
- Vote to update stories ranking.

At this point, Vltra help writers to easily share their short stories. Further development aims to improve Vltra's social features (i.e.: comment on posts, follow other users and get notifications on their activities).


### Use cases
![User cases](images/vltra-user-cases.png)
### Flow chart
![Flowchart](images/vltra-flowchart.png)



## Technical description
### Blocks
![Blocks](images/blocks.png)

### Components
![Components](images/components.png)
    
### Data model
![Data model](images/vltra-data-model.png)


### Code Coverage
#### api
![Code coverage api](images/code-coverage-api.png)

#### app
![Code coverage app](images/code-coverage-app.png)
Explanation: Jest has been experiencing some issues to show full test coverage.

### Technologies
Javascript, ReactJS, Node.js, Express, MongoDB & Mongoose.
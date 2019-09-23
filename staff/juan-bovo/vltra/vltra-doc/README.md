# Vltra

A project by:
- **Juan Pablo Bovo**

Developed at:
- **Skylab Coders Academy**

## Introduction

*Vltra* is an online short-stories magazine which aims to encourage writers to write and share their stories. It focuses on short stories, so each post can't be longer than 2000 chars.

Anyone is able to read stories on *Vltra*, but only registered users can post, vote and bookmark posts.

Stories are sorted from new to old by default, so users can see the newest stories every time they enter *Vltra*. Besides, there's a easy-access ranking with stories sorted by average ranking.

![A short story](https://media.giphy.com/media/6PH7zMHkS7lu0/giphy.gif)

## Planning
You can see *Vltra*'s project status here:
[Vltra's Trello board](https://trello.com/b/EJmGr6bH/vltra)

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
![Code coverage](images/code-coverage.png)

### Technologies
Javascript, ReactJS, Node.js, Express, MongoDB & Mongoose.

### To-do:
Due some schedule issues, some *Vltra*'s initial features wasn't fully implemented on app side:
- Comments (post & delete).
- Posts deletion.
- User deletion.
- User profile editing.

Besides, some new features are scheduled for future releases:
- Follow users.
- Notifications.
- Search posts.
- Add tags on posts.
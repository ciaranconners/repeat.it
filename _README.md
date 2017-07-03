# Repeat.io

Repeat.io is a web app that allows users to create and study flashcards online. After signing into Repeat.io, users can create flashcard decks, edit existing decks, study their decks in random order and delete any decks they no longer need. A unique feature of Repeat.io is the ability to format flashcards in markdown text, allowing them to create flashcards for studying code snippets.

## Team

  - __Product Owner__: James Quillin
  - __Scrum Master__: Sheena Ramirez
  - __Development Team Members__: Patrick Tang, Junji Otsuka, Ciarán Conners

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)
    1. [Installing Dependencies](#installing-dependencies)
    2. [Tasks](#tasks)
4. [Team](#team)
5. [Contributing](#contributing)

## Usage

Log-in/Sign-in

On your first visit to Repeat.io, create a user name and password and you'll automatically be logged into the site. You'll need to be signed into Repeat.io any time that you would like to review or change decks that you've created.

Home page

Click the "Create a new deck" button or the deck creation link at the top of the page to start making flashcards. Any decks that you create will later be listed on the home page, where you can also choose to study, edit or delete existing decks. When you're finished studying, click "Log out" in the top right corner of the screen to end your session.

Create/edit deck pages

Type the front and back content of each card in the designated text areas and create a card by hitting enter or the "Add card" button. Cards can be deleted and rearranged within the decks. To use markdown text on a card, use your cursor to highlight text on the card that you've already created and click the button on the top right corner of that corner to add markdown styling. Click "Click to save the deck" at the bottom of the page when you're done with your changes.

Study deck page

Click on the card to view the answer to the current question. Use the navigation buttons below the flashcard to choose whether to view the next card or a previous card. When you're done studying, click "Save and quit" to return to the home page.

## Requirements

- AngularJS 1.6.4,
- Angular-route 1.6.4,
- bcrypt ^1.0.2,
- body-parser ^1.17.2,
- express ^4.15.3,
- mongoose ^4.10.8,
- nodemon ^1.11.0

## Development

### Installing Dependencies

From within the root directory:

```
npm install

```
### Tasks

In order to open the Node server and the MongoDB server, from within the root directory:

```
nodemon server.js

```

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for contribution guidelines.

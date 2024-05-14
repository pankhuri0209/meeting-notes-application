[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/UCQYxFhy)

# Read me

Meeting Notes Application

## About the Project: Meeting Notes Application

Backend for a simple meeting notes application. Each note conatins a title, content, a list of action items and creation date.

![Logo](https://www.takenotesguide.com/wp-content/uploads/2019/01/Meeting-Notes.jpg?ezimgfmt=ngcb2/notWebP)

## API Reference

#### Get List of all the meeting notes

```http
  GET http://localhost:3001/notes
```

#### Add a note in the meeting notes list collection

```http
  POST http://localhost:3001/notes
```

#### Retrieve a note in the meeting notes list based on the keywords and date range

```http
  GET http://localhost:3001/notes/filter?keywords=Analyze&startDate=03/25/2022&endDate=03/30/2022
```

#### Update note based on note object id

```http
  PUT http://localhost:3001/notes/6603153f9c395ae890a6fe95
```

#### Delete note based on note object id

```http
  DELETE http://localhost:3001/notes/6603153f9c395ae890a6fe95
```

## Authors

- [@pankhuri-neu](https://github.com/pankhuri-neu)

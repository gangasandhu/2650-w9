import "dotenv/config.js";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.js";
import notesRouter from "./routes/notes.js";
import { notes, addNote, removeNote, editNote } from './persistence.js';
import { v4 as uuidv4 } from 'uuid';
// Constants
const port = process.env.PORT || 3000;

const typeDefs = `#graphql
    type Note {
        id: String
        text: String
    }

    type Query {
        notes: [Note]
    }

    type Mutation {
        addNote(text: String!): Note
        removeNote(id: String!): String
        editNote(id: String!, text: String!): Note
    }
`
const resolvers = {
  Query: {
    notes: () => notes(),
  },
  Mutation: {
    addNote: (_, { text }) => {
      const note = { id: Date.now().toString(), text };
      notes.push(note);
      return note;
    },
    removeNote: (_, { id }) => {
      const index = notes.findIndex(note => note.id === id);
      if (index > -1) {
        notes.splice(index, 1);
      }
      return id;
    },
    editNote: (_, { id, text }) => {
      const note = notes.find(note => note.id === id);
      note.text = text;
      return note;
    }
  }
};

// Create http server
const app = express();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});


await server.start();

app.use(
  "/graphql",
  cors(),
  express.json(),
  // expressMiddleware accepts the same arguments:
  // an Apollo Server instance and optional configuration options
  expressMiddleware(server, {})
);


app.use("/notes", notesRouter);



// Start http server
app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

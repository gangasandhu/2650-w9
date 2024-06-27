import express from "express";
import { addNote, notes, removeNote, editNote } from "../persistence.js";
import { v4 as uuidv4 } from "uuid";

const notesRouter = express.Router();

// Post notes page
notesRouter.get("/", (req, res) => {
    if(notes)
        res.status(200).json(notes());
    else
        res.status(404).send("No notes available.");
})

notesRouter.post("/", (req, res, next) => {
    const noteText = req.body.noteText;
    console.log(noteText);
    const note = {
        id: uuidv4(),
        text: noteText,
    }
    addNote(note)
    res.redirect("/notes")
})

notesRouter.delete("/:id", (req, res, next) => {
    const id = req.params.id;

    removeNote(id);
    res.status(200).send('Note deleted Successfully')
})

notesRouter.put("/:id", (req, res, next) => {
    const id = req.params.id;
    const noteText = req.body.noteText;

    editNote(id, noteText);
    res.status(200).send('Note edited successfully')

})

export default notesRouter;
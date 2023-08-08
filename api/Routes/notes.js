const express = require('express');
const router = express.Router();
const NotesController = require('../controllers/notesController');
const checkAuth = require('../midlleware/auth');

router.get('/:userId' ,checkAuth, NotesController.get_all_notes)   //get all notes

router.post('/add' ,checkAuth, NotesController.create_notes)    //create

router.patch('/:noteId',checkAuth, NotesController.update_notes)   //update

router.delete('/:noteId',checkAuth, NotesController.delete_notes)    //delete

module.exports = router;
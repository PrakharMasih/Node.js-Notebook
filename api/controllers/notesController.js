const Note = require('../models/noteModel');

//Get all notes
exports.get_all_notes = async (req, res) => {
    const notes = await Note.find({ userId: req.params.userId });
    if(notes.length > 0){
        res.json(notes);
    }
    else{
        res.json({message:"No data present"})
    }
    
}

exports.create_notes = (req, res) => {
    const { title, content, category, userId } = req.body;

    if (!title || !content || !category || !userId) {
        return res.status(400).json({ message: "all fields are required!" })
    }

    const note = new Note({
        title: title,
        content: content,
        category: category,
        userId: userId
    })
    note.save().then(result => {
        res.status(201).json({ message: "Notes Created" });
    }).catch(err => {
        res.status(500).json(err);
    })
}

exports.update_notes = (req, res) => {
    Note.findByIdAndUpdate({_id: req.params.noteId} , {$set: req.body}).then(result => {
        res.status(200).json({message:"updated"})
    }).catch(err => res.json(err));
}

exports.delete_notes = (req, res) => {
    Note.findByIdAndRemove({_id: req.params.noteId}).then(result => {
        res.status(200).json({message:"deleted"})
    }).catch(err => res.json(err));
}

const { Thought, User } = require('../models');

const getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getThoughtById = async (req, res) => {
  try {
    const thought = await Thought.findOne({ _id: req.params.id });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const createThought = async (req, res) => {
  try {
    const thought = await Thought.create(req.body);
    const user = await User.findOneAndUpdate(
      { _id: req.body.userId },
      { $push: { thoughts: thought._id } },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'No user with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const updateThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $set: req.body },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteThought = async (req, res) => {
  try {
    const thought = await Thought.findOneAndDelete({ _id: req.params.id });
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json({ message: 'Thought successfully deleted!' });
  } catch (err) {
    console.error("Error details:", err); // Enhanced logging for debugging.
    res.status(500).json({ message: 'Internal server error', error: err.message });
  }
};

const addReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeReaction = async (req, res) => {
  try {
    const thought = await Thought.findOneAndUpdate(
      { _id: req.params.id },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { runValidators: true, new: true }
    );
    if (!thought) {
      return res.status(404).json({ message: 'No thought with this id!' });
    }
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};
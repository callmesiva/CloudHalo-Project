const taskmodel = require("../../models/taskModel");

exports.addTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { taskName, list, dueDate, priority, notes, marks } = req.body;

    const newData = new taskmodel({
      userId,
      taskName,
      list,
      dueDate,
      priority,
      notes,
      marks: false,
    });

    const savedData = await newData.save();
    res.status(200).json({ message: "success", data: savedData });
  } catch (error) {
    console.error("Error adding task data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const taskData = await taskmodel.find({ userId });
    res.status(201).json({ message: "success", data: taskData });
  } catch (error) {
    console.error("Error retrieving task data:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const userId = req.user.userId;
    const _id = req.params._id;
    const deleteTask = await taskmodel.findOneAndDelete({
      userId,
      _id,
    });
    if (!deleteTask) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting Task:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.updateMarkAsRead = async (req, res) => {
  try {
    const _id = req.params._id;
    const updatedMark = await taskmodel.findByIdAndUpdate(
      _id,
      { marks: true },
      { new: true }
    );
    if (!updatedMark) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Mark updated successfully" });
  } catch (error) {
    console.error("Error updating Task data:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.updateNotes = async (req, res) => {
  try {
    const _id = req.params._id;
    const { note } = req.body;

    const updatedNotes = await taskmodel.findByIdAndUpdate(_id, {
      $push: { notes: note },
    });
    if (!updatedNotes) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Notes updated successfully" });
  } catch (error) {
    console.error("Error updating Notes data:", error);
    res.status(500).send("Internal Server Error");
  }
};

exports.deleteNotes = async (req, res) => {
  try {
    const _id = req.params._id;
    const { note } = req.body;

    const deleteNote = await taskmodel.findByIdAndUpdate(
      _id,
      { $pull: { notes: note } },
      { new: true }
    );

    if (!deleteNote) {
      return res.status(404).json({ message: "Task not found" });
    }
    res
      .status(200)
      .json({ message: "Notes Deleted successfully", data: deleteNote });
  } catch (error) {
    console.error("Error Deleting Notes data:", error);
    res.status(500).send("Internal Server Error");
  }
};

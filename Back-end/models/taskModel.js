const mongoose = require("mongoose");
const { Schema } = mongoose;

const taskDataSchema = new Schema({
  userId: Schema.Types.ObjectId,
  taskName: String,
  list: String,
  dueDate: String,
  priority: String,
  notes: Array,
  marks: Boolean,
});

module.exports = mongoose.model("TaskData", taskDataSchema);

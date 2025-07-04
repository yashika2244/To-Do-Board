import mongoose from 'mongoose';

const taskSchema = new mongoose.Schema({
  title: { type: String, unique: true },
  description: String,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, 
  status: { type: String, enum: ['Todo', 'In Progress', 'Done'], default: 'Todo' },
  priority: { type: String, enum: ['Low', 'Medium', 'High'], default: 'Medium' },
  lastUpdated: { type: Date, default: Date.now },

},
  { timestamps: true });

export default mongoose.model('Task', taskSchema);

const Task = require('../models/Task');

const createTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const task = await Task.create({ title, description, owner: req.user.id });
    res.status(201).json(task);
  } catch (err) { next(err); }
};

const getTasks = async (req, res, next) => {
  try {
    const filter = req.user.role === 'admin' ? {} : { owner: req.user.id };
    const tasks = await Task.find(filter).populate('owner', 'name email');
    res.json(tasks);
  } catch (err) { next(err); }
};

const updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Not found' });

    if (req.user.role !== 'admin' && task.owner.toString() !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    Object.assign(task, req.body);
    await task.save();
    res.json(task);
  } catch (err) { next(err); }
};

const deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ message: 'Not found' });

    if (req.user.role !== 'admin' && task.owner.toString() !== req.user.id)
      return res.status(403).json({ message: 'Forbidden' });

    await task.remove();
    res.json({ message: 'Deleted' });
  } catch (err) { next(err); }
};

module.exports = { createTask, getTasks, updateTask, deleteTask };

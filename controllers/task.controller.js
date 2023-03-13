import Task from "../models/task.model.js";

export const createTask = async (req, res) => {
  try {
    const { name } = req.body;
    const newTask = new Task({
      name,
    });
    const task = await newTask.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllTask = async (req, res) => {
  try {
    const task = await Task.find();
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getTaskById = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const updateTask = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    const task = await Task.findByIdAndUpdate(id, { name });
    res.status(200).send("Successfully updated");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const toggleTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findById(id);
    task.isActive = !task.isActive;
    await task.save();
    res.status(200).send("Successfully toggled");
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteTask = async (req, res) => {
  try {
    const { id } = req.params;
    const task = await Task.findByIdAndDelete(id);
    res.status(200).send("Successfully deleted");
  } catch (error) {
    res.status(500).json(error);
  }
};

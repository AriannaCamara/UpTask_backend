"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectController = void 0;
const Project_1 = __importDefault(require("../models/Project"));
class ProjectController {
    static createProjects = async (req, res) => {
        const project = new Project_1.default(req.body);
        //ASIGNA UN MANAGER
        project.manager = req.user.id;
        try {
            await project.save();
            res.send('Proyecto Creado Correctamente');
        }
        catch (error) {
            console.log(error);
        }
    };
    static getAllProjects = async (req, res) => {
        try {
            const projects = await Project_1.default.find({
                $or: [
                    { manager: req.user.id },
                    { team: req.user.id }
                ]
            });
            res.json(projects);
        }
        catch (error) {
            console.log(error);
        }
    };
    static getProjectById = async (req, res) => {
        const { id } = req.params;
        try {
            const project = await Project_1.default.findById(id).populate('tasks');
            if (!project) {
                const error = new Error('Projecto no encontrado');
                return res.status(404).json({ error: error.message });
            }
            if (project.manager.toString() !== req.user.id.toString() && !project.team.includes(req.user.id)) {
                const error = new Error('Acción no válida');
                return res.status(404).json({ error: error.message });
            }
            res.json(project);
        }
        catch (error) {
            console.log(error);
        }
    };
    static updateProject = async (req, res) => {
        const { id } = req.params;
        try {
            const project = await Project_1.default.findById(id);
            if (!project) {
                const error = new Error('Projecto no encontrado');
                return res.status(404).json({ error: error.message });
            }
            if (project.manager.toString() !== req.user.id.toString()) {
                const error = new Error('Solo el Manager puede actualizar un proyecto');
                return res.status(404).json({ error: error.message });
            }
            project.clientName = req.body.clientName;
            project.projectName = req.body.projectName;
            project.description = req.body.description;
            await project.save();
            res.send('Proyecto Actualizado');
        }
        catch (error) {
            console.log(error);
        }
    };
    static deleteProject = async (req, res) => {
        const { id } = req.params;
        try {
            const project = await Project_1.default.findById(id);
            if (!project) {
                const error = new Error('Projecto no encontrado');
                return res.status(404).json({ error: error.message });
            }
            if (project.manager.toString() !== req.user.id.toString()) {
                const error = new Error('Solo el Manager puede borrar un proyecto');
                return res.status(404).json({ error: error.message });
            }
            await project.deleteOne();
            res.send('Proyecto Eliminado');
        }
        catch (error) {
            console.log(error);
        }
    };
}
exports.ProjectController = ProjectController;
//# sourceMappingURL=ProjectController.js.map
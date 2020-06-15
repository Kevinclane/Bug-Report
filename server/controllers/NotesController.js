import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { notesService } from "../services/NotesService";

export class NotesController extends BaseController {
  constructor() {
    super("api/notes");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getAllNotes)
      .get("/:id", this.getNoteById)
      .put("/:id", this.edit)
      .post("", this.post)
      .delete("/:id", this.delete)
  }
  async getAllNotes(req, res, next) {
    try {
      let data = await notesService.getNotes(req.query);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getNoteById(req, res, next) {
    try {
      let data = await notesService.findById(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async edit(req, res, next) {
    let update = {
      closed: req.body.closed,
      title: req.body.title,
      description: req.body.description,
      id: req.params.id
    }
    try {
      req.body.creatorId = req.user.sub;
      let data = await notesService.edit(update)
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async post(req, res, next) {
    try {
      let newNote = {
        content: req.body.content,
        bugId: req.params.id || req.body.bugId,
        reportedBy: req.userInfo.name
      }
      let data = await notesService.create(newNote)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async delete(req, res, next) {
    try {
      await notesService.delete(req.params.id)
      res.send("Successfully deleted!")
    } catch (error) {
      next(error)
    }
  }
}

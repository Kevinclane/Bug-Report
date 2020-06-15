import express from "express";
import BaseController from "../utils/BaseController";
import auth0Provider from "@bcwdev/auth0provider";
import { bugsService } from "../services/BugsService";
import { notesService } from "../services/NotesService"

export class BugsController extends BaseController {
  constructor() {
    super("api/bugs");
    this.router
      .use(auth0Provider.getAuthorizedUserInfo)
      .get("", this.getAllBugs)
      .get("/:id", this.getBugById)
      .get("/:id/notes", this.getNotesByBugId)
      .put("/:id", this.edit)
      .post("", this.post)

  }
  async getAllBugs(req, res, next) {
    try {
      let data = await bugsService.getBugs(req.query);
      res.send(data);
    } catch (error) {
      next(error);
    }
  }
  async getBugById(req, res, next) {
    try {
      let data = await bugsService.findById(req.params.id)
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
      let data = await bugsService.edit(update)
      res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async post(req, res, next) {
    try {
      let newBug = {
        reportedBy: req.userInfo.name,
        title: req.body.title,
        description: req.body.description,
        closed: req.body.closed
      }
      let data = await bugsService.create(newBug)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
  async getNotesByBugId(req, res, next) {
    try {
      let data = await notesService.getNotesByBugId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }
}

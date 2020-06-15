import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class NotesService {

  async getNotes(query = {}) {
    let data = await dbContext.Notes.find(query).populate(
      "creator",
      "name picture"
    );
    return data;
  }

  async findById(id) {
    let value = await dbContext.Notes.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }

  async create(body) {
    let data = await dbContext.Notes.create(body)
    return data
  }

  async edit(update) {
    await dbContext.Notes.findByIdAndUpdate(update.id, update)
    let data = await dbContext.Notes.findById(update.id)
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this post");
    }
    return data
  }

  async getNotesByBugId(id) {
    return await dbContext.Notes.find({ bugId: id })
  }
  async delete(id) {
    return await dbContext.Notes.findByIdAndDelete(id)
  }
}

export const notesService = new NotesService();

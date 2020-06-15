import { dbContext } from "../db/DbContext";
import { BadRequest } from "../utils/Errors";

class BugsService {

  async getBugs(query = {}) {
    let data = await dbContext.Bugs.find(query).populate(
      "creator",
      "name picture"
    );
    return data;
  }

  async findById(id) {
    let value = await dbContext.Bugs.findById(id);
    if (!value) {
      throw new BadRequest("Invalid Id");
    }
    return value;
  }

  async create(body) {
    let data = await dbContext.Bugs.create(body)
    return data
  }

  async edit(update) {
    await dbContext.Bugs.findByIdAndUpdate(update.id, update)
    let data = await dbContext.Bugs.findById(update.id)
    if (!data) {
      throw new BadRequest("Invalid ID or you do not own this post");
    }
    return data
  }
}

export const bugsService = new BugsService();

import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
export class FileDAO {
  constructor(file) { this.file = path.resolve("server/data", file); }
  async read() {
    try { return JSON.parse(await readFile(this.file, "utf8")); }
    catch (error) {
      if (error.code !== "ENOENT") throw error;
      await this.write([]); return [];
    }
  }
  async write(data) {
    await mkdir(path.dirname(this.file), { recursive: true });
    await writeFile(this.file, JSON.stringify(data, null, 2));
  }
}

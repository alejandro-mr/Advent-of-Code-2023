class FileReader {
  #file;

  constructor(filePath: string) {
    try {
      this.#file = Bun.file(filePath);
    } catch (error) {
      console.error(
        "There was an error trying to read file: ",
        (error as Error).message,
      );
    }
  }

  /*
   * Returns a string iterator with the full content of file (char by char iteration)
   */
  async read(): Promise<string> {
    if (this.#file) return await this.#file.text();
    return "";
  }

  /*
   * Returns an array with every line delimited by "\n" from the original document
   */
  async readLines(): Promise<Array<string>> {
    let fileData = "";
    if (this.#file) {
      fileData = await this.#file.text();
    }
    return fileData.trim().split("\n");
  }
}

export default FileReader;
export { FileReader };

import { LexicaAPI } from "lexica-api";

const lexica = new LexicaAPI();

const searchLexica = async (req, res) => {
  try {
    const imageToSearch = req.query.url;
    if (imageToSearch && imageToSearch.length) {
      const results = await lexica.search(imageToSearch);
      res.status(200).json(results);
    } else {
      res.status(400).json({ error: "No image URL provided" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default searchLexica;

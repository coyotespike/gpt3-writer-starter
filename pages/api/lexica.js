import { LexicaAPI } from "lexica-api";

const lexica = new LexicaAPI();

const searchLexica = async (req, res) => {
  try {
    const results = await lexica.reverseImageSearch(
      "https://media.gettyimages.com/photos/crete-senesi-countryside-in-summer-tuscany-italy-picture-id1411845730"
    );

    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default searchLexica;

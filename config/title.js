async function getAllTitles(movies) {
  const query = {};
  const options = {
    projection: {
      "adult": 0,
      "popularity": 0,
      "video": 0,
    },
  };

  try {
    const cursor = movies.find(query, options);
    await cursor.forEach(console.dir);
  } catch (err) {
    console.log(`\n❌ ${err}`);
  }
}

module.exports = getAllTitles;

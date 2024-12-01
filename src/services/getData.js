const { Firestore } = require('@google-cloud/firestore');

async function getData() {
  const db = new Firestore({ databaseId: 'submissionmlgc-wympi' });
  const predictCollection = db.collection('predictions');
  const allData = await predictCollection.get();
  return allData;
}

module.exports = getData;

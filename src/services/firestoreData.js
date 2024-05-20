const { Firestore } = require('@google-cloud/firestore');
 
async function storeData(id, data) {
  const db = new Firestore();
 
  const predictCollection = db.collection('predictions');
  return predictCollection.doc(id).set(data);
}

async function getData() {
  const db = new Firestore();
  const predictCollection = db.collection('predictions');

  try {
    // Mengambil semua dokumen dari koleksi prediction
    const snapshot = await predictCollection.get();

    // Mengonversi data snapshot menjadi array objek
    const data = [];
    snapshot.forEach(doc => {
        data.push({
            id: doc.id,
            history: doc.data()
        });
    });

    return data;
} catch (error) {
    // Menghandle kesalahan jika terjadi saat mengambil data
    console.error('Error while fetching data:', error);
    throw new InputError(`Terjadi kesalahan dalam melakukan prediksi`);
}
}
 
module.exports = { getData, storeData };
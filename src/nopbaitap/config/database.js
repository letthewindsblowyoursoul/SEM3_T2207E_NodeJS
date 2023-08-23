const mongoose = require('mongoose');

const connectToDatabase = () => {
  const dbName = 'thaisondb'; // Thay 'your_database_name' bằng tên cơ sở dữ liệu bạn muốn kết nối

  mongoose.connect(`mongodb+srv://thaisonqwe:123@cluster0.e7pudut.mongodb.net/?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Đã kết nối tới cơ sở dữ liệu ${dbName}`);
  })
  .catch(error => {
    console.error(`Lỗi kết nối tới cơ sở dữ liệu ${dbName}:`, error);
  });
};

module.exports = connectToDatabase;
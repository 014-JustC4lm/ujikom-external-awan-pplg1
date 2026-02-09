import app from './index.js';
import db from './config/db.js';

const port = 3001;

async function testDB() {
  try {
    const [rows] = await db.query('SELECT 1');
    console.log('Database connection successful');
  } catch (error) {
    console.error('Database connection failed:', error.message);
  }
}

testDB();

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
  console.log(`API routes:`);
  console.log(`  - http://localhost:${port}/`);
  console.log(`  - http://localhost:${port}/api/auth`);
  console.log(`  - http://localhost:${port}/api/users`);
  console.log(`  - http://localhost:${port}/api/items`);
  console.log(`  - http://localhost:${port}/api/loans`);
});
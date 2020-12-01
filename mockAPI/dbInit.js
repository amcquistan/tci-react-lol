// dbInit.js

const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const dbPath = path.join(__dirname, 'db.json');

if (fs.existsSync(dbPath)) {
  const backupPath = path.join(__dirname, 'db-backup.json');
  fs.renameSync(dbPath, backupPath);
  console.log(`Previous database backed up to ${backupPath}`);
}

const username = 'adammcquistan';

const mockData = {
  lists: [
    {
      id: uuidv4(),
      username,
      name: 'Learn Programming Languages',
      createdAt: Date.now(),
      completed: false,
      items: [
        { name: 'Java', completed: true },
        { name: 'Python', completed: true },
        { name: 'JavaScript', completed: true },
        { name: 'C Sharp', completed: false },
        { name: 'Go', completed: false }
      ]
    },
    {
      id: uuidv4(),
      username,
      name: 'Groceries',
      createdAt: Date.now(),
      completed: false,
      items: [
        { name: 'Milk', completed: false },
        { name: 'Eggs', completed: false },
        { name: 'Chicken Nuggets', completed: false },
        { name: 'Raisin Bran', completed: false }
      ]
    }
  ]
};

fs.writeFile(dbPath, JSON.stringify(mockData), err => {
  if (err) {
    console.log(err);
  } else {
    console.log(`Mock database created ${dbPath}`);
  }
});

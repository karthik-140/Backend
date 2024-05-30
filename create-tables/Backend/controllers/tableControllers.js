const Table = require('../models/table');
const db = require('../util/mysqlDatabase');

exports.createTable = (req, res, next) => {
  try {
    console.log('createTable-reqbody', req.body);
    const tableName = req.body.tableName;
    const columnsArray = req.body.columns

    // Sanitize tableName to avoid SQL injection
    if (!/^[a-zA-Z_][a-zA-Z0-9_]*$/.test(tableName)) {
      return res.status(400).json({ error: 'Invalid table name' });
    }

    const columns = columnsArray.map((col) => `${col.columnName} ${col.fieldType}`);
    const query = `CREATE TABLE ${tableName} (id INT AUTO_INCREMENT PRIMARY KEY, ${columns.join(', ')})`;

    console.log('Executing query:', query);

    db.execute(query)
      .then(result => {
        console.log('Table created successfully');
        res.status(201).json({ message: 'Table created successfully', result });
      })
      .catch(err => {
        console.error('Error creating table:', err);
        res.status(500).json({ error: 'Error creating table', details: err });
      });
  } catch (err) {
    console.error('Error in createTable function:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

exports.getTableData = (req, res, next) => {
  const tableName = req.params.tableName
  console.log(tableName)

  db.execute(`SELECT * FROM ${tableName}`)
    .then((result) => {
      console.log(result)
      res.status(200).json({ result });
    })
    .catch(err => console.log(err))
}

exports.insertDataIntoTable = (req, res, next) => {
  const tableName = req.params.tableName
  console.log('tableName', tableName)
  console.log('req', req.params)
  const data = req.body

  let fields = ""
  let ques = ''
  const values = []
  for (let key in data) {
    if (fields === '') {
      fields = key
      ques = '?'
    } else {
      fields = fields + `, ${key}`
      ques = ques + ', ?'
    }
    values.push(data[key])
  }

  db.execute(`INSERT INTO ${tableName} (${fields}) VALUES (${ques})`, values)
    .then((result) => {
      res.status(201).json({ response: result })
    })
    .catch(err => console.log(err))
}

exports.deleteFromTable = (req, res, next) => {
  const id = req.params.id
  const tableName = req.query.tableName

  db.execute(`DELETE FROM ${tableName} WHERE ${tableName}.id = ?`, [id])
    .then((result) => {
      res.status(200).json({ message: 'Deleted sunccesfully!', result })
    }).catch(err => console.log(err))
}

exports.fetchTables = (req, res, next) => {
  db.execute('SELECT table_name FROM information_schema.tables WHERE table_schema = \'database-management-project\'')
    .then(([rows]) => {
      const tables = rows.map((row) => row.TABLE_NAME)
      res.status(200).json(tables)
      console.log('Tables', tables)
    })
    .catch(err => console.log(err))
}

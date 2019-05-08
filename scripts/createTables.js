const db = require('../database');
const employeeRepository = require('../repositories/employees')(db);

const wrapTableCreationMethod = tableCreationMethod =>
  tableCreationMethod()
    .then(res => {
      if (res.alreadyCreated) {
        console.log(`Table ${res.tableName} Already Created`);
      } else {
        console.log(`Table ${res.tableName} Created`);
      }
    })
    .catch(tableName => console.log(`Error Creating ${tableName}`));

wrapTableCreationMethod(employeeRepository.createEmployeesTable).then(() => {
  console.log('Done');
  db.destroy();
});

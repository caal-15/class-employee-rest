module.exports = db => ({
  createEmployeesTable: () =>
    db.schema.hasTable('employees').then(employeesTableExists => {
      console.log(employeesTableExists)
      if (employeesTableExists) {
        return {
          tableName: 'employees',
          alreadyCreated: true
        };
      }
      return db.schema.createTable('employees', table => {
        table.increments('id');
        table.string('firstName').notNullable();
        table.string('lastName').notNullable();
        table.string('nationalIdNumber').notNullable();
        table.string('email').notNullable();
        table.date('birthDate').notNullable();
      })
        .then(() => ({ tableName: 'employees', alreadyCreated: false }))
        .catch(() => Promise.reject('employees'));
    })
});

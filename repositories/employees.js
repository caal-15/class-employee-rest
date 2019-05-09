const EMPLOYEE_TABLE_NAME = 'employees';

module.exports = db => {
  const createEmployeesTable = () =>
    db.schema.hasTable(EMPLOYEE_TABLE_NAME).then(employeesTableExists => {
      if (employeesTableExists) {
        return {
          tableName: EMPLOYEE_TABLE_NAME,
          alreadyCreated: true
        };
      }
      return db.schema
        .createTable(EMPLOYEE_TABLE_NAME, table => {
          table.increments('id');
          table.string('firstName').notNullable();
          table.string('lastName').notNullable();
          table.string('nationalIdNumber').notNullable();
          table.string('email').notNullable();
          table.date('birthDate').notNullable();
        })
        .then(() => ({ tableName: EMPLOYEE_TABLE_NAME, alreadyCreated: false }))
        .catch(() => Promise.reject(EMPLOYEE_TABLE_NAME));
    });

  const getAllEmployees = () => db(EMPLOYEE_TABLE_NAME).select();

  const getEmployee = id =>
    db(EMPLOYEE_TABLE_NAME)
      .where({ id })
      .then(rows => (rows.length > 0 ? rows[0] : null));

  const createEmployee = employee =>
    db(EMPLOYEE_TABLE_NAME)
      .insert(employee)
      .then(idArray => getEmployee(idArray[0]));

  const updateEmployee = (id, employee) =>
    db(EMPLOYEE_TABLE_NAME)
      .where({ id })
      .update({ ...employee, id: undefined })
      .then(updateCount => {
        if (updateCount === 0) return null;
        return getEmployee(id);
      });

  const deleteEmployee = id =>
    getEmployee(id).then(employee => {
      if (!employee) return null;
      return db(EMPLOYEE_TABLE_NAME)
        .where({ id })
        .del()
        .then(deletedCount => {
          if (deletedCount === 0) return null;
          return employee;
        });
    });

  return {
    createEmployeesTable,
    getAllEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee
  };
};

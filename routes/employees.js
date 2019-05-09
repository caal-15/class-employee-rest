module.exports = (server, baseRoute, employeeRepository) => {
  server.get(`${baseRoute}`, (_, res) =>
    employeeRepository.getAllEmployees().then(rows => res.json(rows))
  );

  server.post(`${baseRoute}`, (req, res) =>
    employeeRepository
      .createEmployee(req.body)
      .then(employee => {
        res.status(201);
        return res.json(employee);
      })
      .catch(() => {
        res.status(400);
        return res.end();
      })
  );

  server.get(`${baseRoute}/:id`, (req, res) =>
    employeeRepository.getEmployee(req.params.id).then(employee => {
      if (employee) return res.json(employee);
      res.status(404);
      return res.end();
    })
  );

  server.put(`${baseRoute}/:id`, (req, res) =>
    employeeRepository
      .updateEmployee(req.params.id, req.body)
      .then(employee => {
        if (employee) return res.json(employee);
        res.status(404);
        return res.end();
      })
  );

  server.del(`${baseRoute}/:id`, (req, res) =>
    employeeRepository.deleteEmployee(req.params.id).then(employee => {
      if (employee) return res.json(employee);
      res.status(404);
      return res.end();
    })
  );
};

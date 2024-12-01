package com.empSystem.Employee.Management.System;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service

public class EmployeeService {
	


    @Autowired
    private EmployeeRepository employeeRepository;

    public Employee createEmployee(Employee employee) {
    	System.out.println("  before create  : "+employee.toString());

        return employeeRepository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee getEmployeeById(long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));
    }

    public Employee updateEmployee(long id, Employee employeeDetails) {
        Employee employee = getEmployeeById(id);
        employee.setName(employeeDetails.getName());
        employee.setEmail(employeeDetails.getEmail());
        employee.setPhone(employeeDetails.getPhone());
        employee.setDepartment(employeeDetails.getDepartment());
        return employeeRepository.save(employee);
    }

    public void deleteEmployee(long id) {
        Employee employee = getEmployeeById(id);
        employeeRepository.delete(employee);
    }

}

const apiUrl = "http://localhost:8080/employees"; // Adjust backend URL

// Fetch all employees (GET)
function fetchEmployees() {
    axios.get(apiUrl)
        .then(response => {
            const employees = response.data;
            const tableBody = document.querySelector("#employeeTable tbody");
            tableBody.innerHTML = ""; // Clear existing rows
            employees.forEach(employee => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${employee.id}</td>
                    <td>${employee.name}</td>
                    <td>${employee.email}</td>
                    <td>${employee.phone}</td>
                    <td>${employee.department}</td>
                    <td class="actions">
                        <button class="edit" onclick="editEmployee(${employee.id})">Edit</button>
                        <button class="delete" onclick="deleteEmployee(${employee.id})">Delete</button>
                    </td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("There was an error fetching employees:", error));
}

// Add new employee (POST)
document.getElementById("employeeForm").addEventListener("submit", function (e) {
    e.preventDefault();
    const employee = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value
    };

    axios.post(apiUrl, employee, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        fetchEmployees(); // Refresh employee list
        document.getElementById("employeeForm").reset(); // Clear the form
    })
    .catch(error => console.error("There was an error adding the employee:", error)); 
});

// Delete an employee (DELETE)
function deleteEmployee(id) {
    axios.delete(`${apiUrl}/${id}`)
        .then(() => {
            fetchEmployees(); // Refresh employee list
        })
        .catch(error => console.error("There was an error deleting the employee:", error));
}

// Edit an employee (PUT)
function editEmployee(id) {
    // Fetch the employee data for editing (GET)
    axios.get(`${apiUrl}/${id}`)
        .then(response => {
            const employee = response.data;
            document.getElementById("name").value = employee.name;
            document.getElementById("email").value = employee.email;
            document.getElementById("phone").value = employee.phone;
            document.getElementById("department").value = employee.department;

            // Change form action to update employee
            const form = document.getElementById("employeeForm");
            form.onsubmit = function (e) {
                e.preventDefault();
                const updatedEmployee = {
                    name: document.getElementById("name").value,
                    email: document.getElementById("email").value,
                    phone: document.getElementById("phone").value,
                    department: document.getElementById("department").value
                };

                // Send PUT request to update the employee
                axios.put(`${apiUrl}/${id}`, updatedEmployee)
                    .then(response => {
                        fetchEmployees(); // Refresh employee list
                        form.reset(); // Clear form
                        form.onsubmit = createEmployee; // Reset form back to "Create" mode
                    })
                    .catch(error => console.error("There was an error updating the employee:", error));
            };
        })
        .catch(error => console.error("There was an error fetching employee data for edit:", error));
}

// Function to handle creating a new employee (for resetting the form back)
function createEmployee(e) {
    e.preventDefault();
    const employee = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        department: document.getElementById("department").value
    };

    axios.post(apiUrl, employee, {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        fetchEmployees(); // Refresh employee list
        document.getElementById("employeeForm").reset(); // Clear the form
    })
    .catch(error => console.error("There was an error adding the employee:", error));
}

// Initial fetch on page load
window.onload = function () {
    fetchEmployees();
    const form = document.getElementById("employeeForm");
    form.onsubmit = createEmployee; // Ensure form is initially set to create a new employee
};

let customers = [];

function loadFile(event) {
    const file = event.target.files[0];
    if (!file) {
        console.error("No file selected.");
        return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
        const content = e.target.result;
        console.log("File content:", content);
        const lines = content.split('\n');
        
        customers = lines.map(line => {
            const [name, email, phone] = line.split(',');
            return { name: name ? name.trim() : "", email: email ? email.trim() : "", phone: phone ? phone.trim() : "" };
        }).filter(customer => customer.name);
        console.log("Parsed customers:", customers);
        displayCustomers(customers);
    };
    
    reader.readAsText(file);
}

function displayCustomers(customerList) {
    const tableBody = document.getElementById("customerTableBody");
    tableBody.innerHTML = "";
    customerList.forEach((customer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
        `;
        tableBody.appendChild(row);
    });
}

function sortCustomers() {
    console.log("Sorting customers...");
    customers.sort((a, b) => a.name.localeCompare(b.name));
    displayCustomers(customers);
}

function searchCustomer() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    console.log("Searching for:", searchTerm);
    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm)
    );
    console.log("Filtered Customers:", filteredCustomers);
    displayCustomers(filteredCustomers);
}

if (typeof module !== 'undefined') {
    module.exports = { loadFile, displayCustomers, sortCustomers, searchCustomer, customers };
}

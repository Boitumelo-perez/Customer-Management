const { loadFile, displayCustomers, sortCustomers, searchCustomer, customers } = require('./script');

describe("Customer Management Tests", () => {

    beforeEach(() => {
        document.body.innerHTML = `
            <input type="text" id="searchInput" />
            <table id="customerTable">
                <tbody id="customerTableBody"></tbody>
            </table>
        `;

        customers.splice(0, customers.length,
            { name: "Bob Johnson", email: "bob@example.com", phone: "123-456-7890" },
            { name: "Alice Smith", email: "alice@example.com", phone: "234-567-8901" }
        );
    });

    test("Sort customers alphabetically", () => {
        sortCustomers();
        expect(customers[0].name).toBe("Alice Smith");
        expect(customers[1].name).toBe("Bob Johnson");
    });

    test("Search for a customer by name", () => {
        displayCustomers(customers);
        document.getElementById("searchInput").value = "Alice";
        searchCustomer();
        
        const tableBody = document.getElementById("customerTableBody");
        expect(tableBody.innerHTML).toContain("Alice Smith");
        expect(tableBody.innerHTML).not.toContain("Bob Johnson");
    });
});
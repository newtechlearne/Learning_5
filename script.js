document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('student-form');
    const studentsTable = document.getElementById('students-table').getElementsByTagName('tbody')[0];

    // Load students from localStorage if any
    function loadStudents() {
        const students = JSON.parse(localStorage.getItem('students')) || [];
        studentsTable.innerHTML = ''; // Clear the table before repopulating
        students.forEach(student => {
            const row = studentsTable.insertRow();
            row.innerHTML = `
                <td>${student.name}</td>
                <td>${student.id}</td>
                <td>${student.email}</td>
                <td>${student.contact}</td>
                <td>
                    <button onclick="editStudent(this)">Edit</button>
                    <button onclick="deleteStudent(this)">Delete</button>
                </td>
            `;
        });
        updateScrollbar();
    }

    // Update the vertical scrollbar dynamically
    function updateScrollbar() {
        if (studentsTable.rows.length > 5) {
            studentsTable.parentElement.style.overflowY = 'auto';
            studentsTable.parentElement.style.maxHeight = '10px'; // Set the max height
        } else {
            studentsTable.parentElement.style.overflowY = 'hidden';
        }
    }

    // Display students initially when the page is loaded
    loadStudents();

    // Add new student
    form.addEventListener('submit', function(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const id = document.getElementById('student-id').value;
        const email = document.getElementById('email').value.trim();
        const contact = document.getElementById('contact').value;

        // Validation: Ensure all fields are filled
        if (!name || !id || !email || !contact) {
            alert('All fields are required!');
            return;
        }

        // Validation: Name should only contain letters and spaces
        if (!/^[A-Za-z\s]+$/.test(name)) {
            alert('Student name should only contain letters and spaces!');
            return;
        }

        // Validation: Check if ID and Contact are numbers
        if (!/^\d+$/.test(id) || !/^\d+$/.test(contact)) {
            alert('Student ID and Contact should only contain numbers!');
            return;
        }

        // Validation: Check if email is valid
        if (!/\S+@\S+\.\S+/.test(email)) {
            alert('Please enter a valid email address!');
            return;
        }

        // Create and insert a new student row
        const row = studentsTable.insertRow();
        row.innerHTML = `
            <td>${name}</td>
            <td>${id}</td>
            <td>${email}</td>
            <td>${contact}</td>
            <td>
                <button onclick="editStudent(this)">Edit</button>
                <button onclick="deleteStudent(this)">Delete</button>
            </td>
        `;

        // Save students in localStorage
        saveStudents();

        // Clear form after submitting
        form.reset();
        updateScrollbar();
    });

    // Edit student row
    window.editStudent = function(button) {
        const row = button.parentElement.parentElement;
        const cells = row.children;

        document.getElementById('name').value = cells[0].textContent;
        document.getElementById('student-id').value = cells[1].textContent;
        document.getElementById('email').value = cells[2].textContent;
        document.getElementById('contact').value = cells[3].textContent;

        // Remove the current row after editing
        row.remove();
        saveStudents();
    };

    // Delete student row
    window.deleteStudent = function(button) {
        const row = button.parentElement.parentElement;
        row.remove();
        saveStudents();
    };

    // Save all students to localStorage
    function saveStudents() {
        const rows = studentsTable.rows;
        const students = [];
        for (let i = 0; i < rows.length; i++) {
            const row = rows[i];
            students.push({
                name: row.cells[0].textContent,
                id: row.cells[1].textContent,
                email: row.cells[2].textContent,
                contact: row.cells[3].textContent
            });
        }
        localStorage.setItem('students', JSON.stringify(students));
    }
});

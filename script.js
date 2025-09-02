// Teen Opportunities Dashboard - Sorting Functionality

document.addEventListener('DOMContentLoaded', function() {
    const table = document.getElementById('opportunities-table');
    const tbody = document.getElementById('opportunities-tbody');
    let currentSort = { column: null, direction: 'asc' };

    // Add click listeners to sortable headers
    const sortableHeaders = table.querySelectorAll('th.sortable');
    sortableHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const column = header.getAttribute('data-column');
            sortTable(column);
        });
    });

    function sortTable(column) {
        // Toggle sort direction if clicking the same column
        if (currentSort.column === column) {
            currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            currentSort.direction = 'asc';
        }
        currentSort.column = column;

        // Get all table rows as an array
        const rows = Array.from(tbody.querySelectorAll('tr'));

        // Sort rows based on column type
        rows.sort((a, b) => {
            let aValue, bValue;

            switch (column) {
                case 'title':
                case 'category':
                case 'location':
                case 'barrier':
                case 'admissions':
                case 'skills':
                case 'benefits':
                    // Alphabetical sorting
                    aValue = getCellValue(a, column).toLowerCase();
                    bValue = getCellValue(b, column).toLowerCase();
                    return currentSort.direction === 'asc' 
                        ? aValue.localeCompare(bValue)
                        : bValue.localeCompare(aValue);

                case 'rate':
                    // Numerical sorting for hourly rate (extract number from $X/hour)
                    aValue = parseFloat(getCellValue(a, column).replace(/[$\/hour]/g, ''));
                    bValue = parseFloat(getCellValue(b, column).replace(/[$\/hour]/g, ''));
                    return currentSort.direction === 'asc' ? aValue - bValue : bValue - aValue;

                case 'hours':
                case 'people':
                    // Numerical sorting for hours and people helped
                    aValue = parseInt(getCellValue(a, column));
                    bValue = parseInt(getCellValue(b, column));
                    return currentSort.direction === 'asc' ? aValue - bValue : bValue - aValue;

                default:
                    return 0;
            }
        });

        // Clear tbody and append sorted rows
        tbody.innerHTML = '';
        rows.forEach(row => tbody.appendChild(row));

        // Update header visual indicators
        updateSortIndicators(column);
    }

    function getCellValue(row, column) {
        const columnIndex = {
            'title': 0,
            'category': 1,
            'location': 2,
            'rate': 3,
            'barrier': 4,
            'hours': 5,
            'people': 6,
            'admissions': 7,
            'skills': 8,
            'benefits': 9
        };
        return row.cells[columnIndex[column]].textContent.trim();
    }

    function updateSortIndicators(activeColumn) {
        // Remove existing sort classes
        sortableHeaders.forEach(header => {
            header.classList.remove('sort-asc', 'sort-desc');
        });

        // Add sort class to active column
        const activeHeader = table.querySelector(`th[data-column="${activeColumn}"]`);
        if (activeHeader) {
            activeHeader.classList.add(currentSort.direction === 'asc' ? 'sort-asc' : 'sort-desc');
        }
    }

    console.log('Teen Opportunities Dashboard loaded with sorting functionality');
});
const fileInput = document.getElementById('fileInput');
const fileListContainer = document.getElementById('fileListContainer');
const uploadArea = document.getElementById('uploadArea');
const clearBtn = document.getElementById('clearBtn');
let selectedFiles = [];

// Handle file input change
fileInput.addEventListener('change', function(e) {
    handleFiles(e.target.files);
});

// Handle drag and drop
uploadArea.addEventListener('dragover', function(e) {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', function(e) {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    handleFiles(e.dataTransfer.files);
});

function handleFiles(files) {
    // Add new files to the existing list
    for (let file of files) {
        // Check if file is already in the list
        if (!selectedFiles.some(f => f.name === file.name && f.size === file.size)) {
            selectedFiles.push(file);
        }
    }
    displayFiles();
}

function displayFiles() {
    if (selectedFiles.length === 0) {
        fileListContainer.innerHTML = '<div class="empty-state">No files selected</div>';
        clearBtn.style.display = 'none';
        return;
    }

    let html = '';
    selectedFiles.forEach((file, index) => {
        const fileSize = formatFileSize(file.size);
        html += `
            <div class="file-item">
                <span class="file-name">${file.name}</span>
                <span class="file-size">${fileSize}</span>
            </div>
        `;
    });

    fileListContainer.innerHTML = html;
    clearBtn.style.display = 'block';
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function clearFiles() {
    selectedFiles = [];
    fileInput.value = '';
    displayFiles();
}

function downloadDocument() {
    // Create a temporary anchor element to trigger download
    const link = document.createElement('a');
    link.href = 'assets/sample-document.pdf';
    link.download = 'sample-document.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}
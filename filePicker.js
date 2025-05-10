// This function opens the file picker to allow the user to upload STL files
window.OpenFilePicker = function() {
    var input = document.createElement('input');
    input.type = 'file';
    input.accept = '.stl'; // Only accept STL files
    input.onchange = handleFileSelect;
    input.click();
};

// Handle file selection and send the data to Unity
function handleFileSelect(event) {
    var file = event.target.files[0];
    if (file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            // Send the file data to Unity as a Base64 string
            var fileData = e.target.result.split(',')[1];  // Remove the data URL prefix
            SendMessageToUnity(fileData);
        };
        reader.readAsDataURL(file); // Read the file as a Data URL (Base64)
    }
}

// Send the file data to Unity using a Unity method
function SendMessageToUnity(fileData) {
    if (typeof unityInstance !== 'undefined') {
        unityInstance.SendMessage('WebGLStlLoader', 'OnFileSelected', fileData);
    }
}

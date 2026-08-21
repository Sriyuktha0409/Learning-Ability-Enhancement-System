const fs = require('fs');
const path = require('path');

console.log('Running post-build script...');

// 1. Copy custom homepage to build directory
try {
  fs.copyFileSync(
    path.join(__dirname, 'public', 'index1.html'),
    path.join(__dirname, 'build', 'index1.html')
  );
  console.log('Successfully copied index1.html to build directory');
} catch (err) {
  console.error('Error copying index1.html:', err);
  process.exit(1);
}

// 2. Modify the built index.html
try {
  const indexPath = path.join(__dirname, 'build', 'index.html');
  let indexHtml = fs.readFileSync(indexPath, 'utf8');
  
  const redirectScript = `
  <script>
    // Handle initial redirection
    if (window.location.pathname === '/' && !window.location.hash) {
      window.location.href = './index1.html';
    }
    
    // Global navigation function for the custom homepage
    window.navigateToReact = function(path) {
      if (path) {
        window.location.href = './index.html#' + path;
      }
    };
  </script>
  `;

  // Insert the script right before </head>
  indexHtml = indexHtml.replace('</head>', `${redirectScript}</head>`);
  
  fs.writeFileSync(indexPath, indexHtml);
  console.log('Successfully modified index.html');
} catch (err) {
  console.error('Error modifying index.html:', err);
  process.exit(1);
}

console.log('Post-build completed successfully!');
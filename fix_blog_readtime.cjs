const fs = require('fs');

let code = fs.readFileSync('src/pages/admin/BlogTab.tsx', 'utf-8');

code = code.replace(
  /imagePrompt: "",\n      tags: \[\]\n    \}\);/,
  'imagePrompt: "",\n      tags: [],\n      readTime: "3 Dk"\n    });'
);

code = code.replace(
  /imagePrompt: post\.imagePrompt \|\| "",\n      tags: post\.tags \|\| \[\]\n    \}\);/,
  'imagePrompt: post.imagePrompt || "",\n      tags: post.tags || [],\n      readTime: post.readTime || "3 Dk"\n    });'
);

fs.writeFileSync('src/pages/admin/BlogTab.tsx', code);

const fs = require('fs');
let code = fs.readFileSync('src/pages/admin/BlogTab.tsx', 'utf-8');

// The issue is around line 623.
// Let's replace the lines 622-625 with:
//                                 </div>
//                               )}
//                             </div>
//                           )}
code = code.replace(
  /                                <\/div>\n                            <\/div>/,
  '                                </div>\n                              )}\n                            </div>\n                          )}'
);

// We had TS2657: JSX expressions must have one parent element on 783. Let's see what's on 783.
fs.writeFileSync('src/pages/admin/BlogTab.tsx', code);

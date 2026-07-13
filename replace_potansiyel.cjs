const fs = require('fs');
let lines = fs.readFileSync('src/pages/AdminPage.tsx', 'utf-8').split('\n');

const startIndex = 2102; // '{activeTab === "Potansiyel Müşteri" && (' is at line 2103 (index 2102)
const endIndex = 2644;   // '          )}' is at line 2645 (index 2644)

const before = lines.slice(0, startIndex);
const after = lines.slice(endIndex + 1);

const injection = `          {activeTab === "Potansiyel Müşteri" && (
            <PotansiyelMusteriTab
              crmStats={crmStats}
              crmSearch={crmSearch}
              setCrmSearch={setCrmSearch}
              crmDifficultyFilter={crmDifficultyFilter}
              setCrmDifficultyFilter={setCrmDifficultyFilter}
              crmProfitFilter={crmProfitFilter}
              setCrmProfitFilter={setCrmProfitFilter}
              isNewRequestModalOpen={isNewRequestModalOpen}
              setIsNewRequestModalOpen={setIsNewRequestModalOpen}
              newRequestForm={newRequestForm}
              setNewRequestForm={setNewRequestForm}
              isScoringLead={isScoringLead}
              handleYeniTalep={handleYeniTalep}
              filteredRequests={filteredRequests}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
              handleDragStart={handleDragStart}
              setSelectedCrmLead={setSelectedCrmLead}
              updateRequestStatus={updateRequestStatus}
              handleAnalyzeLead={handleAnalyzeLead}
              isAnalyzingCrmLead={isAnalyzingCrmLead}
              selectedCrmLead={selectedCrmLead}
              leadNotes={leadNotes}
              setLeadNotes={setLeadNotes}
              handleSaveLeadNotes={handleSaveLeadNotes}
              isSavingLeadNotes={isSavingLeadNotes}
              removeRequestDb={removeRequestDb}
              showConfirm={showConfirm}
              showToast={showToast}
            />
          )}`;

const newLines = [...before, injection, ...after];

let newContent = newLines.join('\n');
newContent = `import PotansiyelMusteriTab from './admin/PotansiyelMusteriTab';\n` + newContent;

fs.writeFileSync('src/pages/AdminPage.tsx', newContent);

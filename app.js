// Import HTM and bind it to React.createElement
import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(React.createElement);

const ModuleComparison = () => {
  const modules = [
    {
      name: "ExchangeOnlineManagement",
      azureAppReq: false,
      ps5: true,
      ps7: true,
      capabilityScore: 2,
      capabilities: [
        "M365 Groups",
        "M365 Members"
      ],
      notes: "Primary focus on email and group management. Can retrieve M365 Group info and members with Get-UnifiedGroup and Get-UnifiedGroupLinks."
    },
    {
      name: "MicrosoftTeams",
      azureAppReq: false,
      ps5: true,
      ps7: true,
      capabilityScore: 4,
      capabilities: [
        "M365 Groups",
        "Teams Members",
        "M365 Members",
        "Team Management"
      ],
      notes: "Excellent for Teams management. Retrieves Teams-enabled M365 groups with Get-Team and team members with Get-TeamUser."
    },
    {
      name: "PnP.PowerShell 1.12.0",
      azureAppReq: false,
      ps5: true,
      ps7: true,
      capabilityScore: 1,
      capabilities: [
        "SharePoint Sites"
      ],
      notes: "Without Azure app registration, limited to SharePoint operations only. Cannot access M365 Groups, Teams, or Power Platform features."
    },
    {
      name: "PnP.PowerShell 3.x.x",
      azureAppReq: true,
      ps5: false,
      ps7: true,
      capabilityScore: 7,
      capabilities: [
        "SharePoint Sites",
        "M365 Groups",
        "Teams Members",
        "M365 Members",
        "Team Channels w/SP URL",
        "Power Apps",
        "Power Automate Flows"
      ],
      notes: "Requires Azure app registration and PowerShell 7.4.6+. Similar capabilities to version 1.12.0."
    },
    {
      name: "Microsoft.Graph",
      azureAppReq: true,
      ps5: true,
      ps7: true,
      capabilityScore: 8,
      capabilities: [
        "SharePoint Sites",
        "M365 Groups",
        "Teams Members",
        "M365 Members",
        "Team Channels w/SP URL",
        "Power Apps",
        "Power Automate Flows",
        "Power BI Reports"
      ],
      notes: "Most comprehensive API across all Microsoft 365 services. Requires complex setup and permission configuration."
    },
    {
      name: "AzureAD",
      azureAppReq: false,
      ps5: true,
      ps7: false,
      capabilityScore: 2,
      capabilities: [
        "M365 Groups",
        "M365 Members"
      ],
      notes: "Legacy module (retiring March 2025). Basic group membership operations only. Works only in PowerShell 5."
    },
    {
      name: "Microsoft PowerApps",
      azureAppReq: false,
      ps5: true,
      ps7: false,
      capabilityScore: 2,
      capabilities: [
        "Power Apps",
        "Power Automate Flows"
      ],
      notes: "Focused exclusively on Power Apps and Power Automate flow management. Only works in PowerShell 5."
    },
    {
      name: "MicrosoftPowerBIMgmt",
      azureAppReq: false,
      ps5: true,
      ps7: true,
      capabilityScore: 1,
      capabilities: [
        "Power BI Reports"
      ],
      notes: "Specialized for Power BI administration. Works in both PowerShell 5 and 7."
    },
    {
      name: "Microsoft.Online.SharePoint.PowerShell",
      azureAppReq: false,
      ps5: true,
      ps7: true,
      capabilityScore: 1,
      capabilities: [
        "SharePoint Sites"
      ],
      notes: "Classic SharePoint Online management. Retrieves site collections but lacks Teams and M365 Groups integration."
    }
  ];

  const getRecommendations = () => {
    // Filter modules that don't require Azure App Registration
    const consultantFriendlyModules = modules.filter(m => !m.azureAppReq);
    
    return html`
      <div class="mt-8 p-6 bg-slate-50 rounded-lg">
        <h3 class="text-lg font-bold mb-3">Recommended Modules</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="p-4 border rounded-lg bg-white">
            <h4 class="font-bold text-blue-700">SharePoint Administration</h4>
            <p class="mt-2">
              <span class="font-semibold text-blue-800">PnP.PowerShell 1.12.0</span> without 
              Azure app registration is limited to SharePoint operations. For cross-service 
              capabilities, either enable app registration or use service-specific modules.
            </p>
          </div>
          <div class="p-4 border rounded-lg bg-white">
            <h4 class="font-bold text-green-700">Most Comprehensive</h4>
            <p class="mt-2">
              <span class="font-semibold text-green-800">Microsoft.Graph</span> offers 
              the most complete API across all Microsoft 365 services, but requires 
              Azure app registration and permission setup.
            </p>
          </div>
          <div class="p-4 border rounded-lg bg-white">
            <h4 class="font-bold text-purple-700">PowerShell 7 Only</h4>
            <p class="mt-2">
              <span class="font-semibold text-purple-800">PnP.PowerShell 3.x.x</span> is optimized for 
              PowerShell 7 with enhanced capabilities, but requires both PowerShell 7.4.6+ and Azure app registration.
            </p>
          </div>
          <div class="p-4 border rounded-lg bg-white">
            <h4 class="font-bold text-orange-700">Quick Service-Specific Tasks</h4>
            <p class="mt-2">
              Use specialized modules for single-service operations:
              <span class="block mt-1">• Teams: <span class="font-semibold">MicrosoftTeams</span></span>
              <span class="block">• Groups: <span class="font-semibold">ExchangeOnlineManagement</span></span>
              <span class="block">• Power BI: <span class="font-semibold">MicrosoftPowerBIMgmt</span></span>
            </p>
          </div>
        </div>
        
        <div class="mt-6 p-4 border-2 border-green-300 rounded-lg bg-green-50">
          <h4 class="font-bold text-green-800 mb-3">Best for IT Consultants - No Azure App Registration Required</h4>
          <p class="text-sm text-gray-700 mb-3">
            These modules work without Azure App Registration, making them ideal for IT consultants. 
            Getting Azure App registrations is often very challenging when working with clients.
          </p>
          <div class="space-y-2">
            ${consultantFriendlyModules.map(module => html`
              <div class="flex items-center justify-between p-2 bg-white rounded border border-green-200">
                <div class="flex items-center gap-2">
                  <span class="font-semibold text-sm">${module.name}</span>
                  ${module.name === 'AzureAD' && html`
                    <span class="text-xs font-bold text-red-600">(Retiring March 2025)</span>
                  `}
                </div>
                <div class="flex items-center gap-2">
                  <span class=${`text-xs px-2 py-1 rounded ${module.ps5 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
                    PS5 ${module.ps5 ? '✓' : '✗'}
                  </span>
                  <span class=${`text-xs px-2 py-1 rounded ${module.ps7 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                    PS7 ${module.ps7 ? '✓' : '✗'}
                  </span>
                </div>
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  };


  return html`
    <div class="container mx-auto p-4 font-sans">
      <h1 class="text-2xl font-bold mb-6 text-center">Microsoft 365 PowerShell Module Comparison</h1>
      
      <div class="mb-8">
        <h2 class="text-xl font-bold mb-4">Capability Overview</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          ${modules.map((module, idx) => html`
              <div key=${idx} class=${`border rounded-lg overflow-hidden ${module.azureAppReq ? 'border-amber-300' : 'border-gray-200'}`}>
                <div class=${`p-4 ${module.azureAppReq ? 'bg-amber-50' : 'bg-white'}`}>
                  <div class="flex justify-between items-start">
                    <h3 class="font-bold text-lg">${module.name}</h3>
                    <div class="flex">
                      <span class=${`text-xs font-bold px-2 py-1 rounded ${module.ps5 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'} mr-1`}>
                        PS5
                      </span>
                      <span class=${`text-xs font-bold px-2 py-1 rounded ${module.ps7 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        PS7
                      </span>
                    </div>
                  </div>
                  
                  ${module.azureAppReq && html`
                    <div class="text-amber-700 text-sm font-semibold mt-1">
                      Requires Azure App Registration
                    </div>
                  `}
                  
                  <div class="mt-3">
                    <div class="flex justify-between items-center mb-1">
                      <span class="text-sm font-medium">Capability Score</span>
                      <span class="text-sm font-bold">${module.capabilityScore}/8</span>
                    </div>
                    <div class="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        class=${`h-full rounded-full ${
                          module.capabilityScore > 6 ? 'bg-green-500' : 
                          module.capabilityScore > 4 ? 'bg-blue-500' : 
                          module.capabilityScore > 2 ? 'bg-yellow-500' : 'bg-red-500'
                        }`} 
                        style=${{ width: `${(module.capabilityScore / 8) * 100}%` }}>
                      </div>
                    </div>
                  </div>
                  
                  <div class="mt-3 text-sm text-gray-600">
                    ${module.notes}
                  </div>
                </div>
                
                <div class="bg-gray-50 p-4 border-t">
                  <h4 class="text-sm font-semibold mb-2">Supported Operations</h4>
                  <div class="flex flex-wrap gap-2">
                    ${module.capabilities.map((cap, capIdx) => html`
                      <span key=${capIdx} class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        ${cap}
                      </span>
                    `)}
                  </div>
                </div>
              </div>
            `)}
        </div>
      </div>
      
      ${getRecommendations()}

      <div class="mt-8 text-sm text-gray-600">
        <h3 class="font-bold mb-2">Key Takeaways</h3>
        <ul class="list-disc pl-5 space-y-2">
          <li>No single module supports everything - choose based on your specific needs</li>
          <li>PnP.PowerShell 1.12.0 without Azure app registration is limited to SharePoint operations</li>
          <li>Microsoft.Graph is the most comprehensive but requires more setup</li>
          <li>For simplicity, specialized modules may be easier for specific tasks</li>
          <li>PowerShell 7 compatibility varies between modules</li>
        </ul>
      </div>
    </div>
  `;
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ModuleComparison));
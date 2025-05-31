// Import HTM and bind it to React.createElement
import htm from 'https://unpkg.com/htm?module';
const html = htm.bind(React.createElement);

const ModuleComparison = () => {
  const [expandedModules, setExpandedModules] = React.useState({});

  const toggleExpanded = (moduleName) => {
    setExpandedModules(prev => ({
      ...prev,
      [moduleName]: !prev[moduleName]
    }));
  };

  const modules = [
    {
      name: "ExchangeOnlineManagement",
      azureAppReq: false,
      ps5: true,
      ps7: true,
      capabilityScore: 5,
      capabilities: [
        "M365 Groups",
        "M365 Members"
      ],
      specializations: ["Exchange", "Mailboxes", "Groups", "Users"],
      notes: "Primary focus on email and group management. Can retrieve M365 Group info and members with Get-UnifiedGroup and Get-UnifiedGroupLinks.",
      installCmd: `Install-Module -Name ExchangeOnlineManagement -Scope CurrentUser
Import-Module ExchangeOnlineManagement`,
      authCmd: `Connect-ExchangeOnline -UserPrincipalName user@domain.com`,
      cmdletUrl: "https://learn.microsoft.com/en-us/powershell/module/exchange/?view=exchange-ps"
    },
    {
      name: "MicrosoftTeams",
      azureAppReq: false,
      ps5: true,
      ps7: true,
      capabilityScore: 5,
      capabilities: [
        "M365 Groups",
        "Teams Members",
        "M365 Members",
        "Team Management"
      ],
      specializations: ["Teams"],
      notes: "Excellent for Teams management. Retrieves Teams-enabled M365 groups with Get-Team and team members with Get-TeamUser.",
      installCmd: `Install-Module -Name MicrosoftTeams -Force -AllowClobber -Scope CurrentUser`,
      authCmd: `Connect-MicrosoftTeams`,
      cmdletUrl: "https://learn.microsoft.com/en-us/powershell/module/teams/?view=teams-ps"
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
      specializations: ["SharePoint", "SharePoint sites (low-level)", "OneDrive"],
      notes: "Without Azure app registration, limited to SharePoint operations only. Cannot access M365 Groups, Teams, or Power Platform features.",
      installCmd: `Install-Module -Name PnP.PowerShell -Scope CurrentUser -AllowClobber -RequiredVersion 1.12.0 -Force`,
      authCmd: `Connect-PnPOnline -Url https://contoso.sharepoint.com -UseWebLogin`,
      cmdletUrl: "https://pnp.github.io/powershell/cmdlets/"
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
      specializations: ["SharePoint", "Teams", "Groups", "OneDrive"],
      notes: "Requires Azure app registration with certificate authentication (not secret) and PowerShell 7.4.6+. Certificate sharing between IT consultants on the same project is challenging.",
      installCmd: `Install-Module -Name PnP.PowerShell -Scope CurrentUser -AllowClobber`,
      authCmd: `# Requires Azure App Registration with Certificate
Connect-PnPOnline -Url https://[yourtenant].sharepoint.com -ClientId <client id of your Entra ID Application Registration> -Tenant <tenant>.onmicrosoft.com -Thumbprint <thumbprint from certificate>`,
      cmdletUrl: "https://pnp.github.io/powershell/cmdlets/"
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
      specializations: ["Everything"],
      notes: "Most comprehensive API across all Microsoft 365 services. Warning: Very slow import times and bloated with so many cmdlets that they don't fully load due to sheer numbers. Requires complex setup and permission configuration.",
      installCmd: `Install-Module -Name Microsoft.Graph -Scope CurrentUser -AllowClobber
Import-Module Microsoft.Graph`,
      authCmd: `Connect-MgGraph -Scopes "Group.Read.All", "User.Read.All", "Directory.Read.All", "Sites.Read.All", "Sites.ReadWrite.All"`,
      cmdletUrls: [
        { name: "Users", url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.users/?view=graph-powershell-1.0" },
        { name: "Teams", url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.teams/?view=graph-powershell-1.0" },
        { name: "Sites", url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.sites/?view=graph-powershell-1.0" },
        { name: "Mail", url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.mail/?view=graph-powershell-1.0" },
        { name: "Groups", url: "https://learn.microsoft.com/en-us/powershell/module/microsoft.graph.groups/?view=graph-powershell-1.0" }
      ]
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
      specializations: ["Users", "Groups", "Licenses"],
      notes: "Legacy module (retiring March 2025). Basic group membership operations only. Works only in PowerShell 5.",
      installCmd: `Install-Module AzureAD -Scope CurrentUser
Import-Module AzureAD -Scope CurrentUser`,
      authCmd: `Connect-AzureAD -AccountId user@contoso.com`,
      cmdletUrl: "https://learn.microsoft.com/en-us/powershell/microsoftgraph/azuread-msoline-cmdlet-map?view=graph-powershell-1.0&pivots=azure-ad-powershell"
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
      specializations: ["Power Apps", "Flows"],
      notes: "Focused exclusively on Power Apps and Power Automate flow management. Only works in PowerShell 5.",
      installCmd: `Install-Module -Name Microsoft.PowerApps.Administration.PowerShell -Scope CurrentUser
Install-Module -Name Microsoft.PowerApps.PowerShell -AllowClobber -Scope CurrentUser`,
      authCmd: `Add-PowerAppsAccount`,
      cmdletUrl: "https://learn.microsoft.com/en-us/powershell/module/microsoft.powerapps.administration.powershell/?view=pa-ps-latest"
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
      specializations: ["Power BI", "Reports", "Dashboards"],
      notes: "Specialized for Power BI administration. Works in both PowerShell 5 and 7.",
      installCmd: `Install-Module -Name MicrosoftPowerBIMgmt -Scope CurrentUser`,
      authCmd: `Connect-PowerBIServiceAccount`,
      cmdletUrls: [
        { name: "Connections", url: "https://learn.microsoft.com/en-us/powershell/module/microsoftpowerbimgmt.profile/?view=powerbi-ps" },
        { name: "Admin", url: "https://learn.microsoft.com/en-us/powershell/module/microsoftpowerbimgmt.admin/?view=powerbi-ps" },
        { name: "Workspaces", url: "https://learn.microsoft.com/en-us/powershell/module/microsoftpowerbimgmt.workspaces/?view=powerbi-ps" },
        { name: "Reports", url: "https://learn.microsoft.com/en-us/powershell/module/microsoftpowerbimgmt.reports/?view=powerbi-ps" },
        { name: "Data", url: "https://learn.microsoft.com/en-us/powershell/module/microsoftpowerbimgmt.data/?view=powerbi-ps" }
      ]
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
      specializations: ["SharePoint tenant", "SharePoint sites (high-level)"],
      notes: "Classic SharePoint Online management. Retrieves site collections but lacks Teams and M365 Groups integration.",
      installCmd: `Install-Module Microsoft.Online.SharePoint.PowerShell -Scope CurrentUser -AllowClobber`,
      authCmd: `Connect-SPOService -Url https://contoso-admin.sharepoint.com`,
      cmdletUrl: "https://learn.microsoft.com/en-us/powershell/module/sharepoint-online/?view=sharepoint-ps"
    }
  ];

  const getRecommendations = () => {
    // Filter modules that don't require Azure App Registration
    const consultantFriendlyModules = modules.filter(m => !m.azureAppReq);
    // Filter modules that require Azure App Registration
    const azureAppRequiredModules = modules.filter(m => m.azureAppReq);
    
    return html`
      <div class="mt-8">
        <div class="p-4 border-2 border-green-300 rounded-lg bg-green-50">
          <h4 class="font-bold text-green-800 mb-3">Best for IT Consultants - No Azure App Registration Required</h4>
          <p class="text-sm text-gray-700 mb-3">
            These modules work without Azure App Registration, making them ideal for IT consultants. 
            Getting Azure App registrations is often very challenging when working with clients.
          </p>
          <div class="space-y-2">
            ${consultantFriendlyModules.map(module => html`
              <div class="bg-white rounded border border-green-200 overflow-hidden">
                <button
                  onClick=${() => toggleExpanded(`consultant-${module.name}`)}
                  class="w-full p-3 hover:bg-green-50 transition-colors"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <span class="font-semibold text-sm">${module.name}</span>
                        ${module.name === 'AzureAD' && html`
                          <span class="text-xs font-bold text-red-600">(Retiring March 2025)</span>
                        `}
                      </div>
                      <div class="flex flex-wrap gap-1">
                        ${module.specializations && module.specializations.map((spec, idx) => html`
                          <span key=${idx} class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                            ${spec}
                          </span>
                        `)}
                      </div>
                    </div>
                    <div class="flex items-center gap-2 ml-4">
                      <span class=${`text-xs px-2 py-1 rounded ${module.ps5 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
                        PS5 ${module.ps5 ? '✓' : '✗'}
                      </span>
                      <span class=${`text-xs px-2 py-1 rounded ${module.ps7 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        PS7 ${module.ps7 ? '✓' : '✗'}
                      </span>
                      <span class="ml-2 text-gray-400">${expandedModules[`consultant-${module.name}`] ? '−' : '+'}</span>
                    </div>
                  </div>
                </button>
                
                ${expandedModules[`consultant-${module.name}`] && html`
                  <div class="p-4 bg-gray-50 border-t border-green-200">
                    <div class="grid gap-4">
                      <div>
                        <h5 class="text-xs font-semibold text-gray-700 mb-1">Capabilities:</h5>
                        <div class="flex flex-wrap gap-1">
                          ${module.capabilities.map((cap, idx) => html`
                            <span key=${idx} class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                              ${cap}
                            </span>
                          `)}
                        </div>
                      </div>
                      
                      <div>
                        <h5 class="text-xs font-semibold text-gray-700 mb-1">Installation:</h5>
                        <pre class="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                          <code>${module.installCmd}</code>
                        </pre>
                      </div>
                      
                      <div>
                        <h5 class="text-xs font-semibold text-gray-700 mb-1">Connect Command:</h5>
                        <pre class="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                          <code>${module.authCmd}</code>
                        </pre>
                      </div>
                      
                      <div>
                        <h5 class="text-xs font-semibold text-gray-700 mb-1">Documentation:</h5>
                        ${module.cmdletUrls ? html`
                          <div class="space-y-1">
                            ${module.cmdletUrls.map((cmdlet, idx) => html`
                              <a key=${idx} href=${cmdlet.url} target="_blank" rel="noopener noreferrer" 
                                 class="block text-xs text-blue-600 hover:text-blue-800 underline">
                                ${cmdlet.name} Cmdlets →
                              </a>
                            `)}
                          </div>
                        ` : module.cmdletUrl ? html`
                          <a href=${module.cmdletUrl} target="_blank" rel="noopener noreferrer" 
                             class="text-xs text-blue-600 hover:text-blue-800 underline">
                            View Cmdlet Documentation →
                          </a>
                        ` : html`
                          <span class="text-xs text-gray-500">No documentation available</span>
                        `}
                      </div>
                      
                      <div class="text-xs text-gray-600 italic">
                        ${module.notes}
                      </div>
                    </div>
                  </div>
                `}
              </div>
            `)}
          </div>
        </div>
        
        <div class="mt-6 p-4 border-2 border-amber-300 rounded-lg bg-amber-50">
          <h4 class="font-bold text-amber-800 mb-3">Advanced Modules - Azure App Registration Required</h4>
          <p class="text-sm text-gray-700 mb-3">
            <strong>When to use:</strong> Best for large, long-lasting projects where PIM gets in the way and you need automation.<br/>
            <strong>When to avoid:</strong> For smaller projects or when you run PowerShell rarely - the setup effort isn't worth it.
          </p>
          <div class="bg-white p-3 rounded border border-amber-200 mb-3">
            <h5 class="text-sm font-semibold text-gray-800 mb-2">🔑 Authentication Benefits:</h5>
            <ul class="text-xs text-gray-700 space-y-1">
              <li class="flex items-start">
                <span class="text-green-600 mr-1">✓</span>
                <span><strong>Unattended execution:</strong> Client App authentication runs without browser pop-ups for OAuth</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 mr-1">✓</span>
                <span><strong>No PIM hassles:</strong> Unlike user authentication with PIM, no need to request admin roles each time</span>
              </li>
              <li class="flex items-start">
                <span class="text-green-600 mr-1">✓</span>
                <span><strong>Automation-friendly:</strong> Perfect for scheduled tasks and CI/CD pipelines</span>
              </li>
            </ul>
          </div>
          <div class="space-y-2">
            ${azureAppRequiredModules.map(module => html`
              <div class="bg-white rounded border border-amber-200 overflow-hidden">
                <button
                  onClick=${() => toggleExpanded(`azure-${module.name}`)}
                  class="w-full p-3 hover:bg-amber-50 transition-colors"
                >
                  <div class="flex items-start justify-between">
                    <div class="flex-1">
                      <div class="flex items-center gap-2 mb-2">
                        <span class="font-semibold text-sm">${module.name}</span>
                        <span class="text-xs font-semibold text-amber-700">⚠️ Azure App Required</span>
                      </div>
                      <div class="flex flex-wrap gap-1">
                        ${module.specializations && module.specializations.map((spec, idx) => html`
                          <span key=${idx} class="px-2 py-0.5 bg-gray-100 text-gray-700 text-xs rounded-full">
                            ${spec}
                          </span>
                        `)}
                      </div>
                    </div>
                    <div class="flex items-center gap-2 ml-4">
                      <span class=${`text-xs px-2 py-1 rounded ${module.ps5 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-500'}`}>
                        PS5 ${module.ps5 ? '✓' : '✗'}
                      </span>
                      <span class=${`text-xs px-2 py-1 rounded ${module.ps7 ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-500'}`}>
                        PS7 ${module.ps7 ? '✓' : '✗'}
                      </span>
                      <span class="ml-2 text-gray-400">${expandedModules[`azure-${module.name}`] ? '−' : '+'}</span>
                    </div>
                  </div>
                </button>
                
                ${expandedModules[`azure-${module.name}`] && html`
                  <div class="p-4 bg-gray-50 border-t border-amber-200">
                    <div class="grid gap-4">
                      <div class="p-3 bg-amber-100 border border-amber-300 rounded">
                        <h5 class="text-xs font-semibold text-amber-800 mb-1">⚠️ Prerequisites:</h5>
                        <ul class="text-xs text-amber-700 space-y-1">
                          <li>• Azure AD App Registration</li>
                          <li>• Admin consent for API permissions</li>
                          <li>• Client ID and Tenant ID</li>
                          ${module.name === 'PnP.PowerShell 3.x.x' && html`
                            <li>• PowerShell 7.4.6 or higher</li>
                            <li>• Certificate authentication (secrets not supported)</li>
                            <li>• Certificate must be shared with team members</li>
                          `}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 class="text-xs font-semibold text-gray-700 mb-1">Capabilities:</h5>
                        <div class="flex flex-wrap gap-1">
                          ${module.capabilities.map((cap, idx) => html`
                            <span key=${idx} class="px-2 py-1 bg-amber-100 text-amber-700 text-xs rounded-full">
                              ${cap}
                            </span>
                          `)}
                        </div>
                      </div>
                      
                      <div>
                        <h5 class="text-xs font-semibold text-gray-700 mb-1">Installation:</h5>
                        <pre class="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                          <code>${module.installCmd}</code>
                        </pre>
                      </div>
                      
                      <div>
                        <h5 class="text-xs font-semibold text-gray-700 mb-1">Authentication:</h5>
                        <pre class="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                          <code>${module.authCmd}</code>
                        </pre>
                      </div>
                      
                      <div>
                        <h5 class="text-xs font-semibold text-gray-700 mb-1">Documentation:</h5>
                        ${module.cmdletUrls ? html`
                          <div class="space-y-1">
                            ${module.cmdletUrls.map((cmdlet, idx) => html`
                              <a key=${idx} href=${cmdlet.url} target="_blank" rel="noopener noreferrer" 
                                 class="block text-xs text-blue-600 hover:text-blue-800 underline">
                                ${cmdlet.name} Cmdlets →
                              </a>
                            `)}
                          </div>
                        ` : module.cmdletUrl ? html`
                          <a href=${module.cmdletUrl} target="_blank" rel="noopener noreferrer" 
                             class="text-xs text-blue-600 hover:text-blue-800 underline">
                            View Cmdlet Documentation →
                          </a>
                        ` : html`
                          <span class="text-xs text-gray-500">No documentation available</span>
                        `}
                      </div>
                      
                      <div class="text-xs text-gray-600 italic">
                        ${module.notes}
                      </div>
                    </div>
                  </div>
                `}
              </div>
            `)}
          </div>
        </div>
      </div>
    `;
  };


  return html`
    <div class="container mx-auto p-4 font-sans">
      <h1 class="text-2xl font-bold mb-6 text-center">Microsoft 365 PowerShell Modules: Reference Guide for Busy IT Consultants</h1>
      
      ${getRecommendations()}

      <div class="mt-8 mb-8">
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
                  <h4 class="text-sm font-semibold mb-2">Specialization Areas</h4>
                  <div class="flex flex-wrap gap-1 mb-3">
                    ${module.specializations && module.specializations.map((spec, idx) => html`
                      <span key=${idx} class="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full font-medium">
                        ${spec}
                      </span>
                    `)}
                  </div>
                  
                  <h4 class="text-sm font-semibold mb-2 mt-3 pt-3 border-t">Supported Operations</h4>
                  <div class="flex flex-wrap gap-2">
                    ${module.capabilities.map((cap, capIdx) => html`
                      <span key=${capIdx} class="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        ${cap}
                      </span>
                    `)}
                  </div>
                </div>
                
                <div class="border-t">
                  <button 
                    onClick=${() => toggleExpanded(module.name)}
                    class="w-full p-3 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  >
                    <span class="text-sm font-medium">Installation & Authentication</span>
                    <span class="text-gray-400">${expandedModules[module.name] ? '−' : '+'}</span>
                  </button>
                  
                  ${expandedModules[module.name] && html`
                    <div class="p-4 bg-gray-50 border-t">
                      <div class="mb-4">
                        <h5 class="text-xs font-semibold text-gray-700 mb-2">Install Commands:</h5>
                        <pre class="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                          <code>${module.installCmd}</code>
                        </pre>
                      </div>
                      
                      <div class="mb-4">
                        <h5 class="text-xs font-semibold text-gray-700 mb-2">Authentication:</h5>
                        <pre class="bg-gray-800 text-gray-100 p-2 rounded text-xs overflow-x-auto">
                          <code>${module.authCmd}</code>
                        </pre>
                      </div>
                      
                      <div>
                        <h5 class="text-xs font-semibold text-gray-700 mb-2">Cmdlet Reference:</h5>
                        ${module.cmdletUrls ? html`
                          <div class="space-y-1">
                            ${module.cmdletUrls.map((cmdlet, idx) => html`
                              <a key=${idx} href=${cmdlet.url} target="_blank" rel="noopener noreferrer" 
                                 class="block text-xs text-blue-600 hover:text-blue-800 underline">
                                ${cmdlet.name} Cmdlets →
                              </a>
                            `)}
                          </div>
                        ` : module.cmdletUrl ? html`
                          <a href=${module.cmdletUrl} target="_blank" rel="noopener noreferrer" 
                             class="text-xs text-blue-600 hover:text-blue-800 underline">
                            View Cmdlet Documentation →
                          </a>
                        ` : html`
                          <span class="text-xs text-gray-500">No documentation available</span>
                        `}
                      </div>
                    </div>
                  `}
                </div>
              </div>
            `)}
        </div>
      </div>

      <div class="mt-8 bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 rounded-xl shadow-lg p-6 border border-purple-200">
        <div class="flex items-center mb-4">
          <div class="p-2 bg-purple-600 rounded-lg mr-3">
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Key Takeaways</h3>
        </div>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-purple-100">
            <div class="flex items-start">
              <span class="text-purple-500 mr-2 text-lg">•</span>
              <div>
                <h4 class="font-semibold text-gray-800 mb-1">For IT Consultants</h4>
                <p class="text-sm text-gray-600">Avoid modules requiring Azure App Registration when working with clients - authentication setup can be a major roadblock</p>
              </div>
            </div>
          </div>
          <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-purple-100">
            <div class="flex items-start">
              <span class="text-pink-500 mr-2 text-lg">•</span>
              <div>
                <h4 class="font-semibold text-gray-800 mb-1">Module Selection Strategy</h4>
                <p class="text-sm text-gray-600">Use specialized modules (Teams, Exchange) for quick tasks; Microsoft.Graph for comprehensive automation</p>
              </div>
            </div>
          </div>
          <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-purple-100">
            <div class="flex items-start">
              <span class="text-indigo-500 mr-2 text-lg">•</span>
              <div>
                <h4 class="font-semibold text-gray-800 mb-1">PowerShell 7 Limitations</h4>
                <p class="text-sm text-gray-600">PS7 doesn't work in PowerShell ISE (requires VS Code), has compatibility issues with PS5 modules, and switching between versions is painful</p>
              </div>
            </div>
          </div>
          <div class="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-purple-100">
            <div class="flex items-start">
              <span class="text-red-500 mr-2 text-lg">•</span>
              <div>
                <h4 class="font-semibold text-gray-800 mb-1">Deprecation Warning</h4>
                <p class="text-sm text-gray-600">AzureAD module retires March 2025 - migrate to Microsoft.Graph for directory operations</p>
              </div>
            </div>
          </div>
        </div>
        <div class="mt-4 p-3 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
          <p class="text-sm text-blue-800 font-medium">
            💡 <span class="font-semibold">Pro Tip:</span> Start with ExchangeOnlineManagement, MicrosoftTeams, Microsoft.Online.SharePoint.PowerShell, or PnP.PowerShell 1.12.0 for immediate productivity without complex setup
          </p>
        </div>
      </div>
    </div>
  `;
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(ModuleComparison));
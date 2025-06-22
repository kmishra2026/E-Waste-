// Global variables
let currentPage = "dashboard"
let sidebarCollapsed = false
let userData = {
  name: "Rajesh Kumar",
  email: "rajesh.kumar@email.com",
  phone: "+91 98765 43210",
  city: "Mumbai",
  state: "Maharashtra",
  devices: [],
  collections: [],
  achievements: [],
}

// Initialize the application
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  setupEventListeners()
  loadUserData()
})

// Initialize application
function initializeApp() {
  // Set minimum date for collection booking to today
  const today = new Date().toISOString().split("T")[0]
  const dateInput = document.getElementById("preferredDate")
  if (dateInput) {
    dateInput.min = today
  }

  // Initialize charts if on statistics page
  if (currentPage === "statistics") {
    initializeCharts()
  }

  // Load saved preferences
  loadUserPreferences()
}

// Setup event listeners
function setupEventListeners() {
  // Sidebar toggle
  const sidebarToggle = document.getElementById("sidebarToggle")
  if (sidebarToggle) {
    sidebarToggle.addEventListener("click", toggleSidebar)
  }

  // Form submissions
  const collectionForm = document.getElementById("collectionForm")
  if (collectionForm) {
    collectionForm.addEventListener("submit", handleCollectionSubmission)
  }

  const addDeviceForm = document.getElementById("addDeviceForm")
  if (addDeviceForm) {
    addDeviceForm.addEventListener("submit", handleAddDevice)
  }

  const personalInfoForm = document.getElementById("personalInfoForm")
  if (personalInfoForm) {
    personalInfoForm.addEventListener("submit", handlePersonalInfoUpdate)
  }

  const preferencesForm = document.getElementById("preferencesForm")
  if (preferencesForm) {
    preferencesForm.addEventListener("submit", handlePreferencesUpdate)
  }

  // Window resize handler
  window.addEventListener("resize", handleWindowResize)

  // Keyboard shortcuts
  document.addEventListener("keydown", handleKeyboardShortcuts)
}

// Load page content
function loadPage(pageName) {
  // Update active menu item
  document.querySelectorAll(".menu-item").forEach((item) => {
    item.classList.remove("active")
  })

  event.target.closest(".menu-item").classList.add("active")

  // Update page title
  const pageTitle = document.getElementById("pageTitle")
  const mainContent = document.getElementById("mainContent")

  currentPage = pageName

  // Show loading state
  mainContent.classList.add("loading")

  // Simulate loading delay for better UX
  setTimeout(() => {
    switch (pageName) {
      case "dashboard":
        pageTitle.textContent = "Dashboard"
        loadDashboard()
        break
      case "collection":
        pageTitle.textContent = "Book Collection"
        loadCollectionPage()
        break
      case "centers":
        pageTitle.textContent = "Recycling Centers"
        loadCentersPage()
        break
      case "tracker":
        pageTitle.textContent = "Device Tracker"
        loadTrackerPage()
        break
      case "education":
        pageTitle.textContent = "Learn About E-Waste"
        loadEducationPage()
        break
      case "statistics":
        pageTitle.textContent = "Statistics & Impact"
        loadStatisticsPage()
        break
      case "profile":
        pageTitle.textContent = "Profile Settings"
        loadProfilePage()
        break
    }

    mainContent.classList.remove("loading")

    // Close sidebar on mobile after navigation
    if (window.innerWidth <= 1024) {
      closeSidebar()
    }
  }, 300)
}

// Load dashboard content
function loadDashboard() {
  const content = `
        <div class="dashboard-grid">
            <div class="stat-card">
                <div class="stat-icon green">
                    <i class="fas fa-recycle"></i>
                </div>
                <div class="stat-info">
                    <h3>2,450 kg</h3>
                    <p>E-Waste Recycled</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon blue">
                    <i class="fas fa-mobile-alt"></i>
                </div>
                <div class="stat-info">
                    <h3>1,234</h3>
                    <p>Devices Tracked</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon orange">
                    <i class="fas fa-truck"></i>
                </div>
                <div class="stat-info">
                    <h3>89</h3>
                    <p>Collections Booked</p>
                </div>
            </div>
            
            <div class="stat-card">
                <div class="stat-icon red">
                    <i class="fas fa-leaf"></i>
                </div>
                <div class="stat-info">
                    <h3>15.2 tons</h3>
                    <p>CO₂ Saved</p>
                </div>
            </div>
        </div>

        <div class="dashboard-content">
            <div class="recent-activity">
                <h2>Recent Activity</h2>
                <div class="activity-list">
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-check-circle"></i>
                        </div>
                        <div class="activity-details">
                            <p><strong>Collection Completed</strong></p>
                            <p>5 devices collected from Mumbai, Maharashtra</p>
                            <span class="activity-time">2 hours ago</span>
                        </div>
                    </div>
                    
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-plus-circle"></i>
                        </div>
                        <div class="activity-details">
                            <p><strong>New Device Added</strong></p>
                            <p>iPhone 12 added to device tracker</p>
                            <span class="activity-time">1 day ago</span>
                        </div>
                    </div>
                    
                    <div class="activity-item">
                        <div class="activity-icon">
                            <i class="fas fa-recycle"></i>
                        </div>
                        <div class="activity-details">
                            <p><strong>Recycling Completed</strong></p>
                            <p>Old laptop successfully recycled</p>
                            <span class="activity-time">3 days ago</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="quick-actions">
                <h2>Quick Actions</h2>
                <div class="action-buttons">
                    <button class="action-btn primary" onclick="loadPage('collection')">
                        <i class="fas fa-truck"></i>
                        Book Collection
                    </button>
                    <button class="action-btn secondary" onclick="loadPage('tracker')">
                        <i class="fas fa-plus"></i>
                        Add Device
                    </button>
                    <button class="action-btn tertiary" onclick="loadPage('centers')">
                        <i class="fas fa-map"></i>
                        Find Centers
                    </button>
                </div>
            </div>
        </div>
    `

  document.getElementById("mainContent").innerHTML = content
}

// Load collection page
function loadCollectionPage() {
  fetch("collection.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("mainContent").innerHTML = html
      setupCollectionForm()
    })
    .catch((error) => {
      console.error("Error loading collection page:", error)
      document.getElementById("mainContent").innerHTML = "<p>Error loading page. Please try again.</p>"
    })
}

// Load centers page
function loadCentersPage() {
  fetch("centers.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("mainContent").innerHTML = html
      setupCentersPage()
    })
    .catch((error) => {
      console.error("Error loading centers page:", error)
      document.getElementById("mainContent").innerHTML = "<p>Error loading page. Please try again.</p>"
    })
}

// Load tracker page
function loadTrackerPage() {
  fetch("tracker.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("mainContent").innerHTML = html
      setupTrackerPage()
    })
    .catch((error) => {
      console.error("Error loading tracker page:", error)
      document.getElementById("mainContent").innerHTML = "<p>Error loading page. Please try again.</p>"
    })
}

// Load education page
function loadEducationPage() {
  fetch("education.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("mainContent").innerHTML = html
      setupEducationPage()
    })
    .catch((error) => {
      console.error("Error loading education page:", error)
      document.getElementById("mainContent").innerHTML = "<p>Error loading page. Please try again.</p>"
    })
}

// Load statistics page
function loadStatisticsPage() {
  fetch("statistics.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("mainContent").innerHTML = html
      setupStatisticsPage()
    })
    .catch((error) => {
      console.error("Error loading statistics page:", error)
      document.getElementById("mainContent").innerHTML = "<p>Error loading page. Please try again.</p>"
    })
}

// Load profile page
function loadProfilePage() {
  fetch("profile.html")
    .then((response) => response.text())
    .then((html) => {
      document.getElementById("mainContent").innerHTML = html
      setupProfilePage()
    })
    .catch((error) => {
      console.error("Error loading profile page:", error)
      document.getElementById("mainContent").innerHTML = "<p>Error loading page. Please try again.</p>"
    })
}

// Setup collection form
function setupCollectionForm() {
  const form = document.getElementById("collectionForm")
  if (form) {
    form.addEventListener("submit", handleCollectionSubmission)
  }

  // Set minimum date to today
  const dateInput = document.getElementById("preferredDate")
  if (dateInput) {
    const today = new Date().toISOString().split("T")[0]
    dateInput.min = today
  }
}

// Setup centers page
function setupCentersPage() {
  // Add search functionality
  const searchInput = document.getElementById("locationSearch")
  if (searchInput) {
    searchInput.addEventListener("input", debounce(searchCenters, 300))
  }
}

// Setup tracker page
function setupTrackerPage() {
  // Add event listeners for device actions
  document.querySelectorAll('[onclick^="updateDevice"]').forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()
      const deviceId = this.getAttribute("onclick").match(/'([^']+)'/)[1]
      updateDevice(deviceId)
    })
  })

  document.querySelectorAll('[onclick^="scheduleDisposal"]').forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault()
      const deviceId = this.getAttribute("onclick").match(/'([^']+)'/)[1]
      scheduleDisposal(deviceId)
    })
  })
}

// Setup education page
function setupEducationPage() {
  // Add topic selection functionality
  document.querySelectorAll(".topic-card").forEach((card) => {
    card.addEventListener("click", function () {
      const topic = this.getAttribute("onclick").match(/'([^']+)'/)[1]
      showTopic(topic)
    })
  })
}

// Setup statistics page
function setupStatisticsPage() {
  // Add filter functionality
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filter-btn").forEach((b) => b.classList.remove("active"))
      this.classList.add("active")
      const period = this.textContent.toLowerCase().replace("this ", "").replace(" ", "")
      filterStats(period)
    })
  })

  // Initialize charts
  setTimeout(initializeCharts, 100)
}

// Setup profile page
function setupProfilePage() {
  // Add tab functionality
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      const tabName = this.getAttribute("onclick").match(/'([^']+)'/)[1]
      showTab(tabName)
    })
  })

  // Load user data into forms
  loadUserDataIntoForms()
}

// Handle collection form submission
function handleCollectionSubmission(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const collectionData = {
    fullName: formData.get("fullName"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    address: formData.get("address"),
    city: formData.get("city"),
    pincode: formData.get("pincode"),
    devices: formData.getAll("devices"),
    quantity: formData.get("quantity"),
    preferredDate: formData.get("preferredDate"),
    preferredTime: formData.get("preferredTime"),
    specialInstructions: formData.get("specialInstructions"),
  }

  // Validate required fields
  if (
    !collectionData.fullName ||
    !collectionData.phone ||
    !collectionData.address ||
    !collectionData.city ||
    !collectionData.pincode ||
    collectionData.devices.length === 0 ||
    !collectionData.preferredDate ||
    !collectionData.preferredTime
  ) {
    showNotification("Please fill in all required fields", "error")
    return
  }

  // Show loading state
  const submitBtn = event.target.querySelector('button[type="submit"]')
  const originalText = submitBtn.innerHTML
  submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Scheduling...'
  submitBtn.disabled = true

  // Simulate API call
  setTimeout(() => {
    // Generate collection ID
    const collectionId =
      "COL-" +
      new Date().getFullYear() +
      "-" +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      String(new Date().getDate()).padStart(2, "0") +
      "-" +
      String(Math.floor(Math.random() * 1000)).padStart(3, "0")

    // Save collection data
    userData.collections.push({
      id: collectionId,
      ...collectionData,
      status: "scheduled",
      createdAt: new Date().toISOString(),
    })

    saveUserData()

    // Reset form
    event.target.reset()

    // Show success message
    showNotification(`Collection scheduled successfully! Your collection ID is ${collectionId}`, "success")

    // Reset button
    submitBtn.innerHTML = originalText
    submitBtn.disabled = false

    // Redirect to dashboard after 3 seconds
    setTimeout(() => {
      loadPage("dashboard")
    }, 3000)
  }, 2000)
}

// Handle add device form submission
function handleAddDevice(event) {
  event.preventDefault()

  const formData = new FormData(event.target)
  const deviceData = {
    id: "device-" + Date.now(),
    type: formData.get("deviceType"),
    brand: formData.get("deviceBrand"),
    model: formData.get("deviceModel"),
    purchaseDate: formData.get("purchaseDate"),
    purchasePrice: formData.get("purchasePrice"),
    condition: formData.get("deviceCondition"),
    notes: formData.get("deviceNotes"),
    status: "active",
    createdAt: new Date().toISOString(),
  }

  // Add device to user data
  userData.devices.push(deviceData)
  saveUserData()

  // Close modal
  closeAddDeviceModal()

  // Show success message
  showNotification("Device added successfully!", "success")

  // Refresh tracker page if currently viewing
  if (currentPage === "tracker") {
    loadTrackerPage()
  }
}

// Handle personal info update
function handlePersonalInfoUpdate(event) {
  event.preventDefault()

  const formData = new FormData(event.target)

  // Update user data
  userData.name = formData.get("firstName") + " " + formData.get("lastName")
  userData.email = formData.get("email")
  userData.phone = formData.get("phone")
  userData.dateOfBirth = formData.get("dateOfBirth")
  userData.address = formData.get("address")
  userData.city = formData.get("city")
  userData.state = formData.get("state")
  userData.pincode = formData.get("pincode")

  saveUserData()

  // Update header
  document.getElementById("userName").textContent = userData.name

  showNotification("Profile updated successfully!", "success")
}

// Handle preferences update
function handlePreferencesUpdate(event) {
  event.preventDefault()

  const formData = new FormData(event.target)

  // Update preferences
  userData.preferences = {
    notifications: formData.getAll("notifications"),
    privacy: formData.getAll("privacy"),
    language: formData.get("language"),
    timezone: formData.get("timezone"),
  }

  saveUserData()

  showNotification("Preferences updated successfully!", "success")
}

// Sidebar functions
function toggleSidebar() {
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.querySelector(".main-content")

  if (window.innerWidth <= 1024) {
    sidebar.classList.toggle("show")
  } else {
    sidebar.classList.toggle("collapsed")
    mainContent.classList.toggle("expanded")
  }

  sidebarCollapsed = !sidebarCollapsed
}

function closeSidebar() {
  const sidebar = document.getElementById("sidebar")
  const mainContent = document.querySelector(".main-content")

  if (window.innerWidth <= 1024) {
    sidebar.classList.remove("show")
  }
}

// Modal functions
function showAddDeviceModal() {
  const modal = document.getElementById("addDeviceModal")
  if (modal) {
    modal.classList.add("show")
    document.body.style.overflow = "hidden"
  }
}

function closeAddDeviceModal() {
  const modal = document.getElementById("addDeviceModal")
  if (modal) {
    modal.classList.remove("show")
    document.body.style.overflow = "auto"

    // Reset form
    const form = document.getElementById("addDeviceForm")
    if (form) {
      form.reset()
    }
  }
}

// Device management functions
function updateDevice(deviceId) {
  showNotification("Device update functionality coming soon!", "info")
}

function scheduleDisposal(deviceId) {
  if (confirm("Are you sure you want to schedule this device for disposal?")) {
    showNotification("Disposal scheduled successfully!", "success")

    // Update device status
    const device = userData.devices.find((d) => d.id === deviceId)
    if (device) {
      device.status = "scheduled_for_disposal"
      saveUserData()
    }
  }
}

function repairDevice(deviceId) {
  showNotification("Redirecting to repair services...", "info")
}

function viewCertificate(deviceId) {
  showNotification("Certificate viewer coming soon!", "info")
}

// Centers functions
function searchCenters() {
  const query = document.getElementById("locationSearch").value
  showNotification(`Searching for centers near "${query}"...`, "info")
}

function contactCenter(centerId) {
  showNotification("Opening contact information...", "info")
}

function getDirections(centerId) {
  showNotification("Opening directions in maps...", "info")
}

// Education functions
function showTopic(topicName) {
  const contentArea = document.getElementById("topicContent")
  if (!contentArea) return

  const topics = {
    basics: {
      title: "E-Waste Basics",
      content: `
                <h3>What is E-Waste?</h3>
                <p>Electronic waste, or e-waste, refers to discarded electrical or electronic devices. This includes computers, smartphones, televisions, refrigerators, and other electronic appliances that have reached the end of their useful life.</p>
                
                <h4>Common Types of E-Waste:</h4>
                <ul>
                    <li><strong>Information Technology Equipment:</strong> Computers, laptops, servers, printers</li>
                    <li><strong>Telecommunications Equipment:</strong> Mobile phones, landline phones, fax machines</li>
                    <li><strong>Consumer Electronics:</strong> TVs, radios, cameras, gaming consoles</li>
                    <li><strong>Home Appliances:</strong> Refrigerators, washing machines, air conditioners</li>
                    <li><strong>Lighting Equipment:</strong> LED bulbs, fluorescent lamps</li>
                </ul>
                
                <h4>Why is E-Waste a Growing Problem?</h4>
                <p>The rapid advancement of technology and decreasing device lifespans have led to an exponential increase in e-waste generation. India generates approximately 3.2 million tonnes of e-waste annually, making it the 5th largest e-waste producer globally.</p>
            `,
    },
    impact: {
      title: "Environmental Impact",
      content: `
                <h3>Environmental and Health Impacts of E-Waste</h3>
                <p>Improper disposal of e-waste poses serious threats to both environmental and human health due to the presence of toxic substances.</p>
                
                <h4>Toxic Substances in E-Waste:</h4>
                <ul>
                    <li><strong>Lead:</strong> Found in CRT monitors and solder, causes brain damage and kidney disease</li>
                    <li><strong>Mercury:</strong> Present in LCD screens and batteries, affects nervous system</li>
                    <li><strong>Cadmium:</strong> Used in batteries and semiconductors, causes cancer and kidney damage</li>
                    <li><strong>Chromium:</strong> Found in metal housings, causes skin irritation and lung cancer</li>
                    <li><strong>Brominated Flame Retardants:</strong> Used in plastic casings, disrupts hormones</li>
                </ul>
                
                <h4>Environmental Consequences:</h4>
                <ul>
                    <li>Soil contamination from landfill leaching</li>
                    <li>Water pollution affecting groundwater and surface water</li>
                    <li>Air pollution from informal burning practices</li>
                    <li>Ecosystem disruption and biodiversity loss</li>
                </ul>
                
                <h4>Health Impacts:</h4>
                <ul>
                    <li>Respiratory problems from toxic fumes</li>
                    <li>Neurological disorders from heavy metal exposure</li>
                    <li>Cancer risks from prolonged exposure</li>
                    <li>Reproductive health issues</li>
                </ul>
            `,
    },
    regulations: {
      title: "Indian E-Waste Regulations",
      content: `
                <h3>E-Waste Management Rules in India</h3>
                <p>India has implemented comprehensive e-waste management rules to address the growing e-waste crisis.</p>
                
                <h4>E-Waste Management Rules 2016 (Amended 2018):</h4>
                <ul>
                    <li><strong>Extended Producer Responsibility (EPR):</strong> Manufacturers responsible for collection and recycling</li>
                    <li><strong>Collection Targets:</strong> Specific targets for collection and recycling</li>
                    <li><strong>Authorized Dismantlers:</strong> Only certified facilities can process e-waste</li>
                    <li><strong>Consumer Responsibility:</strong> Consumers must dispose of e-waste through authorized channels</li>
                </ul>
                
                <h4>Key Provisions:</h4>
                <ul>
                    <li>Deposit Refund Scheme for certain products</li>
                    <li>Reduction of Hazardous Substances (RoHS) compliance</li>
                    <li>Mandatory registration for producers, recyclers, and refurbishers</li>
                    <li>Annual returns and compliance reporting</li>
                </ul>
                
                <h4>State Pollution Control Boards:</h4>
                <p>Each state has designated authorities to monitor and enforce e-waste management rules, issue authorizations, and ensure compliance.</p>
                
                <h4>Penalties:</h4>
                <p>Non-compliance with e-waste rules can result in fines, closure of operations, and legal action under the Environment Protection Act.</p>
            `,
    },
    recycling: {
      title: "E-Waste Recycling Process",
      content: `
                <h3>How E-Waste is Recycled</h3>
                <p>Proper e-waste recycling involves several stages to safely extract valuable materials while minimizing environmental impact.</p>
                
                <h4>Step 1: Collection and Transportation</h4>
                <ul>
                    <li>Collection from consumers, businesses, and institutions</li>
                    <li>Safe transportation to authorized recycling facilities</li>
                    <li>Proper documentation and tracking</li>
                </ul>
                
                <h4>Step 2: Sorting and Categorization</h4>
                <ul>
                    <li>Manual sorting by device type and material</li>
                    <li>Separation of hazardous components</li>
                    <li>Identification of reusable parts</li>
                </ul>
                
                <h4>Step 3: Data Destruction</h4>
                <ul>
                    <li>Secure data wiping from storage devices</li>
                    <li>Physical destruction of hard drives and memory</li>
                    <li>Certification of data destruction</li>
                </ul>
                
                <h4>Step 4: Dismantling</h4>
                <ul>
                    <li>Manual disassembly of devices</li>
                    <li>Removal of batteries and hazardous components</li>
                    <li>Separation of different materials</li>
                </ul>
                
                <h4>Step 5: Material Recovery</h4>
                <ul>
                    <li>Mechanical processing (shredding, magnetic separation)</li>
                    <li>Chemical processing for precious metals</li>
                    <li>Plastic and metal recovery</li>
                </ul>
                
                <h4>Step 6: Refining and Manufacturing</h4>
                <ul>
                    <li>Purification of recovered materials</li>
                    <li>Manufacturing of new products</li>
                    <li>Closing the circular economy loop</li>
                </ul>
            `,
    },
    tips: {
      title: "Best Practices for E-Waste Management",
      content: `
                <h3>Best Practices for Responsible E-Waste Management</h3>
                
                <h4>Before Disposal:</h4>
                <ul>
                    <li><strong>Extend Device Life:</strong> Regular maintenance and software updates</li>
                    <li><strong>Repair When Possible:</strong> Fix minor issues instead of replacing</li>
                    <li><strong>Upgrade Components:</strong> Replace parts instead of entire devices</li>
                    <li><strong>Donate or Sell:</strong> Give working devices a second life</li>
                </ul>
                
                <h4>Data Security:</h4>
                <ul>
                    <li>Back up important data before disposal</li>
                    <li>Perform factory reset on all devices</li>
                    <li>Remove or destroy storage devices if sensitive</li>
                    <li>Use data wiping software for complete erasure</li>
                </ul>
                
                <h4>Proper Disposal:</h4>
                <ul>
                    <li>Use authorized e-waste collection centers</li>
                    <li>Participate in manufacturer take-back programs</li>
                    <li>Never throw e-waste in regular garbage</li>
                    <li>Keep batteries separate from other components</li>
                </ul>
                
                <h4>Purchasing Decisions:</h4>
                <ul>
                    <li>Buy from manufacturers with EPR compliance</li>
                    <li>Choose devices with longer lifespans</li>
                    <li>Consider refurbished or recycled products</li>
                    <li>Look for eco-friendly certifications</li>
                </ul>
                
                <h4>Community Action:</h4>
                <ul>
                    <li>Organize e-waste collection drives</li>
                    <li>Educate others about proper disposal</li>
                    <li>Support local recycling initiatives</li>
                    <li>Advocate for better e-waste policies</li>
                </ul>
            `,
    },
    "data-security": {
      title: "Data Security in E-Waste Disposal",
      content: `
                <h3>Protecting Your Personal Data</h3>
                <p>Data security is crucial when disposing of electronic devices to prevent identity theft and privacy breaches.</p>
                
                <h4>Types of Data at Risk:</h4>
                <ul>
                    <li>Personal information (names, addresses, phone numbers)</li>
                    <li>Financial data (bank accounts, credit card information)</li>
                    <li>Login credentials and passwords</li>
                    <li>Photos and personal documents</li>
                    <li>Business and professional information</li>
                </ul>
                
                <h4>Data Wiping Methods:</h4>
                <ul>
                    <li><strong>Software Wiping:</strong> Use certified data destruction software</li>
                    <li><strong>Degaussing:</strong> Magnetic field destruction for hard drives</li>
                    <li><strong>Physical Destruction:</strong> Shredding or crushing storage devices</li>
                    <li><strong>Cryptographic Erasure:</strong> Destroying encryption keys</li>
                </ul>
                
                <h4>Device-Specific Guidelines:</h4>
                <ul>
                    <li><strong>Smartphones:</strong> Factory reset + encryption + multiple overwrites</li>
                    <li><strong>Computers:</strong> Format drives + use wiping software</li>
                    <li><strong>Tablets:</strong> Sign out of accounts + factory reset</li>
                    <li><strong>Printers:</strong> Clear memory and remove hard drives</li>
                </ul>
                
                <h4>Certification and Documentation:</h4>
                <ul>
                    <li>Request data destruction certificates</li>
                    <li>Document the disposal process</li>
                    <li>Verify recycler credentials and certifications</li>
                    <li>Keep records for compliance purposes</li>
                </ul>
                
                <h4>Professional Services:</h4>
                <p>For sensitive business data, consider professional data destruction services that provide:</p>
                <ul>
                    <li>On-site data destruction</li>
                    <li>Chain of custody documentation</li>
                    <li>Compliance with industry standards</li>
                    <li>Insurance and liability coverage</li>
                </ul>
            `,
    },
  }

  const topic = topics[topicName]
  if (topic) {
    contentArea.innerHTML = `
            <h3>${topic.title}</h3>
            ${topic.content}
        `

    // Update topic card selection
    document.querySelectorAll(".topic-card").forEach((card) => {
      card.classList.remove("active")
    })

    const activeCard = document.querySelector(`[onclick="showTopic('${topicName}')"]`)
    if (activeCard) {
      activeCard.classList.add("active")
    }
  }
}

// Statistics functions
function filterStats(period) {
  showNotification(`Filtering statistics for ${period}`, "info")
  // Update charts and data based on selected period
  updateStatistics(period)
}

function updateStatistics(period) {
  // Simulate data update based on period
  const multipliers = {
    week: 0.1,
    month: 0.5,
    year: 1.0,
    all: 1.5,
  }

  const multiplier = multipliers[period] || 1.0

  // Update stat cards with new values
  const statCards = document.querySelectorAll(".stat-card .stat-value .number")
  statCards.forEach((card) => {
    const baseValue = Number.parseFloat(card.textContent.replace(/[^\d.]/g, ""))
    const newValue = (baseValue * multiplier).toFixed(1)
    card.textContent = newValue
  })
}

function initializeCharts() {
  // Simple chart initialization (placeholder)
  const canvas = document.getElementById("trendChart")
  if (canvas) {
    const ctx = canvas.getContext("2d")

    // Draw a simple line chart
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = "#27ae60"
    ctx.lineWidth = 3
    ctx.beginPath()

    const points = [
      { x: 50, y: 300 },
      { x: 150, y: 250 },
      { x: 250, y: 200 },
      { x: 350, y: 180 },
      { x: 450, y: 150 },
      { x: 550, y: 120 },
      { x: 650, y: 100 },
      { x: 750, y: 80 },
    ]

    points.forEach((point, index) => {
      if (index === 0) {
        ctx.moveTo(point.x, point.y)
      } else {
        ctx.lineTo(point.x, point.y)
      }
    })

    ctx.stroke()

    // Add data points
    ctx.fillStyle = "#27ae60"
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 5, 0, 2 * Math.PI)
      ctx.fill()
    })
  }
}

// Profile functions
function showTab(tabName) {
  // Hide all tab panes
  document.querySelectorAll(".tab-pane").forEach((pane) => {
    pane.classList.remove("active")
  })

  // Remove active class from all tab buttons
  document.querySelectorAll(".tab-btn").forEach((btn) => {
    btn.classList.remove("active")
  })

  // Show selected tab pane
  const targetPane = document.getElementById(tabName + "Tab")
  if (targetPane) {
    targetPane.classList.add("active")
  }

  // Add active class to clicked tab button
  event.target.classList.add("active")
}

function changeProfilePicture() {
  showNotification("Profile picture upload coming soon!", "info")
}

function loadUserDataIntoForms() {
  // Load personal information
  const firstNameInput = document.getElementById("firstName")
  const lastNameInput = document.getElementById("lastName")

  if (firstNameInput && lastNameInput && userData.name) {
    const nameParts = userData.name.split(" ")
    firstNameInput.value = nameParts[0] || ""
    lastNameInput.value = nameParts.slice(1).join(" ") || ""
  }

  // Load other user data
  const fields = ["email", "phone", "city", "state", "pincode"]
  fields.forEach((field) => {
    const input = document.getElementById(field)
    if (input && userData[field]) {
      input.value = userData[field]
    }
  })
}

// Utility functions
function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close" onclick="this.parentElement.remove()">
            <i class="fas fa-times"></i>
        </button>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 15px;
        max-width: 400px;
        animation: slideIn 0.3s ease;
    `

  // Add to document
  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.style.animation = "slideOut 0.3s ease"
      setTimeout(() => notification.remove(), 300)
    }
  }, 5000)
}

function getNotificationIcon(type) {
  const icons = {
    success: "check-circle",
    error: "exclamation-circle",
    warning: "exclamation-triangle",
    info: "info-circle",
  }
  return icons[type] || "info-circle"
}

function getNotificationColor(type) {
  const colors = {
    success: "#27ae60",
    error: "#e74c3c",
    warning: "#f39c12",
    info: "#3498db",
  }
  return colors[type] || "#3498db"
}

function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

function handleWindowResize() {
  // Close sidebar on mobile when resizing to desktop
  if (window.innerWidth > 1024) {
    const sidebar = document.getElementById("sidebar")
    sidebar.classList.remove("show")
  }
}

function handleKeyboardShortcuts(event) {
  // Ctrl/Cmd + K for search
  if ((event.ctrlKey || event.metaKey) && event.key === "k") {
    event.preventDefault()
    const searchInput = document.getElementById("locationSearch")
    if (searchInput) {
      searchInput.focus()
    }
  }

  // Escape to close modals
  if (event.key === "Escape") {
    const modal = document.querySelector(".modal.show")
    if (modal) {
      modal.classList.remove("show")
      document.body.style.overflow = "auto"
    }
  }
}

// Data management functions
function saveUserData() {
  try {
    localStorage.setItem("ewasteUserData", JSON.stringify(userData))
  } catch (error) {
    console.error("Error saving user data:", error)
  }
}

function loadUserData() {
  try {
    const savedData = localStorage.getItem("ewasteUserData")
    if (savedData) {
      userData = { ...userData, ...JSON.parse(savedData) }
    }
  } catch (error) {
    console.error("Error loading user data:", error)
  }
}

function loadUserPreferences() {
  try {
    const preferences = localStorage.getItem("ewastePreferences")
    if (preferences) {
      const prefs = JSON.parse(preferences)
      // Apply preferences (theme, language, etc.)
      if (prefs.theme) {
        document.body.className = prefs.theme
      }
    }
  } catch (error) {
    console.error("Error loading preferences:", error)
  }
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 10px;
        flex: 1;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 5px;
        border-radius: 4px;
        opacity: 0.8;
        transition: opacity 0.3s ease;
    }
    
    .notification-close:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.1);
    }
`
document.head.appendChild(style)

// Initialize service worker for offline functionality
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration)
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError)
      })
  })
}

// Export functions for global access
window.loadPage = loadPage
window.showAddDeviceModal = showAddDeviceModal
window.closeAddDeviceModal = closeAddDeviceModal
window.updateDevice = updateDevice
window.scheduleDisposal = scheduleDisposal
window.repairDevice = repairDevice
window.viewCertificate = viewCertificate
window.searchCenters = searchCenters
window.contactCenter = contactCenter
window.getDirections = getDirections
window.showTopic = showTopic
window.filterStats = filterStats
window.showTab = showTab
window.changeProfilePicture = changeProfilePicture

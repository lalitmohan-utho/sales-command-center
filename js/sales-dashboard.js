/**
 * Sales Dashboard JavaScript
 * Contains all functions for the sales dashboard
 */

// ============ GLOBAL VARIABLES ============
let currentTaskFilters = {
    department: '',
    status: '',
    ref_type: '',
    ref_id: ''
};

let currentCategory = '';
let mainFilters = {
    sales_person: '',
    date_from: '',
    date_to: ''
};

let leadSourceChartInstance = null;
let quarterTargetChartInstance = null;
let currentContactId = null;
let tasksLoaded = false;
let currentTeamTarget = null;

let currentFilters = {};
let dashboardData = {};
let dashboardData_new = {};
let currentPage = 1;
const itemsPerPage = 10;
let filteredTasks = [];
let allTasks = [];
let dealsLostReasons = [];
let dealsWonTypes = [];
let dealsLostData = [];
let dealsWonData = [];
let selectedDealsLostReason = '';
let selectedDealsWonType = '';

let invoiceItemsInclude = 1;
let currentInvoiceUserId = null;
let currentInvoiceId = null;
let includeInvoice = 0;
let currentUserId = null;
let currentUserName = null;
let currentTargetData = null;

// ============ INITIALIZATION ============
document.addEventListener("DOMContentLoaded", () => {
    loadOverdueFollowups();
    initDateFilters();
    initEventListeners();
});

async function loadOverdueFollowups() {
    const [data, header_card, contacts] = await Promise.all([
        callApi("followup"),
        callApi("report_followups"),
        callApi("contact")
    ]);
    return { data, header_card, contacts };
}

function initDateFilters() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    let startDate = "";
    let endDate = "";

    if (month >= 4 && month <= 6) {
        startDate = `${year}-04-01`;
        endDate = `${year}-06-30`;
    } else if (month >= 7 && month <= 9) {
        startDate = `${year}-07-01`;
        endDate = `${year}-09-30`;
    } else if (month >= 10 && month <= 12) {
        startDate = `${year}-10-01`;
        endDate = `${year}-12-31`;
    } else {
        startDate = `${year}-01-01`;
        endDate = `${year}-03-31`;
    }

    document.getElementById("date_from").value = startDate;
    document.getElementById("date_to").value = endDate;

    const initialFormData = getFormData();
    loadKPIReport(initialFormData);
}

function initEventListeners() {
    document.getElementById("getReportBtn").addEventListener("click", function (e) {
        e.preventDefault();
        const formData = getFormData();
        loadKPIReport(formData);
        
        // Refresh tasks if visible
        const tasksTableWrapper = document.getElementById('tasksTableWrapper');
        if (tasksTableWrapper && tasksTableWrapper.style.display === 'block') {
            mainFilters = getMainFilters();
            if (currentTaskFilters.department || currentTaskFilters.status ||
                currentTaskFilters.ref_type || currentTaskFilters.ref_id) {
                loadFilteredTasks();
            } else if (currentCategory) {
                filterTasksByCategory(currentCategory);
            } else {
                loadTasksWithMainFilters();
            }
        }
    });

    // Sidebar close button
    const sidebarClose = document.getElementById('sidebar-close');
    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    // Close sidebar when clicking outside
    document.addEventListener('click', function (event) {
        const sidebar = document.getElementById('sidebar');
        if (sidebar && sidebar.classList.contains('open') &&
            !sidebar.contains(event.target) &&
            !event.target.closest('.stat-card')) {
            closeSidebar();
        }
    });

    // Invoice toggle button
    const toggleInvoiceItemsBtn = document.getElementById('toggleInvoiceItemsBtn');
    if (toggleInvoiceItemsBtn) {
        toggleInvoiceItemsBtn.addEventListener('click', () => {
            invoiceItemsInclude = invoiceItemsInclude === 1 ? 0 : 1;
            toggleInvoiceItemsBtn.textContent = invoiceItemsInclude === 1 ? 'Exclude Invoices' : 'Include Invoices';
            fetchInvoiceItems(currentInvoiceUserId, currentInvoiceId);
        });
    }

    // Invoice amount click handler
    document.addEventListener('click', function (e) {
        const el = e.target.closest('.invoice-amount');
        if (!el) return;
        currentInvoiceUserId = el.dataset.userid;
        currentInvoiceId = el.dataset.invoiceid;
        fetchInvoiceItems(currentInvoiceUserId, currentInvoiceId);
        openItemsSidebar();
    });

    // Invoice item action button handler
    document.addEventListener('click', async (e) => {
        const btn = e.target.closest('.invoice-item-action-btn');
        if (!btn) return;
        e.stopPropagation();
        const itemId = btn.dataset.itemid;
        const isIncludeValue = invoiceItemsInclude === 1 ? "0" : "1";
        btn.disabled = true;
        btn.textContent = 'Processing...';
        try {
            await callApi("update-invoice-item", { is_include: isIncludeValue, itemid: String(itemId) }, "POST");
            btn.closest('tr')?.remove();
        } catch (err) {
            console.error(err);
            alert("Failed to update item");
            btn.disabled = false;
            btn.textContent = invoiceItemsInclude === 1 ? 'Exclude' : 'Include';
        }
    });

    // Team target form submission
    const teamTargetForm = document.getElementById('teamTargetForm');
    if (teamTargetForm) {
        teamTargetForm.addEventListener('submit', handleTeamTargetSubmit);
    }
}

// ============ HELPER FUNCTIONS ============
function convertToDMY(dateString) {
    const [year, month, day] = dateString.split("-");
    return `${year}-${month}-${day}`;
}

function getFormData() {
    const rawFrom = document.getElementById("date_from").value;
    const rawTo = document.getElementById("date_to").value;
    return {
        date_from: convertToDMY(rawFrom),
        date_to: convertToDMY(rawTo),
        sales_person: document.getElementById("sales_person").value
    };
}

function getMainFilters() {
    return {
        sales_person: document.getElementById('sales_person').value,
        date_from: document.getElementById('date_from').value,
        date_to: document.getElementById('date_to').value
    };
}

function formatINR(value) {
    if (!value || isNaN(value)) return '₹ 0';
    if (value >= 100000) {
        return `₹ ${(value / 100000).toFixed(2)}Lk`;
    }
    if (value >= 1000) {
        return `₹ ${(value / 1000).toFixed(2)}K`;
    }
    return `₹ ${value.toFixed(2)}`;
}

function formatCurrency(value) {
    if (!value) return '₹ 0';
    if (typeof value === 'string' && value.includes('₹')) {
        return value;
    }
    const numValue = parseFloat(value);
    if (isNaN(numValue)) return '₹ 0';
    return `₹ ${numValue.toLocaleString('en-IN', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    })}`;
}

function escapeHtml(text) {
    const map = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;' };
    return text.replace(/[&<>"']/g, function (m) { return map[m]; });
}

function getStatusFromAchievement(percent) {
    if (percent >= 100) return 'Ahead';
    if (percent >= 85) return 'On Track';
    if (percent >= 70) return 'Behind';
    return 'At Risk';
}

function getStatusClass(status) {
    switch (status) {
        case 'Ahead': return 'ahead';
        case 'On Track': return 'on-track';
        case 'Behind': return 'behind';
        case 'At Risk': return 'at-risk';
        default: return 'at-risk';
    }
}

function getProgressColor(status) {
    switch (status) {
        case 'On Track': return '#10B981';
        case 'Behind': return '#EF4444';
        case 'At Risk': return '#F59E0B';
        default: return '#10B981';
    }
}

function parseAmount(amountStr) {
    if (typeof amountStr === 'number') return amountStr;
    if (!amountStr) return 0;
    const cleaned = amountStr.replace(/[₹,\s]/g, '');
    if (cleaned.includes('Lk') || cleaned.includes('L')) {
        return parseFloat(cleaned.replace(/Lk|L/g, '')) * 100000;
    }
    if (cleaned.includes('K')) {
        return parseFloat(cleaned.replace('K', '')) * 1000;
    }
    return parseFloat(cleaned) || 0;
}

// ============ DASHBOARD LOADING ============
async function loadDashboard_new() {
    try {
        const result = await loadOverdueFollowups();
        if (!result) return;

        const { data, header_card, contacts } = result;
        allDueCards = header_card?.followups?.due || [];
        allTasks = data?.followups || [];
        filteredTasks = allTasks;
        
        getSourceStatusData(contacts);
        headerCards(allDueCards);
        renderTasks(currentPage);
    } catch (error) {
        console.error('Error loading dashboard:', error);
    }
}

async function loadKPIReport({ sales_person, date_from, date_to }) {
    try {
        currentFilters = { sales_person, date_from, date_to };

        const [adminRes, dealRes] = await Promise.all([
            callApi('adminreport', {
                assigned_to: sales_person,
                create_start: date_from,
                create_end: date_to
            }),
            callApi('deal', {
                userid: sales_person,
                create_start: date_from,
                create_end: date_to
            })
        ]);

        if (!adminRes && !dealRes) return;

        const adminKpis = adminRes?.staff?.[0];
        const emp_target = adminRes?.staff?.[0]?.emp_targets;
        const activity = adminRes?.staff?.activity;

        if (adminKpis) {
            renderKPICards(adminKpis);
            renderStatsRow2(adminKpis);
            totalFunnelValue(adminKpis);
            renderActivity(activity);

            const quarterWiseTargets = convertToQuarterWise(emp_target);
            renderTargetsTable(quarterWiseTargets);
            performance_overview(emp_target);
        } else {
            console.warn('Admin KPI data not found');
        }
    } catch (error) {
        console.error("KPI API error:", error);
    }
}

// ============ RENDERING FUNCTIONS ============
function renderKPICards(kpis) {
    const statsGridRow0 = document.getElementById('statsGridRow0');
    const firstStats = [
        { title: 'Total Business', value: kpis.total_business, icon: 'bi-file-earmark-text', color: 'blue' },
        { title: 'Active MRR', value: kpis.total_mrr, icon: 'bi-telephone', color: 'green' },
        { title: 'New Business', value: kpis.new_business, icon: 'bi-pie-chart', color: 'green' },
        { title: 'Funnel Size', value: kpis.total_deals, icon: 'bi-currency-rupee', color: 'yellow' },
        { title: 'Total Leads', value: kpis.total_leads, icon: 'bi-currency-rupee', color: 'yellow' },
        { title: 'Converted Leads', value: kpis.total_users, icon: 'bi-currency-rupee', color: 'yellow' }
    ];

    statsGridRow0.innerHTML = firstStats.map(stat => `
        <div class="col-12 col-sm-6 col-md-4 col-lg-3 col-xxl-2">
            <div class="stat-card" data-title="${stat.title}">
                <div class="stat-info">
                    <h6>${stat.title}</h6>
                    <h3 class="large">${stat.value}</h3>
                </div>
                <div class="stat-icon large ${stat.color}">
                    <i class="${stat.icon}"></i>
                </div>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', function () {
            const title = this.getAttribute('data-title');
            openSidebar(title);
        });
    });
}

function renderStatsRow2(kpis) {
    const statsRow2 = document.getElementById('statsGridRow2');
    const smallStats = [
        { title: 'New', value: kpis.new_contacts, icon: 'bi-calendar-check', color: 'blue' },
        { title: 'Active', value: kpis.active_contacts, icon: 'bi-person-plus', color: 'blue' },
        { title: 'Retargeting', value: kpis.closed_contacts, icon: 'bi-check-circle', color: 'green' },
        { title: 'Urgent', value: kpis.urgent_contacts, icon: 'bi-clock-history', color: 'yellow' },
        { title: 'Not Contacted', value: kpis.not_contacted_contacts, icon: 'bi-file-earmark-arrow-up', color: 'orange' },
        { title: 'Contacted', value: kpis.contacted_contacts, icon: 'bi-file-earmark-arrow-up', color: 'orange' },
        { title: 'Junk', value: kpis.junk_contacts, icon: 'bi-file-earmark-arrow-up', color: 'orange' },
        { title: 'Meeting Joined', value: kpis.meeting_joined, icon: 'bi-file-earmark-arrow-up', color: 'orange' },
        { title: 'Meeting Not Joined', value: kpis.meeting_not_joined, icon: 'bi-file-earmark-arrow-up', color: 'orange' },
        { title: 'Payment Done', value: kpis.payment_done, icon: 'bi-file-earmark-arrow-up', color: 'orange' },
        { title: 'POC', value: kpis.poc, icon: 'bi-file-earmark-arrow-up', color: 'orange' },
        { title: 'Negotiation And Review', value: kpis.negotiation_and_review, icon: 'bi-file-earmark-arrow-up', color: 'orange' },
    ];

    statsRow2.innerHTML = smallStats.map(stat => `
        <div class="stat-card" data-title="${stat.title}">
            <div class="stat-info">
                <h6>${stat.title}</h6>
                <h3>${stat.value}</h3>
            </div>
            <div class="stat-icon ${stat.color}">
                <i class="${stat.icon}"></i>
            </div>
        </div>
    `).join('');

    document.querySelectorAll('.stat-card').forEach(card => {
        card.addEventListener('click', function () {
            const title = this.getAttribute('data-title');
            openSidebar(title);
        });
    });
}

function headerCards(kpie) {
    const headerCards = document.getElementById('header_card');
    const largeStats = [
        { title: 'Overdue Followups', value: kpie.overdue, icon: 'bi-exclamation-triangle', color: 'red', category: 'overdue' },
        { title: 'Today Due Followups', value: kpie.today, icon: 'bi-calendar-check', color: 'blue', category: 'today' },
        { title: 'This Week Due Followup', value: kpie.week, icon: 'bi-calendar-week', color: 'green', category: 'week' },
        { title: 'Next 30 Days Due', value: kpie.month, icon: 'bi-calendar-range', color: 'yellow', category: 'next30' }
    ];

    headerCards.innerHTML = largeStats.map(stat => `
        <div class="stat-card stat-card-large" style="flex-direction:column; align-items:flex-start;">
            <div style="width:100%; display:flex; justify-content:space-between; align-items:center;">
                <div class="stat-info">
                    <h6>${stat.title}</h6>
                    <h3 class="large">${stat.value}</h3>
                </div>
                <div class="stat-icon large ${stat.color}">
                    <i class="bi ${stat.icon}"></i>
                </div>
            </div>
            <hr style="width:100%; margin:10px 0;">
            <a href="javascript:void(0)" onclick="filterTasksByCategory('${stat.category}')"
               class="text-primary" style="font-size:13px; text-decoration:underline; cursor:pointer;">
               <i class="bi bi-list-ul"></i> View List
            </a>
        </div>
    `).join('');
}

function totalFunnelValue(kpie) {
    const totalFunnelValue = document.getElementById('totalFunnelValue');
    const largeStats = [
        { title: 'Total No. of Prospects Added In Deals', value: kpie.total_deals, icon: 'bi-plus-circle', color: 'blue', clickable: false },
        { title: 'Total Funnel Expected Value', value: kpie.total_deal_amount, icon: 'bi-currency-rupee', color: 'yellow', clickable: false },
        { title: 'Deals Lost', value: kpie.total_deal_won, icon: 'bi-x-circle', color: 'red', clickable: true, onClick: "applyDealsFilter('lost')" },
        { title: 'Deals Won', value: kpie.total_deal_lost, icon: 'bi-trophy', color: 'green', clickable: true, onClick: "applyDealsFilter('won')" }
    ];

    totalFunnelValue.innerHTML = largeStats.map(stat => `
        <div class="stat-card stat-card-large ${stat.clickable ? 'clickable' : ''}"
            ${stat.clickable ? `onclick="${stat.onClick}"` : ''}>
            <div class="stat-info">
                <h6>${stat.title}</h6>
                <h3 class="large">${stat.value}</h3>
                ${stat.title === 'Deals Lost' && selectedDealsLostReason ? `<span class="selected-filter">Filter: ${selectedDealsLostReason}</span>` : ''}
                ${stat.title === 'Deals Won' && selectedDealsWonType ? `<span class="selected-filter">Type: ${selectedDealsWonType}</span>` : ''}
            </div>
            <div class="stat-icon large ${stat.color}">
                <i class="${stat.icon}"></i>
            </div>
        </div>
    `).join('');
}

// ============ TASKS FUNCTIONS ============
function toggleTasks() {
    const tableWrapper = document.getElementById('tasksTableWrapper');
    const filterBtn = document.getElementById('tasksFilterBtn');
    const filterForm = document.getElementById('tasksFilterForm');
    const seeTasksBtn = document.getElementById('seeTasksBtn');
    const isHidden = tableWrapper.style.display === 'none';
    
    if (isHidden) {
        tableWrapper.style.display = 'block';
        filterBtn.style.display = 'inline-flex';
        filterForm.style.display = 'none';
        seeTasksBtn.innerText = 'Hide Tasks';
        if (!tasksLoaded) {
            loadTasksData();
            tasksLoaded = true;
        }
    } else {
        tableWrapper.style.display = 'none';
        filterBtn.style.display = 'none';
        filterForm.style.display = 'none';
        seeTasksBtn.innerText = 'See Tasks';
    }
}

function toggleTasksFilter() {
    const filterForm = document.getElementById('tasksFilterForm');
    if (filterForm.style.display === 'none' || filterForm.style.display === '') {
        filterForm.style.display = 'block';
    } else {
        filterForm.style.display = 'none';
    }
}

async function loadTasksData() {
    await loadTasksWithMainFilters();
}

async function loadTasksWithMainFilters() {
    try {
        mainFilters = getMainFilters();
        let params = { mytickets: 0, status: 24 };

        if (mainFilters.sales_person) params.followup_admin = mainFilters.sales_person;
        if (mainFilters.date_from) params.date_start = mainFilters.date_from;
        if (mainFilters.date_to) params.date_end = mainFilters.date_to;

        const data = await callApi("followup", params);
        filteredTasks = data?.followups || [];
        allTasks = filteredTasks;
        currentPage = 1;
        renderTasks(currentPage);
    } catch (error) {
        console.error("Error loading tasks with main filters:", error);
    }
}

async function loadFilteredTasks() {
    try {
        let params = { mytickets: 0, status: 24 };

        if (mainFilters.sales_person) params.followup_admin = mainFilters.sales_person;
        if (mainFilters.date_from) params.date_start = mainFilters.date_from;
        if (mainFilters.date_to) params.date_end = mainFilters.date_to;
        if (currentCategory) await applyCategoryDateFilter(params, currentCategory);
        if (currentTaskFilters.department) params.department = currentTaskFilters.department;
        if (currentTaskFilters.status) params.status = currentTaskFilters.status;
        if (currentTaskFilters.ref_type) params.ref_type = currentTaskFilters.ref_type;
        if (currentTaskFilters.ref_id) params.ref_id = currentTaskFilters.ref_id;

        const data = await callApi("followup", params);
        filteredTasks = data?.followups || [];
        allTasks = filteredTasks;
        currentPage = 1;
        renderTasks(currentPage);
    } catch (error) {
        console.error("Filter API error:", error);
    }
}

async function filterTasksByCategory(category) {
    currentCategory = category;
    currentPage = 1;
    mainFilters = getMainFilters();

    let params = { mytickets: 0, status: 24 };
    if (mainFilters.sales_person) params.followup_admin = mainFilters.sales_person;
    await applyCategoryDateFilter(params, category);
    if (!params.date_start && mainFilters.date_from) params.date_start = mainFilters.date_from;
    if (!params.date_end && mainFilters.date_to) params.date_end = mainFilters.date_to;
    if (currentTaskFilters.department) params.department = currentTaskFilters.department;
    if (currentTaskFilters.status) params.status = currentTaskFilters.status;
    if (currentTaskFilters.ref_type) params.ref_type = currentTaskFilters.ref_type;
    if (currentTaskFilters.ref_id) params.ref_id = currentTaskFilters.ref_id;

    try {
        const data = await callApi("followup", params);
        filteredTasks = data?.followups || [];
        allTasks = filteredTasks;
        renderTasks(currentPage);
    } catch (error) {
        console.error("Filter API error:", error);
    }
}

async function applyCategoryDateFilter(params, category) {
    const DateObj = new Date();
    if (category.toLowerCase() === "overdue") {
        DateObj.setDate(DateObj.getDate() - 1);
        params.date_end = DateObj.toISOString().split('T')[0];
    } else if (category.toLowerCase() === "today") {
        const dateStr = DateObj.toISOString().split('T')[0];
        params.date_start = dateStr;
        params.date_end = dateStr;
    } else if (category.toLowerCase() === "week") {
        params.date_start = DateObj.toISOString().split('T')[0];
        DateObj.setDate(DateObj.getDate() + 7);
        params.date_end = DateObj.toISOString().split('T')[0];
    } else if (category.toLowerCase() === "next30") {
        params.date_start = DateObj.toISOString().split('T')[0];
        DateObj.setDate(DateObj.getDate() + 30);
        params.date_end = DateObj.toISOString().split('T')[0];
    }
}

async function applyTasksFilter() {
    currentTaskFilters = {
        department: document.getElementById('filterDepartment').value,
        status: document.getElementById('filterStatus').value,
        ref_type: document.getElementById('filterRefType').value,
        ref_id: document.getElementById('filterRefId').value
    };
    await loadFilteredTasks();
}

function clearTasksFilter() {
    document.getElementById('filterDepartment').value = '';
    document.getElementById('filterStatus').value = '';
    document.getElementById('filterRefType').value = '';
    document.getElementById('filterRefId').value = '';
    currentTaskFilters = { department: '', status: '', ref_type: '', ref_id: '' };
    currentCategory = '';
    loadTasksWithMainFilters();
}

function renderTasks(page, pageData = undefined) {
    let pageTasks = [];
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    if (pageData) pageTasks = pageData;
    else pageTasks = filteredTasks.slice(start, end);

    const tbody = document.getElementById('tasksTableBody');
    tbody.innerHTML = pageTasks.map((task, index) => `
        <tr onclick="openContactSidebar('${task.ref_id}')">
            <td>${start + index + 1}</td>
            <td>${task.id}</td>
            <td><span class="badge ${task.type_text === 'Call' ? 'status-new' : task.type_text === 'Email' ? 'status-qualified' : 'status-contacted'}">${task.type_text}</span></td>
            <td><span class="badge ${task.status_text === 'Completed' ? 'completed' : task.status_text === 'Overdue' ? 'overdue' : 'pending'}">${task.status_text}</span></td>
            <td>${task.followuptime}</td>
            <td>${task.clientname}</td>
            <td>${task.message}</td>
            <td>${task.followup_admin_name}</td>
            <td>${task.department}</td>
            <td>${task.ref_type}</td>
            <td>${task.entrytime}</td>
            <td>${task.completedtime}</td>
        </tr>
    `).join('');
    renderPagination();
}

function renderPagination() {
    const pagination = document.getElementById('tasksPagination');
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);

    let paginationHTML = `
        <button class="pagination-btn" onclick="changePage(${currentPage - 1})" ${currentPage === 1 ? 'disabled' : ''}>
            <i class="bi bi-chevron-left"></i>
        </button>
    `;

    paginationHTML += `<button class="pagination-btn ${currentPage === 1 ? 'active' : ''}" onclick="changePage(1)">1</button>`;
    if (totalPages >= 2) paginationHTML += `<button class="pagination-btn ${currentPage === 2 ? 'active' : ''}" onclick="changePage(2)">2</button>`;
    if (totalPages >= 3 && currentPage <= 3) paginationHTML += `<button class="pagination-btn ${currentPage === 3 ? 'active' : ''}" onclick="changePage(3)">3</button>`;
    if (totalPages > 3) paginationHTML += `<input type="number" class="pagination-input" value="${currentPage}" min="1" max="${totalPages}" onchange="changePage(parseInt(this.value))">`;
    if (totalPages > 3 && currentPage < totalPages - 2) {
        paginationHTML += `<button class="pagination-btn" onclick="changePage(${totalPages - 1})">${totalPages - 1}</button>`;
        paginationHTML += `<button class="pagination-btn" onclick="changePage(${totalPages})">${totalPages}</button>`;
    } else if (totalPages > 3) {
        for (let i = Math.max(4, currentPage); i <= totalPages; i++) {
            paginationHTML += `<button class="pagination-btn ${currentPage === i ? 'active' : ''}" onclick="changePage(${i})">${i}</button>`;
        }
    }

    paginationHTML += `
        <button class="pagination-btn" onclick="changePage(${currentPage + 1})" ${currentPage === totalPages ? 'disabled' : ''}>
            <i class="bi bi-chevron-right"></i>
        </button>
    `;
    pagination.innerHTML = paginationHTML;
}

function changePage(page) {
    const totalPages = Math.ceil(filteredTasks.length / itemsPerPage);
    if (page >= 1 && page <= totalPages) {
        currentPage = page;
        renderTasks(currentPage);
    }
}

// ============ CHARTS ============
function performance_overview(emp_target) {
    let totalTarget = 0;
    let totalAchieved = 0;

    emp_target.forEach(item => {
        totalTarget += Number(item.target_business || 0);
        totalAchieved += Number(item.achived_buisness || 0);
    });

    const remainingTarget = Math.max(totalTarget - totalAchieved, 0);
    const achievedPercent = totalTarget > 0 ? ((totalAchieved / totalTarget) * 100).toFixed(1) : 0;

    document.getElementById('achievementPercent').innerText = `${achievedPercent}%`;
    document.getElementById('targetAchieved').innerText = formatINR(totalAchieved);
    document.getElementById('remainingTarget').innerText = formatINR(remainingTarget);

    salesTargetOverviewGraph({ achieved: totalAchieved, remaining: remainingTarget });
}

function salesTargetOverviewGraph(data) {
    const ctx = document.getElementById('quarterTargetChart').getContext('2d');
    if (quarterTargetChartInstance) quarterTargetChartInstance.destroy();

    quarterTargetChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Achieved', 'Remaining'],
            datasets: [{ data: [data.achieved, data.remaining], backgroundColor: ['#10B981', '#E5E7EB'], borderWidth: 0 }]
        },
        options: {
            cutout: '75%',
            plugins: { legend: { display: false }, tooltip: { enabled: false } }
        }
    });
}

async function getSourceStatusData(data) {
    try {
        const contacts = data.contacts;
        const sourceCount = contacts.reduce((acc, contact) => {
            const source = contact.source || "Unknown";
            acc[source] = (acc[source] || 0) + 1;
            return acc;
        }, {});
        renderCharts(sourceCount);
    } catch (error) {
        console.error("Error fetching source/status data:", error);
    }
}

function renderCharts(sourceCount) {
    const canvas = document.getElementById('leadSourceChart');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (leadSourceChartInstance) {
        leadSourceChartInstance.destroy();
        leadSourceChartInstance = null;
    }
    leadSourceChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(sourceCount),
            datasets: [{ data: Object.values(sourceCount) }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// ============ ACTIVITY ============
function renderActivity(activities) {
    const timeline = document.getElementById('activityTimeline');
    if (!activities) {
        timeline.innerHTML = '<div class="activity-item"><div class="activity-content"><p>No activity data available</p></div></div>';
        return;
    }

    let activityArray = [];
    if (Array.isArray(activities)) activityArray = activities;
    else if (activities.activities && Array.isArray(activities.activities)) activityArray = activities.activities;
    else if (typeof activities === 'object') activityArray = Object.values(activities).filter(v => typeof v === 'object' && v !== null);

    if (activityArray.length === 0) {
        timeline.innerHTML = '<div class="activity-item"><div class="activity-content"><p>No activity data available</p></div></div>';
        return;
    }

    const iconMap = {
        'login': { icon: 'bi-box-arrow-in-right', bg: '#DBEAFE', color: '#1E40AF' },
        'call': { icon: 'bi-telephone', bg: '#D1FAE5', color: '#065F46' },
        'email': { icon: 'bi-envelope', bg: '#FEF3C7', color: '#92400E' },
        'meeting': { icon: 'bi-calendar-event', bg: '#E0E7FF', color: '#3730A3' },
        'note': { icon: 'bi-sticky', bg: '#FCE7F3', color: '#9D174D' },
        'deal': { icon: 'bi-trophy', bg: '#D1FAE5', color: '#065F46' },
        'lead': { icon: 'bi-person-plus', bg: '#DBEAFE', color: '#1E40AF' },
        'task': { icon: 'bi-check2-square', bg: '#FEF3C7', color: '#92400E' },
        'default': { icon: 'bi-activity', bg: '#F3F4F6', color: '#6B7280' }
    };

    const activityItems = activityArray.slice(0, 10).map(activity => {
        const type = (activity.type || activity.activity_type || 'default').toLowerCase();
        const user = activity.user || activity.user_name || activity.admin_name || 'System';
        const taskText = activity.task || activity.description || activity.message || 'Activity logged';
        const ip = activity.ip || activity.ip_address || '';
        const time = activity.time || activity.created_at || activity.date || '';
        
        let timeDisplay = 'Recently';
        if (time) {
            try {
                const activityTime = new Date(time);
                if (!isNaN(activityTime.getTime())) {
                    const diffMs = Date.now() - activityTime;
                    const diffMins = Math.floor(diffMs / 60000);
                    const diffHours = Math.floor(diffMs / 3600000);
                    const diffDays = Math.floor(diffMs / 86400000);
                    if (diffMins < 60) timeDisplay = `${diffMins}m ago`;
                    else if (diffHours < 24) timeDisplay = `${diffHours}h ago`;
                    else if (diffDays === 1) timeDisplay = 'Yesterday';
                    else if (diffDays < 7) timeDisplay = `${diffDays}d ago`;
                    else timeDisplay = activityTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                }
            } catch (e) {}
        }

        const iconData = iconMap[type] || iconMap.default;
        return `
            <div class="activity-item">
                <div class="activity-icon" style="background: ${iconData.bg}; color: ${iconData.color};">
                    <i class="bi ${iconData.icon}"></i>
                </div>
                <div class="activity-content">
                    <p><strong>${user}</strong> ${taskText}</p>
                    ${ip ? `<small>IP: ${ip}</small>` : ''}
                </div>
                <div class="activity-time">${timeDisplay}</div>
            </div>
        `;
    }).join('');

    timeline.innerHTML = activityItems || '<div class="activity-item"><div class="activity-content"><p>No activity items to display</p></div></div>';
}

// ============ DEALS ============
function toggleDealsTable(dealType) {
    const lostTable = document.getElementById('dealsLostTable');
    const wonTable = document.getElementById('dealsWonTable');
    if (dealType === 'lost') {
        lostTable.style.display = 'block';
        wonTable.style.display = 'none';
    } else {
        lostTable.style.display = 'none';
        wonTable.style.display = 'block';
    }
}

async function applyDealsFilter(dealType) {
    const dealStageId = dealType === 'lost' ? 155 : 154;
    const { sales_person, date_from, date_to } = currentFilters;

    try {
        const dealData = await callApi('deal', {
            userid: sales_person,
            create_start: date_from,
            create_end: date_to,
            deal_stage_id: dealStageId
        });

        if (dealType === 'lost') {
            populateDealsTable(dealData, 'dealsLostTableBody');
            toggleDealsTable('lost');
        } else {
            populateDealsTable(dealData, 'dealsWonTableBody');
            toggleDealsTable('won');
        }
    } catch (error) {
        console.error('Error fetching deals:', error);
        const tableBodyId = dealType === 'lost' ? 'dealsLostTableBody' : 'dealsWonTableBody';
        document.getElementById(tableBodyId).innerHTML = `<tr><td colspan="7" class="text-center">Error loading deals</td></tr>`;
    }
}

function populateDealsTable(deals, tableBodyId) {
    const tbody = document.getElementById(tableBodyId);
    if (!deals || !deals.deals || deals.deals.length === 0) {
        tbody.innerHTML = `<tr><td colspan="7" class="text-center">No deals found</td></tr>`;
        return;
    }

    tbody.innerHTML = deals.deals.map((deal, index) => `
        <tr>
            <td>${index + 1}</td>
            <td>${deal.id || 'N/A'}</td>
            <td>${(deal.contact_first_name || '') + ' ' + (deal.contact_last_name || '') || 'N/A'}</td>
            <td>${deal.name || 'N/A'}</td>
            <td>${deal.amount || 'N/A'}</td>
            <td>${deal.assignedto_name || 'N/A'}</td>
            <td>
                <span class="badge ${tableBodyId === 'dealsLostTableBody' ? 'at-risk' : 'success'}">
                    ${deal.deal_stage}
                </span>
            </td>
        </tr>
    `).join('');
}

// ============ TARGETS TABLE ============
const quarterMonthOrder = {
    Q1: ['April', 'May', 'June'],
    Q2: ['July', 'August', 'September'],
    Q3: ['October', 'November', 'December'],
    Q4: ['January', 'February', 'March']
};

function convertToQuarterWise(apiData) {
    if (!Array.isArray(apiData)) return [];
    const quarterMap = {};

    apiData.forEach(item => {
        const key = `${item.employee_id}-${item.year}-${item.quarter}`;
        if (!quarterMap[key]) {
            const months = quarterMonthOrder[item.quarter] || [];
            quarterMap[key] = {
                id: `target-${Object.keys(quarterMap).length + 1}`,
                rep: item.employee_name,
                year: item.year,
                quarter: `${item.quarter} (${months.join('-')})`,
                totalTargetBusiness: 0,
                totalTargetMRR: 0,
                achievedBusiness: 0,
                achievedMRR: 0,
                months: {}
            };
        }
        quarterMap[key].months[item.month] = item;
        quarterMap[key].totalTargetBusiness += Number(item.target_business || 0);
        quarterMap[key].totalTargetMRR += Number(item.target_mrr || 0);
        quarterMap[key].achievedBusiness += Number(item.achived_buisness || 0);
        quarterMap[key].achievedMRR += Number(item.achived_mrr || 0);
    });

    return Object.values(quarterMap).map(q => {
        const qKey = q.quarter.split(' ')[0];
        const order = quarterMonthOrder[qKey] || [];
        const m1 = q.months[order[0]] || {};
        const m2 = q.months[order[1]] || {};
        const m3 = q.months[order[2]] || {};
        const achievementPercent = q.totalTargetBusiness ? Math.round((q.achievedBusiness / q.totalTargetBusiness) * 100) : 0;

        return {
            id: q.id, rep: q.rep, year: q.year, quarter: q.quarter,
            wholeTotalTarget: formatINR(q.totalTargetBusiness),
            targetMRR: formatINR(q.totalTargetMRR),
            wholeMonth1: formatINR(m1.target_business),
            wholeMonth2: formatINR(m2.target_business),
            wholeMonth3: formatINR(m3.target_business),
            mrrMonth1: formatINR(m1.target_mrr),
            mrrMonth2: formatINR(m2.target_mrr),
            mrrMonth3: formatINR(m3.target_mrr),
            achievedRevenue: formatINR(q.achievedBusiness),
            achievedMRR: formatINR(q.achievedMRR),
            achievement: `${achievementPercent}%`,
            status: getStatusFromAchievement(achievementPercent)
        };
    });
}

function renderTargetsTable(targets) {
    const tbody = document.querySelector('#targetsTable tbody');
    tbody.innerHTML = targets.map((target, index) => `
        <tr data-id="${target.id || index}" onclick="editTarget(${JSON.stringify(target).replace(/"/g, '&quot;')})">
            <td>${index + 1}</td>
            <td style="color: #0066FF; font-weight: 600;">${target.rep}</td>
            <td>${target.year}</td>
            <td>${target.quarter}</td>
            <td>${target.wholeTotalTarget || target.targetBusiness}</td>
            <td>${target.targetMRR}</td>
            <td style="text-align: center;">${target.wholeMonth1 || '-'}</td>
            <td style="text-align: center;">${target.wholeMonth2 || '-'}</td>
            <td style="text-align: center;">${target.wholeMonth3 || '-'}</td>
            <td style="text-align: center;">${target.mrrMonth1 || '-'}</td>
            <td style="text-align: center;">${target.mrrMonth2 || '-'}</td>
            <td style="text-align: center;">${target.mrrMonth3 || '-'}</td>
            <td>${target.achievedRevenue || target.achievedWhole}</td>
            <td>${target.achievedMRR}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 8px;">
                    <div class="progress-bar-custom">
                        <div class="progress-fill" style="width: ${target.achievement}; background: ${getProgressColor(target.status)};"></div>
                    </div>
                    <span style="font-weight: 600;">${target.achievement}</span>
                </div>
            </td>
            <td><span class="badge ${getStatusClass(target.status)}">${target.status}</span></td>
            <td><button class="btn btn-sm btn-warning" onclick="event.stopPropagation(); manageTarget(${JSON.stringify(target).replace(/"/g, '&quot;')})">Manage</button></td>
        </tr>
    `).join('');
}

// ============ MODALS ============
function openEditModal(target = null) {
    const modal = document.getElementById('editTargetModal');
    modal.classList.add('show');

    const title = document.getElementById('editTargetModalTitle');
    const submitBtn = document.getElementById('editTargetSubmitBtn');

    if (target) {
        currentTargetData = target;
        title.textContent = 'Update Target';
        submitBtn.textContent = 'Update Target';
        document.getElementById('targetId').value = target.id || '';
        document.getElementById('targetYear').value = target.year || '';
        const quarterValue = target.quarter?.split(' ')[0];
        document.getElementById('targetQuarter').value = quarterValue || '';
        document.getElementById('wholeTotalTarget').value = parseAmount(target.wholeTotalTarget);
    } else {
        currentTargetData = null;
        title.textContent = 'Add Target';
        submitBtn.textContent = 'Save Target';
        document.getElementById('editTargetForm').reset();
    }
}

function closeEditModal() {
    document.getElementById('editTargetModal').classList.remove('show');
    currentTargetData = null;
}

function editTarget(target) {
    openEditModal(target);
}

async function saveTarget(event) {
    event.preventDefault();
    const form = document.getElementById('editTargetForm');
    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const data = {
        year: document.getElementById('targetYear').value,
        quarter: document.getElementById('targetQuarter').value,
        total_sales_target: document.getElementById('wholeTotalTarget').value
    };

    const isEdit = !!currentTargetData;
    const method = isEdit ? 'PUT' : 'POST';

    try {
        const response = await callApi('sales-target', data, method);
        if (response && response.rcode == 'success') {
            closeEditModal();
            loadDashboard_new();
            alert(`Target ${isEdit ? 'updated' : 'saved'} successfully!`);
        } else {
            alert(response?.rmessage || 'Something went wrong');
        }
    } catch (error) {
        console.error(error);
        alert('Error saving target');
    }
}

// ============ SIDEBARS ============
function closeSidebar() {
    document.getElementById('sidebar').classList.remove('open');
}

function openItemsSidebar() {
    document.getElementById('itemsSidebar')?.classList.add('active');
}

function closeItemsSidebar() {
    document.getElementById('itemsSidebar')?.classList.remove('active');
}

function toggleInvoice() {
    includeInvoice = includeInvoice === 0 ? 1 : 0;
    const btn = document.getElementById('invoiceToggleBtn');
    btn.textContent = includeInvoice === 1 ? 'Exclude Invoices' : 'Include Invoices';
    if (currentUserId && currentUserName) {
        showUserInvoices(currentUserId, currentUserName);
    }
}

async function fetchInvoiceItems(userId, invoiceId) {
    const queryParams = {
        userid: userId,
        create_start: currentFilters.date_from,
        create_end: currentFilters.date_to,
        include: invoiceItemsInclude,
        groupby: 'item'
    };

    try {
        const json = await callApi('business_users_invoices', queryParams);
        if (json.rcode !== "success") {
            alert("Failed to load invoice items");
            return;
        }
        const filteredItems = (json.invoiceInfo || []).filter(item => String(item.invoiceid) === String(invoiceId));
        renderInvoiceItemTable(filteredItems);
    } catch (err) {
        console.error("Invoice fetch error:", err);
    }
}

function renderInvoiceItemTable(items) {
    const container = document.getElementById("invoiceItemsContainer");
    if (!container) return;
    if (!items.length) {
        container.innerHTML = "<p class='text-center'>No items found</p>";
        return;
    }

    const actionLabel = invoiceItemsInclude === 1 ? 'Exclude' : 'Include';
    const actionClass = invoiceItemsInclude === 1 ? 'btn-danger' : 'btn-success';

    container.innerHTML = `
        <table class="table table-striped table-hover">
            <thead>
                <tr><th>#</th><th>Type</th><th>Description</th><th>Amount</th><th>Action</th></tr>
            </thead>
            <tbody>
                ${items.map(item => `
                    <tr data-row-itemid="${item.id}">
                        <td>${item.id}</td>
                        <td>${item.type}</td>
                        <td>${item.description || '-'}</td>
                        <td>₹${parseFloat(item.amount).toFixed(2)}</td>
                        <td>
                            <button class="btn ${actionClass} invoice-item-action-btn" data-itemid="${item.id}">
                                ${actionLabel}
                            </button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ============ CONTACT SIDEBAR ============
async function openContactSidebar(contactId) {
    try {
        currentContactId = contactId;

        const [contact, activities, notes, calls, logs] = await Promise.all([
            callApi(`contact/${contactId}`),
            callApi("followup", { department: "Sales", ref_type: "contact", ref_id: contactId }),
            callApi("note", { ref_type: "salecontact", ref_id: contactId }),
            callApi("call", { contactid: contactId }),
            callApi("log", { ref_type: "contact", ref_id: contactId })
        ]);

        document.getElementById('contactFullName').textContent = `${contact.first_name || ''} ${contact.last_name || ''}`.trim();
        document.getElementById('firstName').textContent = contact.first_name || '';
        document.getElementById('lastName').textContent = contact.last_name || '';
        document.getElementById('jobTitle').textContent = contact.job_title || '';
        document.getElementById('mobile').textContent = contact.mobile_number || contact.mobile || '';
        document.getElementById('email').textContent = contact.email || '';
        document.getElementById('city').textContent = contact.city || '';
        document.getElementById('state').textContent = contact.state || '';
        document.getElementById('country').textContent = contact.country || '';
        document.getElementById('owner').textContent = contact.assigned_to_name || contact.owner_id || '';
        document.getElementById('status').textContent = contact.contact_status || contact.contact_status_id || '';
        document.getElementById('source').textContent = contact.source || '';
        document.getElementById('medium').textContent = contact.medium || '0';

        populateActivityTab(activities);
        populateNotesTab(notes);
        populateCallsTab(calls);
        populateLogsTab(logs);
        setupFollowupForm();

        document.getElementById('sidebarOverlay').classList.add('show');
        document.getElementById('contactSidebar').classList.add('show');
    } catch (error) {
        console.error("Contact sidebar error:", error);
        alert("Error loading contact details. Please try again.");
    }
}

function closeContactSidebar() {
    document.getElementById('sidebarOverlay').classList.remove('show');
    document.getElementById('contactSidebar').classList.remove('show');
    currentContactId = null;
}

function switchTab(tabName) {
    document.querySelectorAll('.sidebar-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    if (event && event.target) event.target.classList.add('active');
    document.getElementById(tabName + '-tab').classList.add('active');
}

function populateActivityTab(activities) {
    const activityContent = document.getElementById('activityContent');
    if (activities && activities.followups && activities.followups.length > 0) {
        activityContent.innerHTML = activities.followups.map(activity => `
            <div class="timeline-item">
                <div class="timeline-icon"><i class="bi bi-clock"></i></div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <span class="timeline-user">${activity.followup_admin_name || 'Unknown'}</span>
                        <span class="timeline-date">${activity.entrytime || ''}</span>
                    </div>
                    <p class="timeline-note">${activity.message || 'No message'}</p>
                    ${activity.followuptime ? `<p class="timeline-due">Due: ${activity.followuptime}</p>` : ''}
                </div>
            </div>
        `).join('');
    } else {
        activityContent.innerHTML = '<p style="color: #6b7280; text-align: center; padding: 20px;">No activities found</p>';
    }
}

function populateNotesTab(notes) {
    const notesContent = document.getElementById('notesContent');
    if (notes && notes.notes && notes.notes.length > 0) {
        notesContent.innerHTML = notes.notes.map(note => `
            <tr style="background: white;">
                <td style="padding: 12px 16px; font-size: 13px;">${note.id}</td>
                <td style="padding: 12px 16px; font-size: 13px;">${note.note || note.description || '-'}</td>
                <td style="padding: 12px 16px; font-size: 13px;">${note.added_by_name || note.staff_name || '-'}</td>
                <td style="padding: 12px 16px; font-size: 13px;">${note.dateadded || note.created_at || '-'}</td>
            </tr>
        `).join('');
    } else {
        notesContent.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #6b7280;">No notes found</td></tr>';
    }
}

function populateCallsTab(calls) {
    const callsContent = document.getElementById('callsContent');
    if (calls && calls.calls && calls.calls.length > 0) {
        callsContent.innerHTML = calls.calls.map(call => `
            <tr style="background: white;">
                <td style="padding: 12px 16px; font-size: 13px;">${call.id}</td>
                <td style="padding: 12px 16px; font-size: 13px;">${call.staff_name || call.admin_name || '-'}</td>
                <td style="padding: 12px 16px; font-size: 13px;">
                    <span class="badge ${call.direction === 'inbound' ? 'status-new' : 'status-qualified'}">${call.direction || '-'}</span>
                </td>
                <td style="padding: 12px 16px; font-size: 13px;">${call.call_time || call.created_at || '-'}</td>
                <td style="padding: 12px 16px; font-size: 13px;">${call.duration || '-'}</td>
            </tr>
        `).join('');
    } else {
        callsContent.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 20px; color: #6b7280;">No calls found</td></tr>';
    }
}

function populateLogsTab(logs) {
    const logsContent = document.getElementById('logsContent');
    if (logs && logs.logs && logs.logs.length > 0) {
        logsContent.innerHTML = logs.logs.map(log => `
            <tr style="background: white;">
                <td style="padding: 12px 16px; font-size: 13px;">${log.id}</td>
                <td style="padding: 12px 16px; font-size: 13px;">${log.description || log.log || '-'}</td>
                <td style="padding: 12px 16px; font-size: 13px;">${log.staff_name || log.admin_name || '-'}</td>
                <td style="padding: 12px 16px; font-size: 13px;">${log.date || log.created_at || '-'}</td>
            </tr>
        `).join('');
    } else {
        logsContent.innerHTML = '<tr><td colspan="4" style="text-align: center; padding: 20px; color: #6b7280;">No logs found</td></tr>';
    }
}

function setupFollowupForm() {
    const now = new Date();
    document.getElementById('dueAtDate').value = now.toISOString().split('T')[0];
    document.getElementById('dueAtType').value = "Call";
}

async function addFollowup() {
    const message = document.getElementById('followupMessage').value.trim();
    const dueAtDate = document.getElementById('dueAtDate').value;
    const dueAtType = document.getElementById('dueAtType').value;

    if (!message) { alert("Please enter a follow-up message"); return; }
    if (!currentContactId) { alert("No contact selected"); return; }

    try {
        const response = await callApi("followup", {
            department: "Sales",
            ref_type: "contact",
            ref_id: currentContactId,
            message: message,
            followuptime: dueAtDate + " 00:00:00",
            type: dueAtType === "Call" ? "4" : "1",
            status: "24"
        }, "POST");

        if (response && response.rcode === "success") {
            document.getElementById('followupMessage').value = "";
            const activities = await callApi("followup", { department: "Sales", ref_type: "contact", ref_id: currentContactId });
            populateActivityTab(activities);
            alert("Follow-up added successfully!");
        } else {
            alert("Error adding follow-up: " + (response.rmessage || "Unknown error"));
        }
    } catch (error) {
        console.error("Error adding follow-up:", error);
        alert("Error adding follow-up. Please try again.");
    }
}

// ============ TEAM TARGET SIDEBAR ============
async function manageTarget(target) {
    currentTeamTarget = target;
    const quarterMatch = target.quarter?.match(/Q\d/);
    const quarter = quarterMatch ? quarterMatch[0] : 'Q1';
    const year = target.year || '2026';

    document.getElementById('teamTargetHeader').textContent = `Team Targets of Quarter - ${quarter} of ${year}`;
    document.getElementById('teamTargetLoading').style.display = 'block';
    document.getElementById('teamTargetsTableContainer').style.display = 'none';
    document.getElementById('teamTargetFormContainer').style.display = 'none';

    populateTeamMemberDropdown();
    await loadTeamTargets(quarter, year);
    openTeamTargetSidebar();
}

function populateTeamMemberDropdown() {
    const select = document.getElementById('teamMemberSelect');
    select.innerHTML = '<option value="">Select Team Member</option>';
    if (!Array.isArray(window.staffList)) return;
    window.staffList.forEach(staff => {
        const fullName = `${staff.firstname || ''} ${staff.lastname || ''}`.trim();
        const option = document.createElement('option');
        option.value = staff.id;
        option.textContent = fullName || 'Unnamed';
        select.appendChild(option);
    });
}

async function loadTeamTargets(quarter, year) {
    try {
        const tbody = document.getElementById('teamTargetsTableBody');
        tbody.innerHTML = '';
        document.getElementById('teamTargetLoading').style.display = 'block';
        document.getElementById('teamTargetsTableContainer').style.display = 'none';

        const response = await callApi('employee-sales-target');
        if (!response?.data || !Array.isArray(response.data)) throw new Error('Invalid API response');

        const filteredTargets = response.data.filter(item => String(item.year) === String(year) && String(item.quarter) === String(quarter));

        if (filteredTargets.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:40px; color:#6b7280;">No team targets found for ${quarter} ${year}</td></tr>`;
        } else {
            filteredTargets.forEach((target, index) => {
                const row = document.createElement('tr');
                row.style.cursor = 'pointer';
                row.onclick = () => editTeamTarget(target);
                row.innerHTML = `
                    <td style="padding:12px;">${index + 1}</td>
                    <td style="padding:12px; font-weight:600;">${target.employee_name || 'N/A'}</td>
                    <td style="padding:12px;">${target.year}</td>
                    <td style="padding:12px;">${target.quarter}</td>
                    <td style="padding:12px; color:var(--primary-color); font-weight:600;">${target.assigned_sales_target}</td>
                    <td style="padding:12px;">${target.month_1 || 0}</td>
                    <td style="padding:12px;">${target.month_2 || 0}</td>
                    <td style="padding:12px;">${target.month_3 || 0}</td>
                `;
                tbody.appendChild(row);
            });
        }

        document.getElementById('teamTargetLoading').style.display = 'none';
        document.getElementById('teamTargetsTableContainer').style.display = 'block';
    } catch (error) {
        console.error("Error loading team targets:", error);
        document.getElementById('teamTargetLoading').style.display = 'none';
        document.getElementById('teamTargetsTableContainer').innerHTML = `<div style="text-align:center; padding:20px; color:#ef4444;">Error loading team targets. Please try again.</div>`;
    }
}

function showTeamTargetForm() {
    document.getElementById('teamTargetsTableContainer').style.display = 'none';
    document.getElementById('teamTargetFormContainer').style.display = 'block';
    if (currentTeamTarget) {
        const quarterMatch = currentTeamTarget.quarter?.match(/Q\d/);
        if (quarterMatch) document.getElementById('teamTargetQuarter').value = quarterMatch[0];
        if (currentTeamTarget.year) document.getElementById('teamTargetYear').value = currentTeamTarget.year;
    }
}

function hideTeamTargetForm() {
    document.getElementById('teamTargetFormContainer').style.display = 'none';
    document.getElementById('teamTargetsTableContainer').style.display = 'block';
}

function editTeamTarget(target) {
    window.currentEditingTarget = target;
    document.getElementById('teamMemberSelect').value = target.employee_id;
    document.getElementById('teamTargetYear').value = target.year;
    document.getElementById('teamTargetQuarter').value = target.quarter;
    document.getElementById('targetAmount').value = String(target.overall_target).replace(/[₹,]/g, '');
    document.getElementById('teamMemberSelect').disabled = true;
    document.getElementById('teamTargetYear').disabled = true;
    document.getElementById('teamTargetQuarter').disabled = true;
    document.querySelector('#teamTargetForm .btn-save').textContent = 'Update Team Target';
    showTeamTargetForm();
}

function openTeamTargetSidebar() {
    document.getElementById('teamTargetOverlay').classList.add('show');
    document.getElementById('teamTargetSidebar').classList.add('show');
}

function closeTeamTargetSidebar() {
    document.getElementById('teamTargetOverlay').classList.remove('show');
    document.getElementById('teamTargetSidebar').classList.remove('show');
    currentTeamTarget = null;
}

async function handleTeamTargetSubmit(event) {
    event.preventDefault();
    const isEdit = !!window.currentEditingTarget;

    const data = {
        employee_id: document.getElementById('teamMemberSelect').value,
        year: document.getElementById('teamTargetYear').value,
        quarter: document.getElementById('teamTargetQuarter').value,
        overall_target: document.getElementById('targetAmount').value
    };

    try {
        const method = isEdit ? 'PUT' : 'POST';
        const response = await callApi('employee-sales-target', data, method);

        if (response && response.rcode === 'success') {
            alert(`Team target ${isEdit ? 'updated' : 'added'} successfully!`);
            resetTeamTargetForm();
            const quarterMatch = currentTeamTarget?.quarter?.match(/Q\d/);
            await loadTeamTargets(quarterMatch ? quarterMatch[0] : 'Q1', currentTeamTarget?.year || '2026');
        } else {
            alert(response?.rmessage || 'Failed to save team target');
        }
    } catch (error) {
        console.error("Error saving team target:", error);
        alert('Error saving team target. Please try again.');
    }
}

function resetTeamTargetForm() {
    document.getElementById('teamTargetForm').reset();
    document.getElementById('teamMemberSelect').disabled = false;
    document.getElementById('teamTargetYear').disabled = false;
    document.getElementById('teamTargetQuarter').disabled = false;
    document.querySelector('#teamTargetForm .btn-save').textContent = 'Add Team Target';
    window.currentEditingTarget = null;
    hideTeamTargetForm();
}

// ============ SIDEBAR DATA TABLE ============
const cardConfig = {
    'Total Business': { endpoint: 'business_users', queryParams: { item_type: 'include', data_type: 'total' }, headers: ['#', 'User ID', 'Customer Name', 'Total Business', 'Total MRR'] },
    'Active MRR': { endpoint: 'business_users', queryParams: { item_type: 'include', data_type: 'total' }, headers: ['#', 'User ID', 'Customer Name', 'Total Business', 'Total MRR'] },
    'New Business': { endpoint: 'business_users', queryParams: { item_type: 'include', data_type: 'new' }, headers: ['#', 'User ID', 'Customer Name', 'Total Business', 'Total MRR'] },
    'Funnel Size': { endpoint: 'deal', headers: ['#', 'Deal ID', 'Contact Name', 'Deal Name', 'Deal Amount', 'Assigned to', 'Deal Stage'] }
};

async function openSidebar(cardTitle) {
    const config = cardConfig[cardTitle];
    if (!config) { console.error('No configuration found for:', cardTitle); return; }

    document.getElementById('sidebar-title').textContent = cardTitle;
    document.getElementById('loading').style.display = 'block';
    document.getElementById('sidebar-table').style.display = 'none';

    const queryParams = {
        assigned_to: currentFilters.sales_person,
        create_start: currentFilters.date_from,
        create_end: currentFilters.date_to,
        ...config.queryParams
    };

    try {
        const response = await callApi(config.endpoint, queryParams, 'GET');

        const headersHtml = config.headers.map(header => `<th>${header}</th>`).join('');
        document.getElementById('sidebar-table-header').innerHTML = `<tr>${headersHtml}</tr>`;

        const tableBody = document.getElementById('sidebar-table-body');
        tableBody.innerHTML = '';

        let dataArray = [];
        if (Array.isArray(response)) dataArray = response;
        else if (response && response.data) dataArray = response.data;
        else if (response && response[config.endpoint]) dataArray = response[config.endpoint];
        else if (response && typeof response === 'object') dataArray = Object.values(response).filter(v => typeof v === 'object');

        if (dataArray.length > 0) {
            dataArray.forEach((item, index) => {
                const row = document.createElement('tr');
                config.headers.forEach((header, colIndex) => {
                    const cell = document.createElement('td');
                    if (colIndex === 0) cell.textContent = index + 1;
                    else cell.textContent = extractValue(item, header, config.endpoint);
                    row.appendChild(cell);
                });
                row.classList.add(index % 2 === 0 ? 'even-row' : 'odd-row');
                tableBody.appendChild(row);
            });
        } else {
            tableBody.innerHTML = `<tr><td colspan="${config.headers.length}" class="text-center text-muted py-4">No data found</td></tr>`;
        }

        document.getElementById('loading').style.display = 'none';
        document.getElementById('sidebar-table').style.display = 'table';
        document.getElementById('sidebar').classList.add('open');
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('loading').style.display = 'none';
        document.getElementById('sidebar-table-body').innerHTML = `<tr><td colspan="${config.headers.length}" class="text-center text-danger py-4">Error loading data</td></tr>`;
    }
}

function extractValue(item, header, endpointType) {
    if (header === '#') return '';
    
    const fieldMap = {
        'User ID': ['userid', 'client_id', 'id'],
        'Customer Name': ['fullname', 'customer_name'],
        'Total Business': ['total_business'],
        'Total MRR': ['total_mrr'],
        'Deal ID': ['id'],
        'Contact Name': ['contact_first_name', 'contact_last_name'],
        'Deal Name': ['name'],
        'Deal Amount': ['amount'],
        'Assigned to': ['assignedto_name', 'assigned_to'],
        'Deal Stage': ['deal_stage']
    };

    const fields = fieldMap[header] || [];
    for (const field of fields) {
        if (item[field] !== undefined && item[field] !== null && item[field] !== '') {
            return String(item[field]);
        }
    }

    if (header === 'Customer Name' && (item.first_name || item.last_name)) {
        return `${item.first_name || ''} ${item.last_name || ''}`.trim();
    }
    if (header === 'Contact Name' && (item.contact_first_name || item.contact_last_name)) {
        return `${item.contact_first_name || ''} ${item.contact_last_name || ''}`.trim();
    }

    return '';
}

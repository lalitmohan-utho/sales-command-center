<!-- Follow-ups & Tasks -->
<div class="section">
    <div class="section-header">
        <h2 class="section-title">Follow-ups & Tasks</h2>
        <div class="section-actions">
            <!-- FILTER BUTTON (hidden initially) -->
            <button class="btn-sm" id="tasksFilterBtn" onclick="toggleTasksFilter()" style="display:none;">
                <i class="bi bi-search"></i>
            </button>

            <!-- SEE TASKS BUTTON -->
            <button class="btn-sm" id="seeTasksBtn" onclick="toggleTasks()">
                See Tasks
            </button>
        </div>
    </div>
    
    <!-- Tasks Filter Form -->
    <div class="col-md-12" id="tasksFilterForm" style="display: none; padding: 4px;">
        <div class="row">
            <div class="col-md-3">
                <label>Department</label>
                <select class="form-control" id="filterDepartment">
                    <option value="">All Departments</option>
                    <option value="Sales">Sales</option>
                    <option value="Billing">Billing</option>
                    <option value="Support">Support</option>
                    <option value="Private">Private</option>
                    <option value="Collection">Collection</option>
                    <option value="Delivery">Delivery</option>
                    <option value="Ticket">Ticket</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                    <option value="Call">Call</option>
                </select>
            </div>
            <div class="col-md-3">
                <label>Status</label>
                <select class="form-control" id="filterStatus">
                    <option value="">All Status</option>
                    <option value="24">Pending</option>
                    <option value="23">Completed</option>
                </select>
            </div>
            <div class="col-md-3">
                <label>Ref Type</label>
                <select class="form-control" id="filterRefType">
                    <option value="">All Types</option>
                    <option value="call">Call</option>
                    <option value="ticket">Ticket</option>
                    <option value="client">Client</option>
                    <option value="private">Private</option>
                    <option value="contact">Contact</option>
                    <option value="vendor">Vendor</option>
                    <option value="inventory">Inventory</option>
                    <option value="contract">Contract</option>
                    <option value="purchaseorder">Purchase Order</option>
                    <option value="invoice">Invoice</option>
                    <option value="lead">Lead</option>
                    <option value="account">Account</option>
                    <option value="deal">Deal</option>
                </select>
            </div>
            <div class="col-md-3">
                <label>Ref ID</label>
                <input type="text" class="form-control" id="filterRefId" placeholder="Enter Ref ID">
            </div>
        </div>
        <br>
        <div class="row">
            <div class="col-md-3 filter-actions-group">
                <button class="btn-filter primary" onclick="applyTasksFilter()">
                    <i class="bi bi-funnel"></i> Apply
                </button>
                <button class="btn-filter" onclick="clearTasksFilter()">
                    <i class="bi bi-x-circle"></i> Clear
                </button>
            </div>
        </div>
    </div>
    
    <div class="stats-grid-row-1" id="header_card">
    </div>
    
    <div id="tasksTableWrapper" style="display: none;">
        <table class="task-table" style="margin-top: 20px;">
            <thead>
                <tr>
                    <th>#</th>
                    <th>id</th>
                    <th>Type</th>
                    <th>Status</th>
                    <th>Followup Time</th>
                    <th>Reference #</th>
                    <th>Last Message</th>
                    <th>Assigned to</th>
                    <th>Department</th>
                    <th>Refrence</th>
                    <th>Entry Time</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody id="tasksTableBody">
                <!-- Tasks will be populated here -->
            </tbody>
        </table>

        <div class="pagination-container" id="tasksPagination">
            <!-- Pagination will be populated here -->
        </div>
    </div>
</div>

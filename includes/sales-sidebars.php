<!-- Cards sidebar -->
<div id="sidebar" class="sidebar">
    <div class="sidebar-header d-flex justify-content-between align-items-center">
        <h5 id="sidebar-title">Exclude Invoices</h5>

        <div class="d-flex align-items-center gap-2">
            <button id="invoiceToggleBtn" class="btn btn-primary" onclick="toggleInvoice()">
                Include Invoices
            </button>
            <button class="close-btn" id="sidebar-close">×</button>
        </div>
    </div>

    <div class="sidebar-content">
        <div class="table-responsive">
            <table id="sidebar-table" class="table table-striped table-hover">
                <thead id="sidebar-table-header"></thead>
                <tbody id="sidebar-table-body"></tbody>
            </table>
        </div>
        <div id="loading" style="display:none;">Loading...</div>
    </div>
</div>

<!-- Invoice Items Sidebar -->
<div id="itemsSidebar" class="sidebar">
    <div class="sidebar-header d-flex justify-content-between align-items-center">
        <h5>Invoice Items</h5>
        <div class="d-flex align-items-center gap-2">
            <button id="toggleInvoiceItemsBtn" class="btn btn-outline-primary">
                Exclude Invoices
            </button>
            <button class="close-btn" onclick="closeItemsSidebar()">×</button>
        </div>
    </div>

    <div class="sidebar-content">
        <div id="invoiceItemsContainer"></div>
    </div>
</div>

<!-- Contact Sidebar -->
<div class="sidebar-overlay" id="sidebarOverlay" onclick="closeContactSidebar()"></div>
<div class="contact-sidebar" id="contactSidebar">
    <div class="sidebar-header">
        <h3>Contact Details</h3>
        <button class="sidebar-close" onclick="closeContactSidebar()">&times;</button>
    </div>

    <div class="contact-info" id="contactInfoContent">
        <!-- Contact header -->
        <h2 id="contactFullName" style="font-size: 18px; font-weight: 600; margin-bottom: 20px;"></h2>

        <!-- Contact details in table format -->
        <div class="contact-details-table" style="width: 100%;">
            <!-- Row 1 -->
            <div class="detail-row" style="display: flex; margin-bottom: 12px;">
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Firstname</div>
                    <div style="font-size: 14px; font-weight: 500;" id="firstName"></div>
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Lastname</div>
                    <div style="font-size: 14px; font-weight: 500;" id="lastName"></div>
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Job Title</div>
                    <div style="font-size: 14px; font-weight: 500;" id="jobTitle"></div>
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Mobile</div>
                    <div style="font-size: 14px; font-weight: 500;" id="mobile"></div>
                </div>
            </div>

            <!-- Row 2 -->
            <div class="detail-row" style="display: flex; margin-bottom: 12px;">
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Email</div>
                    <div style="font-size: 14px; font-weight: 500;" id="email"></div>
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">City</div>
                    <div style="font-size: 14px; font-weight: 500;" id="city"></div>
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">State</div>
                    <div style="font-size: 14px; font-weight: 500;" id="state"></div>
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Country</div>
                    <div style="font-size: 14px; font-weight: 500;" id="country"></div>
                </div>
            </div>

            <!-- Row 3 -->
            <div class="detail-row" style="display: flex; margin-bottom: 12px;">
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Owner</div>
                    <div style="font-size: 14px; font-weight: 500;" id="owner"></div>
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Status</div>
                    <div style="font-size: 14px; font-weight: 500;" id="status"></div>
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Source</div>
                    <div style="font-size: 14px; font-weight: 500;" id="source"></div>
                </div>
                <div style="flex: 1;">
                    <div style="font-size: 12px; color: #6b7280; margin-bottom: 4px;">Medium</div>
                    <div style="font-size: 14px; font-weight: 500;" id="medium"></div>
                </div>
            </div>
        </div>
    </div>

    <!-- Tabs -->
    <div class="sidebar-tabs">
        <button class="sidebar-tab active" onclick="switchTab('activity')">
            <i class="bi bi-clock-history me-1"></i> Timeline
        </button>
        <button class="sidebar-tab" onclick="switchTab('notes')">
            <i class="bi bi-sticky me-1"></i> Notes
        </button>
        <button class="sidebar-tab" onclick="switchTab('calls')">
            <i class="bi bi-telephone me-1"></i> Calls
        </button>
        <button class="sidebar-tab" onclick="switchTab('logs')">
            <i class="bi bi-list-ul me-1"></i> Logs
        </button>
    </div>

    <div class="sidebar-content">
        <!-- Timeline Tab -->
        <div class="tab-content active" id="activity-tab">
            <!-- Add Follow-up Form -->
            <div class="add-followup-form">
                <textarea id="followupMessage" placeholder="Add a follow-up note..."></textarea>
                <div style="display: flex; gap: 10px; margin-bottom: 10px;">
                    <div style="flex: 1;">
                        <label style="font-size: 12px; color: #6b7280;">Due At</label>
                        <input type="date" id="dueAtDate" class="form-control" style="font-size: 13px;">
                    </div>
                    <div style="flex: 1;">
                        <label style="font-size: 12px; color: #6b7280;">Type</label>
                        <select id="dueAtType" class="form-control" style="font-size: 13px;">
                            <option value="Call">Call</option>
                            <option value="Email">Email</option>
                        </select>
                    </div>
                </div>
                <button onclick="addFollowup()">
                    <i class="bi bi-plus-lg"></i> Add Follow-up
                </button>
            </div>
            <div id="activityContent">
                <!-- Activity content will be populated here -->
            </div>
        </div>

        <!-- Notes Tab -->
        <div class="tab-content" id="notes-tab">
            <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">ID</th>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Note</th>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">By</th>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Time</th>
                        </tr>
                    </thead>
                    <tbody id="notesContent">
                        <!-- Notes will be populated here -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Calls Tab -->
        <div class="tab-content" id="calls-tab">
            <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">ID</th>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">By</th>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Direction</th>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Time</th>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Duration</th>
                        </tr>
                    </thead>
                    <tbody id="callsContent">
                        <!-- Calls will be populated here -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Logs Tab -->
        <div class="tab-content" id="logs-tab">
            <div style="background: #f8f9fa; padding: 16px; border-radius: 8px; overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse;">
                    <thead>
                        <tr>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">ID</th>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Log</th>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">By</th>
                            <th style="padding: 12px 16px; text-align: left; font-weight: 500; color: #6b7280; font-size: 12px;">Time</th>
                        </tr>
                    </thead>
                    <tbody id="logsContent">
                        <!-- Logs will be populated here -->
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</div>

<!-- Team Target Management Sidebar -->
<div class="sidebar-overlay" id="teamTargetOverlay" onclick="closeTeamTargetSidebar()"></div>
<div class="contact-sidebar" id="teamTargetSidebar" style="width: 900px;">
    <div class="sidebar-header">
        <h3>Team Targets Management</h3>
        <button class="sidebar-close" onclick="closeTeamTargetSidebar()">&times;</button>
    </div>

    <div class="sidebar-content" style="padding: 20px;">
        <!-- Header section showing Quarter info -->
        <div style="margin-bottom: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px; border-left: 4px solid var(--primary-color);">
            <h4 style="margin: 0; color: var(--primary-color);" id="teamTargetHeader">Team Targets of Quarter - Q2 of 2036</h4>
        </div>

        <!-- Set Team Target Button -->
        <div style="text-align: right; margin-bottom: 20px;">
            <button class="btn-add" onclick="showTeamTargetForm()">
                <i class="bi bi-plus-lg"></i>
                Set Team Target
            </button>
        </div>

        <!-- Team Targets Table -->
        <div id="teamTargetsTableContainer">
            <div style="overflow-x: auto;">
                <table class="data-table" style="width: 100%;">
                    <thead>
                        <tr style="background: linear-gradient(135deg, #F8FAFC, #F1F5F9);">
                            <th style="padding: 12px; text-align: left; font-size: 12px;">#</th>
                            <th style="padding: 12px; text-align: left; font-size: 12px;">Name</th>
                            <th style="padding: 12px; text-align: left; font-size: 12px;">Year</th>
                            <th style="padding: 12px; text-align: left; font-size: 12px;">Quarter</th>
                            <th style="padding: 12px; text-align: left; font-size: 12px;">Overall Target</th>
                            <th style="padding: 12px; text-align: left; font-size: 12px;">1st Month</th>
                            <th style="padding: 12px; text-align: left; font-size: 12px;">2nd Month</th>
                            <th style="padding: 12px; text-align: left; font-size: 12px;">3rd Month</th>
                        </tr>
                    </thead>
                    <tbody id="teamTargetsTableBody">
                        <!-- Team targets will be populated here -->
                    </tbody>
                </table>
            </div>
        </div>

        <!-- Team Target Form (Hidden by default) -->
        <div id="teamTargetFormContainer" style="display: none; margin-top: 30px; padding: 20px; background: #f8f9fa; border-radius: 8px;">
            <h5 style="margin-bottom: 20px; color: var(--primary-color);">Add Team Target</h5>

            <form id="teamTargetForm">
                <div class="row" style="margin-bottom: 20px;">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Team Member *</label>
                            <select class="form-control" id="teamMemberSelect" required style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px;">
                                <option value="">Select Team Member</option>
                                <!-- Options will be populated dynamically -->
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Target Amount (₹) *</label>
                            <input type="number" class="form-control" id="targetAmount" required placeholder="Enter target amount" style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px;">
                        </div>
                    </div>
                </div>

                <div class="row" style="margin-bottom: 20px;">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Year *</label>
                            <select class="form-control" id="teamTargetYear" required style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px;">
                                <option value="">Select Year</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                                <option value="2031">2031</option>
                                <option value="2032">2032</option>
                                <option value="2033">2033</option>
                                <option value="2034">2034</option>
                                <option value="2035">2035</option>
                                <option value="2036">2036</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>Quarter *</label>
                            <select class="form-control" id="teamTargetQuarter" required style="width: 100%; padding: 10px; border: 1px solid var(--border-color); border-radius: 6px;">
                                <option value="">Select Quarter</option>
                                <option value="Q1">Q1 (April-May-June)</option>
                                <option value="Q2">Q2 (July-August-September)</option>
                                <option value="Q3">Q3 (October-November-December)</option>
                                <option value="Q4">Q4 (January-February-March)</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div style="display: flex; gap: 10px; justify-content: flex-end;">
                    <button type="button" class="btn-cancel" onclick="hideTeamTargetForm()" style="padding: 10px 20px;">Cancel</button>
                    <button type="submit" class="btn-save" style="padding: 10px 20px;">Add Team Target</button>
                </div>
            </form>
        </div>

        <!-- Loading state -->
        <div id="teamTargetLoading" style="display: none; text-align: center; padding: 40px;">
            <div style="display: inline-block; width: 30px; height: 30px; border: 3px solid #f3f3f3; border-top: 3px solid #3498db; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 10px; color: #6c757d;">Loading team targets...</p>
        </div>
    </div>
</div>

<!-- Add Target Modal -->
<div class="modal-overlay" id="editTargetModal">
    <div class="modal-content">
        <div class="modal-header">
            <h3 id="editTargetModalTitle">Add Target</h3>
            <button class="modal-close" onclick="closeEditModal()">&times;</button>
        </div>

        <div class="modal-body">
            <form id="editTargetForm" onsubmit="saveTarget(event)">
                <input type="hidden" id="targetId" name="id">

                <div class="form-group">
                    <label>Year <span>*</span></label>
                    <select class="form-control" id="targetYear" name="year" required>
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

                <div class="form-group">
                    <label>Quarter <span>*</span></label>
                    <select class="form-control" id="targetQuarter" name="quarter" required>
                        <option value="">Select Quarter</option>
                        <option value="Q1">Q1 (April-May-June)</option>
                        <option value="Q2">Q2 (July-August-September)</option>
                        <option value="Q3">Q3 (October-November-December)</option>
                        <option value="Q4">Q4 (January-February-March)</option>
                    </select>
                </div>

                <div class="form-group">
                    <label>Whole Total Target (MRR + WHOLE) ₹ <span>*</span></label>
                    <input type="number" class="form-control" id="wholeTotalTarget" name="wholeTotalTarget" required>
                </div>

                <div class="modal-footer">
                    <button type="button" class="btn-cancel" onclick="closeEditModal()">Cancel</button>
                    <button type="submit" class="btn-save" id="editTargetSubmitBtn">
                        Save Target
                    </button>
                </div>
            </form>
        </div>
    </div>
</div>

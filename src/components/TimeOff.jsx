import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './TimeOff.css';
import emailjs from 'emailjs-com';

function TimeOff() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const [leaveType, setLeaveType] = useState('');
    const [reason, setReason] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');

    // Handle leave type change
    const handleLeaveTypeChange = (e) => {
        setLeaveType(e.target.value);
    };

    // Handle reason change
    const handleReasonChange = (e) => {
        setReason(e.target.value);
    };

    // Handle form submission (apply leave)
    const handleSubmit = (e) => {
        e.preventDefault();

        // Simple validation
        if (!startDate || !endDate || !leaveType) {
            setModalMessage('Please fill in all fields.');
            setShowModal(true);
            return;
        }

        // Format dates as strings
        const start = startDate.toLocaleDateString();
        const end = endDate.toLocaleDateString();

        // Prepare the leave details to send in the email
        const leaveDetails = {
            to_name: 'HR Manager', 
            from_name: 'HR', 
            leave_type: leaveType,
            start_date: start,
            end_date: end,
            message: reason || '', 
        };

        // Send email using EmailJS
        emailjs
            .send(
                'service_9vyhmj2',
                'template_z6puryv',
                leaveDetails,
                'aXyLCbmZtdY1DARZi'
            )
            .then(
                (response) => {
                    console.log('Email sent successfully:', response);
                    setModalMessage(`Leave applied successfully from ${start} to ${end} for ${leaveType}. An email has been sent to HR.`);
                    setShowModal(true);
                },
                (error) => {
                    console.error('Failed to send email:', error);
                    setModalMessage('Failed to send leave application email. Please try again later.');
                    setShowModal(true);
                }
            );
    };

    // Close modal handler
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div>
            {/* Logo at the top-left */}
            <img src="/Project2.png" alt="Logo" className="logo" />

            {/* Trigger to open the modal */}
            <button onClick={() => setShowModal(true)} className="apply-btn">
                Leave
            </button>

            {/* Modal for displaying calendar and form */}
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="leave-details-container">
                            <h4>Apply for Leave</h4>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label>Leave Type</label>
                                    <select
                                        value={leaveType}
                                        onChange={handleLeaveTypeChange}
                                        className="leave-type-select"
                                    >
                                        <option value="">Select Leave Type</option>
                                        <option value="Privilege Leave">Privilege Leave</option>
                                        <option value="Sick Leave">Sick Leave</option>
                                    </select>
                                </div>

                                <div className="date-picker-container">
                                    <div className="form-group">
                                        <label>Start Date</label>
                                        <DatePicker
                                            selected={startDate}
                                            onChange={(date) => setStartDate(date)}
                                            dateFormat="MM/dd/yyyy"
                                            className="date-picker"
                                            placeholderText="Select Start Date"
                                        />
                                    </div>

                                    <div className="form-group">
                                        <label>End Date</label>
                                        <DatePicker
                                            selected={endDate}
                                            onChange={(date) => setEndDate(date)}
                                            dateFormat="MM/dd/yyyy"
                                            className="date-picker"
                                            placeholderText="Select End Date"
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <button type="submit" className="apply-btn">Apply for Leave</button>
                                </div>
                            </form>
                        </div>

                        {/* Calendar in the right part of modal */}
                        <div className="calendar-container">
                            <h3>Select Leave Dates</h3>
                            <DatePicker
                                selected={startDate}
                                onChange={([start, end]) => {
                                    setStartDate(start);
                                    setEndDate(end);
                                }}
                                selectsRange
                                startDate={startDate}
                                endDate={endDate}
                                inline
                            />
                        </div>

                        {/* Close button to close the modal */}
                        <button onClick={closeModal} className="close-btn">Close</button>
                    </div>
                </div>
            )}

            {/* Toast/Pop-Up Message Styling */}
            {modalMessage && (
                <div className="toast-message">
                    <p>{modalMessage}</p>
                </div>
            )}
        </div>
    );
}

export default TimeOff;

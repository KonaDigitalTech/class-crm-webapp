'use client'
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { updateLead } from '../../lib/features/leads/leadSlice';
import { toast } from 'react-toastify';

const UpdateLead = ({ isOpen, onClose, lead, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    cc: "",
    phone: "",
    email: "",
    fee_quoted: "",
    batch_timing: "",
    description: "",
    Stack: "",
    Course: "",
    lead_status: "",
    lead_source: "",
    class_mode: "",
    next_fallow_up: "",
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen && lead) {
      setFormData({
        name: lead.name || "",
        cc: lead.cc || "",
        phone: lead.phone || "",
        email: lead.email || "",
        fee_quoted: lead.fee_quoted || "",
        batch_timing: lead.batch_timing || "",
        description: lead.description || "",
        Stack: lead.Stack || "",
        Course: lead.Course || "",
        lead_status: lead.lead_status || "",
        lead_source: lead.lead_source || "",
        class_mode: lead.class_mode || "",
        next_fallow_up: lead.next_fallow_up || "",
      });
      setErrors({});
    }
  }, [isOpen, lead]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSave = async () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = "Name is mandatory";
    }
    if (!formData.phone) {
      newErrors.phone = "Phone is mandatory";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsLoading(true);

    try {
      const leadData = {
        ...formData,
        fee_quoted: parseFloat(formData.fee_quoted) || 0,
      };

      await dispatch(updateLead({ id: lead.id, leadData })).unwrap();
      toast.success("Lead updated successfully");
      onSave();
      onClose();
    } catch (error) {
      toast.error("Failed to update lead");
    }

    setIsLoading(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-xl mb-4">Update Lead</h2>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="border p-2 rounded"
              required
            />
            {errors.name && (
              <span className="text-red-500 text-sm mt-1">{errors.name}</span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="cc"
              placeholder="Cc"
              value={formData.cc}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="number"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="border p-2 rounded"
            />
            {errors.phone && (
              <span className="text-red-500 text-sm mt-1">{errors.phone}</span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <input
              type="text"
              name="fee_quoted"
              placeholder="Fee quoted"
              value={formData.fee_quoted}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col">
            <select
              name="batch_timing"
              value={formData.batch_timing}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Batch Timing</option>
              <option value="7AM_8AM">7AM - 8AM</option>
              <option value="8AM_9AM">8AM - 9AM</option>
              <option value="9AM_10AM">9AM - 10AM</option>
              <option value="10AM_11AM">10AM - 11AM</option>
              <option value="11AM_12PM">11AM - 12PM</option>
              <option value="12PM_1PM">12PM - 1PM</option>
              <option value="1PM_2PM">1PM - 2PM</option>
              <option value="2PM_3PM">2PM - 3PM</option>
              <option value="3PM_4PM">3PM - 4PM</option>
              <option value="4PM_5PM">4PM - 5PM</option>
              <option value="5PM_6PM">5PM - 6PM</option>
              <option value="6PM_7PM">6PM - 7PM</option>
              <option value="7PM_8PM">7PM - 8PM</option>
              <option value="8PM_9PM">8PM - 9PM</option>
            </select>
          </div>
          <div className="flex flex-col col-span-2">
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleChange}
              className="border p-2 rounded w-full"
            />
          </div>
          <div className="flex flex-col">
            <select
              name="Stack"
              value={formData.Stack}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Stack</option>
              <option value="Life Skills">Life Skills</option>
              <option value="Study Abroad">Study Abroad</option>
              <option value="HR">HR</option>
            </select>
          </div>
          <div className="flex flex-col">
            <select
              name="Course"
              value={formData.Course}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Course</option>
              <option value="HR Business Partner">HR Business Partner</option>
              <option value="HR Generalist Core HR">HR Generalist Core HR</option>
              <option value="HR Analytics">HR Analytics</option>
              <option value="Spoken English">Spoken English</option>
              <option value="Public Speaking">Public Speaking</option>
              <option value="Communication Skills">Communication Skills</option>
              <option value="Soft Skills">Soft Skills</option>
              <option value="Personality Development">Personality Development</option>
              <option value="Aptitude">Aptitude</option>
              <option value="IELTS">IELTS</option>
              <option value="TOEFL">TOEFL</option>
              <option value="PTE">PTE</option>
              <option value="GRE">GRE</option>
              <option value="GMAT">GMAT</option>
              <option value="Recruitment Specialist">Recruitment Specialist</option>
              <option value="Payroll Specialist">Payroll Specialist</option>
              <option value="Learning and Development">Learning and Development</option>
              <option value="Others">Others</option>
              <option value="Finance">Finance</option>
              <option value="Competitive Exams">Competitive Exams</option>
            </select>
          </div>
          <div className="flex flex-col">
            <select
              name="lead_status"
              value={formData.lead_status}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Lead Status</option>
              <option value="Not Contacted">Not Contacted</option>
            </select>
          </div>
          <div className="flex flex-col">
            <select
              name="lead_source"
              value={formData.lead_source}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Lead Source</option>
              <option value="None">None</option>
              <option value="WalkIn">WalkIn</option>
              <option value="StudentReferral">StudentReferral</option>
              <option value="Demo">Demo</option>
              <option value="WebSite">WebSite</option>
              <option value="WebsiteChat">WebsiteChat</option>
              <option value="InboundCall">InboundCall</option>
              <option value="GoogleAdWords">GoogleAdWords</option>
              <option value="FacebookAds">FacebookAds</option>
              <option value="GoogleMyBusiness">GoogleMyBusiness</option>
              <option value="WhatsAppSkillCapital">WhatsAppSkillCapital</option>
            </select>
          </div>
          <div className="flex flex-col">
            <select
              name="class_mode"
              value={formData.class_mode}
              onChange={handleChange}
              className="border p-2 rounded"
            >
              <option value="">Select Class Mode</option>
              <option value="International Online">International Online</option>
            </select>
          </div>
          <div className="flex flex-col">
            <input
              type="date"
              name="next_fallow_up"
              placeholder="Next follow up"
              value={formData.next_fallow_up}
              onChange={handleChange}
              className="border p-2 rounded"
            />
          </div>
        </div>
        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
          >
            {isLoading && (
              <svg
                className="animate-spin h-5 w-5 mr-3 border-t-2 border-b-2 border-white rounded-full"
                viewBox="0 0 24 24"
              ></svg>
            )}
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpdateLead;
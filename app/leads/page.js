"use client"
import  { useEffect, useState } from "react";
import axios from "axios";
import LeadForm from "./CreateLead"; // Import the LeadForm component
import UpdateLead from "./UpdateLead"; // Import the UpdateLead component
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Lead.css"
import TableHeader from "../components/TableHeader";

const Lead = () => {
  const [leads, setLeads] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null); // State to store the lead being updated
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State to track loading status
  const [isDeleteLoading, setIsDeleteLoading] = useState(false); // State to track delete loading status

  useEffect(() => {
    const fetchLeads = async () => {
      setIsLoading(true); // Start loading
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${baseUrl}/leads`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const leads = response.data.leads
          .filter(lead => lead.leadStage === "lead")
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // Sort by createdAt in descending order
        setLeads(leads);
      } catch (error) {
        console.error('Error fetching leads:', error);
        toast.error("Failed to fetch leads");
      }
      setIsLoading(false); // End loading
    };
    fetchLeads();
  }, []);  

  const handleSelectAll = (event) => {
    if (event.target.checked) {
      setSelectedRows(leads.map((lead) => lead.id));
    } else {
      setSelectedRows([]);
    }
  };

  const handleSelectRow = (event, id) => {
    if (event.target.checked) {
      setSelectedRows([...selectedRows, id]);
    } else {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    }
  };

  const handleCreateLead = () => {
    setIsModalOpen(true);
  };

  const handleSaveLead = (newLead) => {
    setLeads([newLead, ...leads]);
    setIsModalOpen(false);
  };

  const handleUpdateLead = (updatedLead) => {
    setLeads(leads.map(lead => (lead.id === updatedLead.id ? updatedLead : lead)));
    setIsUpdateModalOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDeleteSelected = async () => {
    setIsDeleteLoading(true); // Start delete loading
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${baseUrl}/leads?ids=${selectedRows.join(',')}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLeads(leads.filter((lead) => !selectedRows.includes(lead.id)));
      setSelectedRows([]);
      toast.success("Leads deleted successfully");
    } catch (error) {
      console.error('Error deleting leads:', error);
      toast.error("Failed to delete leads");
    }
    setIsDeleteLoading(false); // End delete loading
  };

  const handleRowClick = (lead) => {
    setCurrentLead(lead);
    setIsUpdateModalOpen(true);
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.techStack.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mx-6 mt-28 p-8 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
      <ToastContainer />
      <TableHeader onCreateLead={handleCreateLead} onSearch={handleSearch} onDelete={handleDeleteSelected} isDeleteLoading={isDeleteLoading} />
      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="w-16 h-16 border-4 border-blue-400 border-t-4 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : (
        <table className="min-w-full mt-4 bg-white border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-3 px-4 border-b text-left text-gray-600">
                <input type="checkbox" onChange={handleSelectAll} checked={selectedRows.length === leads.length} />
              </th>
              <th className="py-3 px-4 border-b text-left text-gray-600">Created on</th>
              <th className="py-3 px-4 border-b text-left text-gray-600">Name</th>
              <th className="py-3 px-4 border-b text-left text-gray-600">Email</th>
              <th className="py-3 px-4 border-b text-left text-gray-600">Phone</th>
              <th className="py-3 px-4 border-b text-left text-gray-600">Course</th>
            </tr>
          </thead>
          <tbody>
            {filteredLeads.map((lead) => (
              <tr
                key={lead.id}
                className={ selectedRows.includes(lead.id) ? "bg-blue-200" : "bg-white hover:bg-blue-100 "}
                onClick={() => handleRowClick(lead)}
              >
                <td className="py-3 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(lead.id)}
                    onChange={(event) => handleSelectRow(event, lead.id)}
                    onClick={(e) => e.stopPropagation()} // Prevent row click event from triggering
                  />
                </td>
                <td className="py-3 px-4 border-b">
                  {new Date(lead.createdAt).toLocaleString('en-US', {
                    day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
                  })}
                </td>
                <td className="py-3 px-4 border-b">{lead.name}</td>
                <td className="py-3 px-4 border-b">{lead.email}</td>
                <td className="py-3 px-4 border-b">{lead.phone}</td>
                <td className="py-3 px-4 border-b">{lead.techStack}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {isModalOpen && (
        <LeadForm isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onSave={handleSaveLead} />
      )}
      {isUpdateModalOpen && currentLead && (
        <UpdateLead isOpen={isUpdateModalOpen} onClose={() => setIsUpdateModalOpen(false)} lead={currentLead} onSave={handleUpdateLead} />
      )}
    </div>
  );
};

export default Lead;

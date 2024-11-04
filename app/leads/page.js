"use client"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, createLead, updateLead, deleteLead } from "../../lib/features/leads/leadSlice";
import LeadForm from "./CreateLead";
import UpdateLead from "./UpdateLead";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Lead.css"
import TableHeader from "../components/TableHeader";
import Navbar from "../navbar/page";

const Lead = () => {
  const dispatch = useDispatch();
  const leads = useSelector((state) => state.leads.leads);
  const status = useSelector((state) => state.leads.status);
  const error = useSelector((state) => state.leads.error);

  const [selectedRows, setSelectedRows] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchLeads());
    }
  }, [dispatch, status]);

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

  const handleSaveLead = async (newLead) => {
    await dispatch(createLead(newLead));
    setIsModalOpen(false);
  };

  const handleUpdateLead = async (updatedLead) => {
    await dispatch(updateLead({ id: currentLead.id, leadData: updatedLead }));
    setIsUpdateModalOpen(false);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleDeleteSelected = async () => {
    if (selectedRows.length === 0) {
      toast.warning("Please select leads to delete");
      return;
    }

    if (!window.confirm("Are you sure you want to delete the selected leads?")) {
      return;
    }

    setIsDeleteLoading(true);
    try {
      // Delete leads one by one
      for (const id of selectedRows) {
        await dispatch(deleteLead(id)).unwrap();
      }
      
      setSelectedRows([]);
      toast.success(`Successfully deleted ${selectedRows.length} lead(s)`);
      
      // Refresh the leads list
      dispatch(fetchLeads());
    } catch (error) {
      console.error('Error deleting leads:', error);
      toast.error("Failed to delete leads: " + (error.message || "Unknown error"));
    } finally {
      setIsDeleteLoading(false);
    }
  };

  const handleRowClick = (lead) => {
    setCurrentLead(lead);
    setIsUpdateModalOpen(true);
  };

  const filteredLeads = leads.filter((lead) =>
    lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.phone.toLowerCase().includes(searchQuery.toLowerCase()) ||
    lead.Course.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <div className="mx-6 mt-10 p-8 bg-white border-2 border-gray-200 rounded-lg shadow-lg">
        <ToastContainer />
        <TableHeader onCreateLead={handleCreateLead} onSearch={handleSearch} onDelete={handleDeleteSelected} isDeleteLoading={isDeleteLoading} />
        {status === "loading" ? (
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
                  className={selectedRows.includes(lead.id) ? "bg-blue-200" : "bg-white hover:bg-blue-100 "}
                  onClick={() => handleRowClick(lead)}
                >
                  <td className="py-3 px-4 border-b">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(lead.id)}
                      onChange={(event) => handleSelectRow(event, lead.id)}
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td className="py-3 px-4 border-b">
                    {/* {new Date(lead.createdAt).toLocaleString('en-US', {
                      day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit', hour12: true
                    })} */}
                    {lead.next_fallow_up}
                  </td>
                  <td className="py-3 px-4 border-b">{lead.name}</td>
                  <td className="py-3 px-4 border-b">{lead.email}</td>
                  <td className="py-3 px-4 border-b">{lead.phone}</td>
                  <td className="py-3 px-4 border-b">{lead.Course}</td>
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
    </>
  );
};

export default Lead;
'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { sampleApplications, sampleVolunteerApplications } from '@/lib/db/mock-data';
import { StudentApplication, VolunteerApplication, ApplicationStatus } from '@/types';
import { updateStudentApplicationStatus, updateVolunteerApplicationStatus } from '@/lib/db/repository';
import { 
  Users, 
  Search, 
  Filter, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  ShieldCheck, 
  Mail, 
  BookOpen, 
  FileText,
  AlertCircle
} from 'lucide-react';

function AdminApplicationsContent() {
  const searchParams = useSearchParams();
  const searchRef = searchParams.get('ref') || '';

  const [activeTab, setActiveTab] = useState<'student' | 'volunteer'>('student');
  const [studentList, setStudentList] = useState<StudentApplication[]>([...sampleApplications]);
  const [volunteerList, setVolunteerList] = useState<VolunteerApplication[]>([...sampleVolunteerApplications]);
  const [searchQuery, setSearchQuery] = useState(searchRef);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  
  // Selected Application for Inspection
  const [selectedStudent, setSelectedStudent] = useState<StudentApplication | null>(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState<VolunteerApplication | null>(null);
  const [notesInput, setNotesInput] = useState('');
  const [updateMsg, setUpdateMsg] = useState('');

  useEffect(() => {
    if (searchRef) {
      const found = studentList.find(s => s.referenceNumber === searchRef);
      if (found) {
        setSelectedStudent(found);
        setNotesInput(found.reviewNotes || '');
      }
    }
  }, [searchRef, studentList]);

  const handleStudentStatusChange = async (id: string, newStatus: ApplicationStatus) => {
    const updated = await updateStudentApplicationStatus(id, newStatus, notesInput);
    if (updated) {
      setStudentList(prev => prev.map(s => s.id === updated.id ? updated : s));
      setSelectedStudent(updated);
      setUpdateMsg(`Application ${updated.referenceNumber} status changed to ${newStatus}`);
      setTimeout(() => setUpdateMsg(''), 3000);
    }
  };

  const handleVolunteerStatusChange = async (id: string, newStatus: ApplicationStatus, backgroundVerified?: boolean) => {
    const updated = await updateVolunteerApplicationStatus(id, newStatus, notesInput, backgroundVerified);
    if (updated) {
      setVolunteerList(prev => prev.map(v => v.id === updated.id ? updated : v));
      setSelectedVolunteer(updated);
      setUpdateMsg(`Volunteer application status changed to ${newStatus}`);
      setTimeout(() => setUpdateMsg(''), 3000);
    }
  };

  // Filtered views
  const filteredStudents = studentList.filter(s => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        s.preferredName.toLowerCase().includes(q) ||
        s.referenceNumber.toLowerCase().includes(q) ||
        s.programPreference.toLowerCase().includes(q) ||
        s.guardianEmail.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const filteredVolunteers = volunteerList.filter(v => {
    if (statusFilter !== 'all' && v.status !== statusFilter) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      return (
        v.fullName.toLowerCase().includes(q) ||
        v.email.toLowerCase().includes(q) ||
        v.referenceNumber.toLowerCase().includes(q) ||
        v.preferredRole.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="border-b border-[#D2E4F0] pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
            Applications Management
          </h1>
          <p className="text-xs sm:text-sm text-[#7187A8] mt-1">
            Review admissions, guardian consent records, and volunteer screening status.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="bg-[#E5F4F6] p-1 rounded-xl flex items-center gap-1 self-start md:self-auto">
          <button
            type="button"
            onClick={() => { setActiveTab('student'); setSelectedVolunteer(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'student' ? 'bg-[#10233F] text-white shadow-xs' : 'text-[#18365A] hover:text-[#10233F]'
            }`}
          >
            Student Pilots ({studentList.length})
          </button>
          <button
            type="button"
            onClick={() => { setActiveTab('volunteer'); setSelectedStudent(null); }}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-colors ${
              activeTab === 'volunteer' ? 'bg-[#10233F] text-white shadow-xs' : 'text-[#18365A] hover:text-[#10233F]'
            }`}
          >
            Volunteer Mentors ({volunteerList.length})
          </button>
        </div>
      </div>

      {updateMsg && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>{updateMsg}</span>
        </div>
      )}

      {/* Filter and Search Bar */}
      <div className="bg-white border border-[#D2E4F0] rounded-2xl p-4 sm:p-6 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-[#7187A8] absolute left-3.5 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, ref, email..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-[#D2E4F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#19C6D2]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-[#7187A8] mr-1">Status:</span>
          {['all', 'pending', 'under_review', 'approved', 'waitlisted', 'rejected'].map((st) => (
            <button
              key={st}
              type="button"
              onClick={() => setStatusFilter(st)}
              className={`text-[11px] font-bold px-2.5 py-1 rounded-lg capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-[#10233F] text-white'
                  : 'bg-[#F4FAFF] border border-[#D2E4F0] text-[#18365A] hover:bg-[#E5F4F6]'
              }`}
            >
              {st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main Table + Inspector Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Table Column */}
        <div className="lg:col-span-7 bg-white border border-[#D2E4F0] rounded-2xl overflow-hidden shadow-sm">
          {activeTab === 'student' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F4FAFF] border-b border-[#D2E4F0] text-[#7187A8] uppercase tracking-wider text-[11px]">
                    <th className="p-4 font-bold">Applicant</th>
                    <th className="p-4 font-bold">Track</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4FAFF]">
                  {filteredStudents.map((app) => (
                    <tr
                      key={app.id}
                      onClick={() => { setSelectedStudent(app); setNotesInput(app.reviewNotes || ''); }}
                      className={`cursor-pointer transition-colors ${
                        selectedStudent?.id === app.id ? 'bg-[#E5F4F6]' : 'hover:bg-[#F4FAFF]'
                      }`}
                    >
                      <td className="p-4">
                        <div className="font-bold text-[#10233F]">{app.preferredName}</div>
                        <div className="text-[11px] text-[#7187A8] font-mono">{app.referenceNumber}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[#18365A] font-medium">{app.programPreference}</div>
                        <div className="text-[11px] text-[#7187A8]">{app.ageRange.replace('ages-', 'Ages ')}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                          app.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                          app.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                          app.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          type="button"
                          className="font-bold text-[#1877F2] hover:underline"
                        >
                          Inspect &rarr;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredStudents.length === 0 && (
                <div className="p-8 text-center text-xs text-[#7187A8]">
                  No student applications matching filter.
                </div>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="bg-[#F4FAFF] border-b border-[#D2E4F0] text-[#7187A8] uppercase tracking-wider text-[11px]">
                    <th className="p-4 font-bold">Volunteer</th>
                    <th className="p-4 font-bold">Role</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F4FAFF]">
                  {filteredVolunteers.map((vol) => (
                    <tr
                      key={vol.id}
                      onClick={() => { setSelectedVolunteer(vol); setNotesInput(vol.reviewNotes || ''); }}
                      className={`cursor-pointer transition-colors ${
                        selectedVolunteer?.id === vol.id ? 'bg-[#E5F4F6]' : 'hover:bg-[#F4FAFF]'
                      }`}
                    >
                      <td className="p-4">
                        <div className="font-bold text-[#10233F]">{vol.fullName}</div>
                        <div className="text-[11px] text-[#7187A8] font-mono">{vol.referenceNumber}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-[#18365A] font-medium capitalize">{vol.preferredRole.replace('_', ' ')}</div>
                        <div className="text-[11px] text-[#7187A8]">{vol.weeklyAvailabilityHours} hrs/wk &bull; {vol.cityCountry}</div>
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold uppercase ${
                          vol.status === 'approved' ? 'bg-emerald-100 text-emerald-800' :
                          vol.status === 'under_review' ? 'bg-blue-100 text-blue-800' :
                          'bg-amber-100 text-amber-800'
                        }`}>
                          {vol.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="p-4">
                        <button
                          type="button"
                          className="font-bold text-[#1877F2] hover:underline"
                        >
                          Inspect &rarr;
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {filteredVolunteers.length === 0 && (
                <div className="p-8 text-center text-xs text-[#7187A8]">
                  No volunteer applications matching filter.
                </div>
              )}
            </div>
          )}
        </div>

        {/* Inspector Detail Drawer / Card */}
        <div className="lg:col-span-5 bg-white border border-[#D2E4F0] rounded-2xl p-6 sm:p-8 shadow-sm space-y-6">
          {activeTab === 'student' && selectedStudent ? (
            <div className="space-y-4">
              <div className="border-b border-[#D2E4F0] pb-3">
                <span className="text-[11px] font-mono text-[#7187A8]">Reference: {selectedStudent.referenceNumber}</span>
                <h3 className="text-xl font-bold text-[#10233F]">{selectedStudent.preferredName}</h3>
                <div className="text-xs text-[#1877F2] font-semibold">{selectedStudent.programPreference} ({selectedStudent.gradeLevel})</div>
              </div>

              <div className="space-y-2 text-xs text-[#18365A]">
                <div>
                  <span className="text-[#7187A8] font-bold">Age Range:</span> {selectedStudent.ageRange}
                </div>
                <div>
                  <span className="text-[#7187A8] font-bold">Prior Coding:</span> {selectedStudent.priorExperience}
                </div>
                <div>
                  <span className="text-[#7187A8] font-bold">Guardian:</span> {selectedStudent.guardianName} ({selectedStudent.guardianEmail})
                </div>
                {selectedStudent.guardianPhoneOptional && (
                  <div>
                    <span className="text-[#7187A8] font-bold">Guardian Phone:</span> {selectedStudent.guardianPhoneOptional}
                  </div>
                )}
                {selectedStudent.accessibilityNeeds && (
                  <div className="p-2.5 bg-[#F4FAFF] border border-[#D2E4F0] rounded-lg">
                    <span className="text-[#10233F] font-bold block mb-1">Accessibility Accommodation Note:</span>
                    {selectedStudent.accessibilityNeeds}
                  </div>
                )}
                <div className="flex items-center gap-1.5 text-emerald-700 font-bold pt-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Guardian Consent Verified</span>
                </div>
              </div>

              {/* Status Actions */}
              <div className="space-y-2 pt-2 border-t border-[#D2E4F0]">
                <label className="text-xs font-bold text-[#10233F]">Reviewer Internal Notes:</label>
                <textarea
                  rows={2}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Add cohort assignment notes or interview remarks..."
                  className="w-full p-2.5 text-xs border border-[#D2E4F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#19C6D2]"
                />

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleStudentStatusChange(selectedStudent.id, 'approved')}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    ✓ Approve Student
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStudentStatusChange(selectedStudent.id, 'under_review')}
                    className="bg-[#1877F2] hover:bg-[#10233F] text-white font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    Under Review
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStudentStatusChange(selectedStudent.id, 'waitlisted')}
                    className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    Waitlist
                  </button>
                  <button
                    type="button"
                    onClick={() => handleStudentStatusChange(selectedStudent.id, 'rejected')}
                    className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ) : activeTab === 'volunteer' && selectedVolunteer ? (
            <div className="space-y-4">
              <div className="border-b border-[#D2E4F0] pb-3">
                <span className="text-[11px] font-mono text-[#7187A8]">Reference: {selectedVolunteer.referenceNumber}</span>
                <h3 className="text-xl font-bold text-[#10233F]">{selectedVolunteer.fullName}</h3>
                <div className="text-xs text-[#1877F2] font-semibold capitalize">{selectedVolunteer.preferredRole.replace('_', ' ')} &bull; {selectedVolunteer.cityCountry}</div>
              </div>

              <div className="space-y-2 text-xs text-[#18365A]">
                <div>
                  <span className="text-[#7187A8] font-bold">Email:</span> {selectedVolunteer.email}
                </div>
                <div>
                  <span className="text-[#7187A8] font-bold">Availability:</span> {selectedVolunteer.weeklyAvailabilityHours} hrs/week
                </div>
                <div>
                  <span className="text-[#7187A8] font-bold">Skills:</span> {selectedVolunteer.skills.join(', ')}
                </div>
                <div>
                  <span className="text-[#7187A8] font-bold">Can Teach:</span> {selectedVolunteer.subjectsCanTeach.join(', ')}
                </div>
                <div className="p-2.5 bg-[#F4FAFF] border border-[#D2E4F0] rounded-lg">
                  <span className="text-[#10233F] font-bold block mb-0.5">Motivation:</span>
                  {selectedVolunteer.motivation}
                </div>
                <div className="p-2.5 bg-[#F4FAFF] border border-[#D2E4F0] rounded-lg">
                  <span className="text-[#10233F] font-bold block mb-0.5">Experience:</span>
                  {selectedVolunteer.relevantExperience}
                </div>
                <div className="flex items-center gap-1.5 pt-1 text-[11px]">
                  <span className="font-bold text-[#10233F]">Background Check:</span>
                  <span className={selectedVolunteer.backgroundCheckVerified ? 'text-emerald-700 font-bold' : 'text-amber-700 font-bold'}>
                    {selectedVolunteer.backgroundCheckVerified ? '✓ Verified by Admin' : 'Pending Verification'}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#D2E4F0]">
                <label className="text-xs font-bold text-[#10233F]">Reviewer Notes:</label>
                <textarea
                  rows={2}
                  value={notesInput}
                  onChange={(e) => setNotesInput(e.target.value)}
                  placeholder="Interview notes..."
                  className="w-full p-2.5 text-xs border border-[#D2E4F0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#19C6D2]"
                />

                <div className="grid grid-cols-2 gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => handleVolunteerStatusChange(selectedVolunteer.id, 'approved', true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    ✓ Approve &amp; Verify
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVolunteerStatusChange(selectedVolunteer.id, 'interview')}
                    className="bg-[#1877F2] hover:bg-[#10233F] text-white font-bold py-2 rounded-xl text-xs transition-colors"
                  >
                    Invite to Interview
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-xs text-[#7187A8] space-y-2">
              <Users className="w-8 h-8 text-[#7187A8] mx-auto opacity-50" />
              <p>Select any applicant from the list to inspect credentials, notes, and update status.</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

export default function AdminApplicationsPage() {
  return (
    <Suspense fallback={<div className="p-12 text-center text-xs text-[#7187A8]">Loading applications manager...</div>}>
      <AdminApplicationsContent />
    </Suspense>
  );
}

'use client';

import React, { useEffect, useState } from 'react';

type Registration = {
    id: string;
    reference_number: string;
    guardian_name: string;
    guardian_email: string;
    guardian_phone: string | null;
    preferred_contact_method: string;
    student_first_name: string;
    student_age: number;
    student_grade: string | null;
    student_country: string;
    time_zone: string | null;
    learning_level: string;
    coding_experience: string;
    learning_goals: string | null;
    additional_notes: string | null;
    status: string;
    admin_notes: string | null;
    created_at: string;
};

const STATUS_LABELS: Record<string, string> = {
    pending: 'Pending',
    under_review: 'Under review',
    placed: 'Placed',
    waitlist: 'Waitlist',
    archived: 'Archived',
};

export default function AdminRegistrationsPage() {
    const [rows, setRows] = useState<Registration[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [query, setQuery] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [selected, setSelected] = useState<Registration | null>(null);
    const [notes, setNotes] = useState('');
    const [message, setMessage] = useState('');

    useEffect(() => {
        async function load() {
            try {
                const res = await fetch('/api/admin/registrations');
                const json = await res.json();
                if (!res.ok) throw new Error(json.error || 'Could not load registrations');
                setRows(json.registrations);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'Could not load registrations');
            } finally {
                setLoading(false);
            }
        }
        load();
    }, []);

    async function updateStatus(row: Registration, status: string) {
        setMessage('');
        const res = await fetch('/api/admin/registrations', {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: row.id, status, admin_notes: notes }),
        });
        const json = await res.json();
        if (!res.ok) {
            setMessage(json.error || 'Update failed');
            return;
        }
        setRows((prev) => prev.map((r) => (r.id === row.id ? json.registration : r)));
        setSelected(json.registration);
        setMessage(`${row.reference_number} marked ${STATUS_LABELS[status]}`);
    }

    const q = query.trim().toLowerCase();
    const visible = rows.filter((r) => {
        if (statusFilter !== 'all' && r.status !== statusFilter) return false;
        if (!q) return true;
        return [r.student_first_name, r.guardian_name, r.guardian_email, r.reference_number].some((v) =>
            v.toLowerCase().includes(q)
        );
    });

    return (
        <div className="space-y-6">
            <div className="border-b border-[#D2E4F0] pb-4">
                <h1 className="text-2xl sm:text-3xl font-black text-[#10233F] tracking-tight">
                    Registrations
                </h1>
                <p className="text-xs sm:text-sm text-[#7187A8] mt-1">
                    Live sign ups from the registration form ({rows.length} total).
                </p>
            </div>

            {message && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs rounded-xl">
                    {message}
                </div>
            )}

            <div className="bg-white border border-[#D2E4F0] rounded-2xl p-4 flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search by name, email, reference"
                    className="w-full sm:w-80 px-3 py-2 text-xs border border-[#D2E4F0] rounded-xl"
                />
                <div className="flex flex-wrap gap-2">
                    {['all', ...Object.keys(STATUS_LABELS)].map((st) => (
                        <button
                            key={st}
                            type="button"
                            onClick={() => setStatusFilter(st)}
                            className={`text-[11px] font-bold px-2.5 py-1 rounded-lg ${statusFilter === st
                                    ? 'bg-[#10233F] text-white'
                                    : 'bg-[#F4FAFF] border border-[#D2E4F0] text-[#18365A]'
                                }`}
                        >
                            {st === 'all' ? 'All' : STATUS_LABELS[st]}
                        </button>
                    ))}
                </div>
            </div>

            {loading && <p className="text-xs text-[#7187A8]">Loading registrations...</p>}
            {error && <p className="text-xs text-red-600">{error}</p>}

            {!loading && !error && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    <div className="lg:col-span-7 bg-white border border-[#D2E4F0] rounded-2xl overflow-x-auto">
                        <table className="w-full text-left text-xs">
                            <thead>
                                <tr className="bg-[#F4FAFF] border-b border-[#D2E4F0] text-[#7187A8] uppercase text-[11px]">
                                    <th className="p-4 font-bold">Student</th>
                                    <th className="p-4 font-bold">Level</th>
                                    <th className="p-4 font-bold">Status</th>
                                    <th className="p-4 font-bold">Received</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#F4FAFF]">
                                {visible.map((r) => (
                                    <tr
                                        key={r.id}
                                        onClick={() => {
                                            setSelected(r);
                                            setNotes(r.admin_notes || '');
                                            setMessage('');
                                        }}
                                        className={`cursor-pointer ${selected?.id === r.id ? 'bg-[#E5F4F6]' : 'hover:bg-[#F4FAFF]'
                                            }`}
                                    >
                                        <td className="p-4">
                                            <div className="font-bold text-[#10233F]">{r.student_first_name}</div>
                                            <div className="text-[11px] text-[#7187A8] font-mono">{r.reference_number}</div>
                                        </td>
                                        <td className="p-4 capitalize">{r.learning_level}</td>
                                        <td className="p-4">{STATUS_LABELS[r.status] || r.status}</td>
                                        <td className="p-4">{new Date(r.created_at).toLocaleDateString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {visible.length === 0 && (
                            <div className="p-8 text-center text-xs text-[#7187A8]">
                                No registrations match.
                            </div>
                        )}
                    </div>

                    <div className="lg:col-span-5 bg-white border border-[#D2E4F0] rounded-2xl p-6 space-y-4">
                        {selected ? (
                            <>
                                <div className="border-b border-[#D2E4F0] pb-3">
                                    <span className="text-[11px] font-mono text-[#7187A8]">
                                        {selected.reference_number}
                                    </span>
                                    <h3 className="text-xl font-bold text-[#10233F]">
                                        {selected.student_first_name}, age {selected.student_age}
                                    </h3>
                                    <div className="text-xs text-[#1877F2] font-semibold capitalize">
                                        {selected.learning_level}
                                        {selected.student_grade ? `, grade ${selected.student_grade}` : ''}
                                    </div>
                                </div>
                                <div className="space-y-2 text-xs text-[#18365A]">
                                    <div><span className="font-bold text-[#7187A8]">Guardian:</span> {selected.guardian_name}</div>
                                    <div><span className="font-bold text-[#7187A8]">Email:</span> {selected.guardian_email}</div>
                                    {selected.guardian_phone && (
                                        <div><span className="font-bold text-[#7187A8]">Phone:</span> {selected.guardian_phone}</div>
                                    )}
                                    <div><span className="font-bold text-[#7187A8]">Prefers:</span> {selected.preferred_contact_method}</div>
                                    <div><span className="font-bold text-[#7187A8]">Country:</span> {selected.student_country}</div>
                                    {selected.time_zone && (
                                        <div><span className="font-bold text-[#7187A8]">Time zone:</span> {selected.time_zone}</div>
                                    )}
                                    <div><span className="font-bold text-[#7187A8]">Coding experience:</span> {selected.coding_experience}</div>
                                    {selected.learning_goals && (
                                        <div><span className="font-bold text-[#7187A8]">Goals:</span> {selected.learning_goals}</div>
                                    )}
                                    {selected.additional_notes && (
                                        <div><span className="font-bold text-[#7187A8]">Notes from guardian:</span> {selected.additional_notes}</div>
                                    )}
                                    <div><span className="font-bold text-[#7187A8]">Current status:</span> {STATUS_LABELS[selected.status] || selected.status}</div>
                                </div>
                                <div className="space-y-2 pt-3 border-t border-[#D2E4F0]">
                                    <label className="text-xs font-bold text-[#10233F]">Internal notes</label>
                                    <textarea
                                        rows={3}
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                        className="w-full p-2.5 text-xs border border-[#D2E4F0] rounded-xl"
                                    />
                                    <div className="grid grid-cols-2 gap-2 pt-1">
                                        {Object.keys(STATUS_LABELS).map((st) => (
                                            <button
                                                key={st}
                                                type="button"
                                                onClick={() => updateStatus(selected, st)}
                                                className="bg-[#10233F] hover:bg-[#1877F2] text-white font-bold py-2 rounded-xl text-xs"
                                            >
                                                {STATUS_LABELS[st]}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <p className="text-center py-10 text-xs text-[#7187A8]">
                                Select a registration to see the details.
                            </p>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
import React from 'react';
  
export default function Insights({ insights }) {
    if (!insights) return <div className="bg-white shadow rounded-lg p-4">Loading insights...</div>;
    return (
        <div className="bg-white shadow rounded-lg p-4 space-y-2">
        <h3 className="text-lg font-semibold">Insights</h3>
        <p className="text-gray-800">{insights.sentence}</p>
        <p className="text-sm text-gray-600">Total: {insights.summary.total}</p>
        <p className="text-sm text-gray-600">Due soon: {insights.summary.due_soon}</p>
        </div>
    );
}
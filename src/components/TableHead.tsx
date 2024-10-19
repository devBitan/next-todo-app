import React from "react";

const TableHeader: React.FC = () => {
    return (
        <thead className="">
            <tr className="text-center text-sm font-semibold text-gray-700">
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
            </tr>
        </thead>
    );
};

export default TableHeader;

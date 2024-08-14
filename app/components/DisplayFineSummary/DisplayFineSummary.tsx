'use client'

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/database/supabaseClient"; // Adjust the path based on your project structure
import { Result } from "../../lib/types/FPLLeague"; // Adjust the path based on your project structure

const DisplayFineSummary = ({ users }: { users: Result[] }) => {
    // Define the types for the fine data and fine summary
    type FPLFineSummary = {
        user_id: number;
        username: string;
        team: string;
        total_fines: number;
        number_of_fines: number;
    };

    const [fineData, setFineData] = useState<FPLFines[]>([]);
    const [fineSummary, setFineSummary] = useState<FPLFineSummary[]>([]);

    useEffect(() => {
        const fetchFineSummary = async () => {
            try {
                const { data, error } = await supabase
                    .from("fines")
                    .select("*");

                if (error) {
                    throw new Error(error.message);
                }

                if (data) {
                    setFineData(data as FPLFines[]);
                }
            } catch (error: Error | any) {
                console.error("Error fetching fine summary:", error.message);
            }
        };

        fetchFineSummary(); // Initial data fetch

        // Subscribe to real-time changes in the 'fines' table
        const subscription = supabase
            .channel('public:fines')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'fines' }, (payload) => {
                console.log('Change detected:', payload);

                // Re-fetch data when any insert, update, or delete occurs
                fetchFineSummary();
            })
            .subscribe();

        // Clean up the subscription on component unmount
        return () => {
            supabase.removeChannel(subscription);
        };
    }, []);

    useEffect(() => {
        if (fineData.length > 0) {
            const fineSummary = fineData.reduce((acc, fine) => {
                const existingUser = acc.find((user) => user.user_id === fine.user_id);

                if (existingUser) {
                    existingUser.total_fines += fine.fine;
                    existingUser.number_of_fines += 1;
                } else {
                    acc.push({
                        user_id: fine.user_id,
                        username: fine.username,
                        team: fine.team_name,
                        total_fines: fine.fine,
                        number_of_fines: 1,
                    });
                }

                return acc;
            }, [] as FPLFineSummary[]);

            setFineSummary(fineSummary);
        }
    }, [fineData]); // Dependency on fineData to recalculate the summary whenever it changes

    return (
        <div>
            <table className="w-full">
                <thead className="text-[12px] text-primary-gray">
                    <tr className="shadow-primary">
                        <th className="px-4 py-2 border-r border-off-white text-left">Full Name</th>
                        <th className="px-4 py-2 border-r border-off-white text-left">UserName</th>
                        <th className="px-4 py-2 border-r border-off-white">
                            Owes in total {fineData.length > 0 ? fineData[0].currency ?? "" : ""}
                        </th>
                        <th className="px-4 py-2 border-r border-off-white">Number of fines</th>
                    </tr>
                </thead>
                <tbody className="text-[14px] text-secondary-gray text-center font-medium">
                    {fineSummary.length > 0 ? (
                        fineSummary.map((fine, index) => (
                            <tr key={index} className="border-b border-off-white relative">
                                <td className="px-4 py-2 text-left">{fine.username}</td>
                                <td className="px-4 py-2 text-left">{fine.team}</td>
                                <td className="px-4 py-2">{fine.total_fines}</td>
                                <td className="px-4 py-2">{fine.number_of_fines}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="px-4 py-2" colSpan={4}>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default DisplayFineSummary;

'use client';

import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/database/supabaseClient"; // Adjust the path based on your project structure
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditFine from "../UpdateFine/EditFine"; // Import EditFine component


interface DisplayAllFinesProps {
    isDelete: boolean;
    leagueData: FPLLeague;
    
}

const DisplayAllFines: React.FC<DisplayAllFinesProps> = ({ isDelete, leagueData }) => {
    const [fineData, setFineData] = useState<FPLFines[]>([]);
    const [selectedFine, setSelectedFine] = useState<FPLFines | null>(null); // State to track selected fine for editing
    const [isEditOpen, setIsEditOpen] = useState<boolean>(false); // State to control the EditFine modal visibility
    
    const leagueId = leagueData.league.id; // Extract leagueId from leagueData
    

    // Function to fetch fine data from the database
    const fetchFineSummary = async () => {
        try {
            const { data, error } = await supabase
                .from("fines")
                .select("*")
                .eq("league_id", leagueId); // Filter by leagueId

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

    useEffect(() => {
        fetchFineSummary(); // Fetch initial data

        // Subscribe to changes in the 'fines' table
        const subscription = supabase
            .channel('public:fines')
            .on('postgres_changes', { event: '*', schema: 'public', table: 'fines' }, (payload) => {
                console.log('Change detected:', payload);

                // Re-fetch data on any insert, update, or delete
                fetchFineSummary();
            })
            .subscribe();

        // Clean up subscription on component unmount
        return () => {
            supabase.removeChannel(subscription);
        };

    }, [leagueId]); // Add leagueId as a dependency to refetch if it changes

    const handleDeleteClick = (id: number) => {
        console.log("Delete: " + id);

        // Delete the fine in Supabase that has id === id
        const deleteFine = async () => {
            const { error } = await supabase.from("fines").delete().eq("id", id);
            if (error) {
                console.error("Error deleting fine:", error.message);
            } else {
                console.log("Fine deleted successfully");
                fetchFineSummary(); // Refetch data after deletion
            }
        };
        deleteFine();
    };

    const handleEditClick = (id: number) => {
        console.log(id);
        // get fine data from fineData using id
        const fine = fineData.find((fine) => fine.id === id);
        if (fine) {
            setSelectedFine(fine); // Set the selected fine data
            setIsEditOpen(true); // Open the EditFine modal
        }
    };

    const closeEditModal = () => {
        setIsEditOpen(false);
        setSelectedFine(null); // Clear the selected fine data
    };

    const sortedFineData = fineData.sort((a, b) => {
        const dateA = new Date(a.created_at);
        const dateB = new Date(b.created_at);
        return dateA.getTime() - dateB.getTime();
    });
    

    return (
        <div>
            <table className="w-full">
                <thead className="text-[12px] text-primary-gray">
                    <tr className="shadow-primary">
                        <th className="px-4 py-2 border-r border-off-white text-left">Full Name</th>
                        <th className="px-4 py-2 border-r border-off-white text-left">Fine description</th>
                        <th className="px-4 py-2 border-r border-off-white">Fine</th>
                        <th className="px-4 py-2 border-r border-off-white">Currency</th>
                        {isDelete && <th className="px-4 py-2 border-r border-off-white">Edit</th>}
                        {isDelete && <th className="px-4 py-2 border-r border-off-white">Delete</th>}
                    </tr>
                </thead>
                <tbody className="text-[14px] text-secondary-gray text-center font-medium">
                    {fineData.length > 0 ? (
                        sortedFineData.map((fine, index) => (
                            <tr key={index} className="border-b border-off-white relative">
                                <td className="px-4 py-2 text-left">{fine.username}</td>
                                <td className="px-4 py-2 text-left">{fine.fine_description}</td>
                                <td className="px-4 py-2">{fine.fine}</td>
                                <td className="px-4 py-2">{fine.currency}</td>
                                {isDelete && (
                                    <td className="px-4 py-2">
                                        <button className="text-primary-blue" onClick={() => handleEditClick(fine.id)}>
                                            <ModeEditOutlineOutlinedIcon />
                                        </button>
                                    </td>
                                )}
                                {isDelete && (
                                    <td className="px-4 py-2">
                                        <button className="text-primary-blue" onClick={() => handleDeleteClick(fine.id)}>
                                            <DeleteForeverOutlinedIcon />
                                        </button>
                                    </td>
                                )}
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td className="px-4 py-2" colSpan={isDelete ? 6 : 5}>
                                No data available
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Render the EditFine modal when a fine is selected */}
            {isEditOpen && selectedFine && (
                <EditFine
                    username={selectedFine.username}
                    fine={selectedFine.fine.toString()}
                    currency={selectedFine.currency}
                    team_name={selectedFine.team_name}
                    fine_description={selectedFine.fine_description}
                    leagueData={leagueData}
                    userId={selectedFine.user_id}
                    fineId={selectedFine.id} // Pass the fineId for the update
                    setOpen={closeEditModal}
                />
            )}
        </div>
    );
};

export default DisplayAllFines;

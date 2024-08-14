"use client";

import React, { useState, useEffect } from "react";
import Popup from "../Modals/Popups";
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { Result } from "../../lib/types/FPLLeague";
import { supabase } from "@/app/lib/database/supabaseClient";

interface EditFineProps {
    username: string ;
    fine: string;
    currency: string;
    team_name: string;
    fine_description: string;
    leagueData: FPLLeague; // Ensure this type matches your actual data structure
    userId: number; // Add userId prop to identify the specific fine record
    fineId: number; // Add fineId prop to identify the specific fine record
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const EditFine: React.FC<EditFineProps> = ({ username, fine, currency, team_name, fine_description, leagueData, userId, fineId, setOpen }) => {
    const [newFine, setNewFine] = useState<string>(fine);
    const [newCurrency, setNewCurrency] = useState<string>(currency);
    const [newTeamName, setNewTeamName] = useState<string>(team_name);
    const [newDescription, setNewDescription] = useState<string>(fine_description);
    const [newUserName, setNewUserName] = useState<string>(username); 
    const [newUserId, setNewUserId] = useState<number>(userId); // Set initial userId from props
    
    console.log(leagueData);
    

    const userData = leagueData.leagueData.new_entries.results;

    // Update dropdown selection based on current user
    const updateDropdownInput = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const userIdData = userData.find((user: Result) => user.entry === Number(e.target.value));
        if (userIdData) {
            setNewTeamName(userIdData.entry_name);
            setNewUserName(userIdData.player_first_name + " " + userIdData.player_last_name);
            setNewUserId(userIdData.entry);
        }
    };

    const handleSave = async () => {
        try {
            const { data, error } = await supabase
                .from('fines')
                .update({
                    fine_description: newDescription,
                    fine: newFine,
                    currency: newCurrency,
                    team_name: newTeamName,
                    username: newUserName,
                    user_id: newUserId, // Update userId if needed
                })
                .eq('id', fineId); // Update the record with the corresponding fineId

            if (error) {
                console.error('Error updating fine:', error);
            } else {
                console.log('Fine updated successfully:', data);
            }
        } catch (error) {
            console.error('Error saving fine:', error);
        }

        setOpen(false); // Close the modal after saving
    };

    const closeModal = () => {
        setOpen(false);
    };

    return (
        <Popup isOpen={true} onClose={closeModal}>
            <div className="w-[90%] md:w-4/5 lg:w-1/2 fixed left-1/2 -translate-x-1/2 -translate-y-1/2 z-[1010] bg-white shadow-lg rounded-lg top-[50%] transition duration-500">
                <div className="relative h-[100px] px-4 py-3 rounded-t-lg bg-secondary-gradient text-primary-gray font-bold flex justify-end">
                    <CloseOutlinedIcon className="text-xl cursor-pointer" onClick={closeModal} />
                    <div className="w-full h-10 absolute left-0 bottom-0 bg-gradient-to-t from-white to-transparent"></div>
                </div>
                <h2 className="text-center text-primary-gray text-lg font-bold py-2">Update Fine</h2>
                <div className="px-4 py-3">
                    <div className="mb-4">
                        <label className="block text-gray-700">Select User:</label>
                        <select
                            value={newUserId.toString()} // Pre-select the current user
                            onChange={updateDropdownInput}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        >
                            {userData.map((user: Result) => (
                                <option key={user.entry} value={user.entry}>
                                    {user.player_first_name + " " + user.player_last_name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fine Description:</label>
                        <textarea 
                            value={newDescription} 
                            onChange={e => setNewDescription(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Fine Amount:</label>
                        <input 
                            type="number" 
                            value={newFine} 
                            onChange={e => setNewFine(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Currency:</label>
                        <input 
                            type="text" 
                            value={newCurrency} 
                            onChange={e => setNewCurrency(e.target.value)} 
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                        />
                    </div>
                    
                    <button onClick={handleSave} className="bg-secondary-gradient w-1/3 m-5 py-2 rounded-full">Save</button>
                </div>
            </div>
        </Popup>
    );
};

export default EditFine;
